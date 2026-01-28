import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getPosts = async (req: Request, res: Response): Promise<void> => {
	const page = Math.max(Number(req.query.page || 1), 1);
	const limit = Math.max(Number(req.query.limit || 10), 1);
	const skip = (page - 1) * limit;
	const { categoryId, authorId, sortBy } = req.query as Record<string, string>;

	const where: any = {};
	if (categoryId) where.category_id = categoryId;
	if (authorId) where.author_id = authorId;

	const orderBy: any = {};
	if (sortBy === 'trending') {
		// Fallback to created_at since likesCount doesn't exist
		orderBy.created_at = 'desc';
	} else {
		orderBy.created_at = 'desc';
	}

	const [rawPosts, total] = await Promise.all([
		prisma.posts.findMany({
			where,
			skip,
			take: limit,
			orderBy,
			include: {
				author: {
					select: {
						id: true,
						username: true,
						avatar_url: true,
						roles: {
							include: {
								roles: true
							}
						}
					}
				},
				categories: {
					select: { id: true, name: true }
				},
				_count: {
					select: { likes: true, comments: true }
				}
			}
		}),
		prisma.posts.count({ where })
	]);

	const posts = rawPosts.map((post: any) => ({
		...post,
		id: post.id,
		title: post.title,
		content: post.content,
		createdAt: post.created_at,
		type: 'post', // Default
		tags: [], // Default
		likes: post._count.likes,
		comments: post._count.comments,
		views: 0, // Default
		author: {
			id: post.author.id,
			name: post.author.username,
			username: post.author.username,
			avatar: post.author.avatar_url,
			role: post.author.roles?.[0]?.roles?.name || 'Member'
		},
		category: post.categories
	}));

	const totalPages = Math.ceil(total / limit);

	res.status(200).json({ posts, totalPages, currentPage: page });
};

const getPostById = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;

	// Cannot increment viewsCount as it doesn't exist
	
	const rawPost = await prisma.posts.findUnique({
		where: { id },
		include: {
			author: {
				select: {
					id: true,
					username: true,
					avatar_url: true,
					roles: {
						include: {
							roles: true
						}
					}
				}
			},
			categories: { select: { id: true, name: true } },
			comments: {
				orderBy: { created_at: 'desc' },
				include: {
					author: {
						select: {
							id: true,
							username: true,
							avatar_url: true
						}
					}
				},
				take: 20
			},
			_count: {
				select: { likes: true, comments: true }
			}
		}
	});

	if (!rawPost) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}

	const post = {
		...rawPost,
		// @ts-ignore
		createdAt: rawPost.created_at,
		type: 'post',
		tags: [],
		// @ts-ignore
		likes: rawPost._count.likes,
		views: 0,
		author: {
			// @ts-ignore
			id: rawPost.author.id,
			// @ts-ignore
			name: rawPost.author.username,
			// @ts-ignore
			username: rawPost.author.username,
			// @ts-ignore
			avatar: rawPost.author.avatar_url,
			// @ts-ignore
			role: rawPost.author.roles?.[0]?.roles?.name || 'Member'
		},
		// @ts-ignore
		comments: rawPost.comments.map((comment: any) => ({
			...comment,
			createdAt: comment.created_at,
			author: {
				id: comment.author.id,
				name: comment.author.username,
				username: comment.author.username,
				avatar: comment.author.avatar_url
			}
		}))
	};

	res.status(200).json(post);
};

const createPost = async (req: Request, res: Response): Promise<void> => {
	const authorId = req.user;
	const { title, content, categoryId } = req.body;

	if (!authorId) {
		res.status(401).json({ message: 'Authentication required' });
		return;
	}

	if (!title || typeof title !== 'string' || title.trim().length === 0) {
		res.status(400).json({ message: 'Title is required' });
		return;
	}

	const post = await prisma.posts.create({
		data: {
			title: title.trim(),
			content: content || null,
			category_id: categoryId || null,
			author_id: authorId,
		}
	});

	res.status(201).json(post);
};

const updatePost = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const userId = req.user;
	const { title, content, categoryId } = req.body;

	if (!userId) {
		res.status(401).json({ message: 'Authentication required' });
		return;
	}

	const post = await prisma.posts.findUnique({ where: { id } });
	if (!post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}

	if (post.author_id !== userId) {
		res.status(403).json({ message: 'Access denied' });
		return;
	}

	const updated = await prisma.posts.update({
		where: { id },
		data: {
			title: title !== undefined ? title : post.title,
			content: content !== undefined ? content : post.content,
			category_id: categoryId !== undefined ? categoryId : post.category_id,
		}
	});

	res.status(200).json(updated);
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const userId = req.user;

	if (!userId) {
		res.status(401).json({ message: 'Authentication required' });
		return;
	}

	const post = await prisma.posts.findUnique({ where: { id } });
	if (!post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}

	if (post.author_id !== userId) {
		res.status(403).json({ message: 'Access denied' });
		return;
	}

	await prisma.posts.delete({ where: { id } });

	res.status(200).json({ message: 'Post deleted successfully' });
};

const likePost = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params; // post id
	const userId = req.user;

	if (!userId) {
		res.status(401).json({ message: 'Authentication required' });
		return;
	}

	const existing = await prisma.likes.findFirst({ where: { post_id: id, user_id: userId } });

	if (existing) {
		// unlike
		await prisma.likes.delete({ where: { id: existing.id } });
		res.status(200).json({ liked: false });
		return;
	}

	// like
	// @ts-ignore
	await prisma.likes.create({ data: { post_id: id, user_id: userId } });
	res.status(200).json({ liked: true });
};

export { getPosts, getPostById, createPost, updatePost, deletePost, likePost };

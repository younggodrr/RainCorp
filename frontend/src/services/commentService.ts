import { apiFetch } from './apiClient';

export interface CommentAuthor {
  id?: string;
  name: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  timestamp: number;
  likes: number;
  isLiked?: boolean;
  isOwner?: boolean;
  replies?: Comment[];
}

export interface CreateCommentDto {
  content: string;
}

export interface UpdateCommentDto {
  content: string;
}

export const commentService = {
  // Get all comments for a post (paginated, nested replies)
  getCommentsByPostId: async (postId: string, page = 1, limit = 10) => {
    return apiFetch(`/posts/${postId}/comments?page=${page}&limit=${limit}`);
  },

  // Create a new comment on a post (or reply if parentId is set)
  createComment: async (postId: string, data: { content: string; parentId?: string | null }) => {
    return apiFetch(`/posts/${postId}/comments`, { method: 'POST', body: data });
  },

  // Update a comment
  updateComment: async (postId: string, commentId: string, data: UpdateCommentDto) => {
    return apiFetch(`/posts/${postId}/comments/${commentId}`, { method: 'PUT', body: data });
  },

  // Delete a comment
  deleteComment: async (postId: string, commentId: string) => {
    return apiFetch(`/posts/${postId}/comments/${commentId}`, { method: 'DELETE' });
  },

  // Reply to a comment (just call createComment with parentId)
  replyToComment: async (postId: string, parentId: string, content: string) => {
    return apiFetch(`/posts/${postId}/comments`, { method: 'POST', body: { content, parentId } });
  },

  // Like/Unlike a comment
  toggleCommentLike: async (commentId: string) => {
    return apiFetch(`/comments/${commentId}/like`, { method: 'POST' });
  },

  // Like/Unlike a reply
  toggleReplyLike: async (replyId: string) => {
    return apiFetch(`/comments/reply/${replyId}/like`, { method: 'POST' });
  }
};

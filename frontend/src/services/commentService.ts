import apiClient from './apiClient';

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
  // Get all comments for a post
  getCommentsByPostId: async (postId: string) => {
    const response = await apiClient.get<Comment[]>(`/api/comments/post/${postId}`);
    return response.data;
  },

  // Create a new comment on a post
  createComment: async (postId: string, data: CreateCommentDto) => {
    const response = await apiClient.post<Comment>(`/api/comments/post/${postId}`, data);
    return response.data;
  },

  // Update a comment
  updateComment: async (commentId: string, data: UpdateCommentDto) => {
    const response = await apiClient.put<Comment>(`/api/comments/${commentId}`, data);
    return response.data;
  },

  // Delete a comment
  deleteComment: async (commentId: string) => {
    const response = await apiClient.delete(`/api/comments/${commentId}`);
    return response.data;
  },

  // Reply to a comment
  replyToComment: async (commentId: string, data: CreateCommentDto) => {
    const response = await apiClient.post<Comment>(`/api/comments/${commentId}/reply`, data);
    return response.data;
  },

  // Like/Unlike a comment
  toggleCommentLike: async (commentId: string) => {
    const response = await apiClient.post<{ liked: boolean; likes: number }>(`/api/comments/${commentId}/like`);
    return response.data;
  },

  // Like/Unlike a reply
  toggleReplyLike: async (replyId: string) => {
    const response = await apiClient.post<{ liked: boolean; likes: number }>(`/api/comments/reply/${replyId}/like`);
    return response.data;
  }
};

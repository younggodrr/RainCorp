import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost
} from '../controllers/posts/post';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', asyncHandler(getPosts));
router.get('/:id', asyncHandler(getPostById));

// Protected routes
router.post('/', authenticateToken, asyncHandler(createPost));
router.put('/:id', authenticateToken, asyncHandler(updatePost));
router.delete('/:id', authenticateToken, asyncHandler(deletePost));
router.post('/:id/like', authenticateToken, asyncHandler(likePost));

export default router;
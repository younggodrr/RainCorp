import express from 'express';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  createReply,
  likeComment,
  likeReply
} from '../controllers/comments/comments';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Comment routes
router.get('/post/:postId', asyncHandler(getComments));
router.post('/post/:postId', authenticateToken, asyncHandler(createComment));
router.put('/:id', authenticateToken, asyncHandler(updateComment));
router.delete('/:id', authenticateToken, asyncHandler(deleteComment));

// Reply routes
router.post('/:commentId/reply', authenticateToken, asyncHandler(createReply));

// Like routes
router.post('/:id/like', authenticateToken, asyncHandler(likeComment));
router.post('/reply/:id/like', authenticateToken, asyncHandler(likeReply));

export default router;
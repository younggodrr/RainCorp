import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  placeBid,
  acceptBid
} from '../controllers/projects/projects';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', asyncHandler(getProjects));
router.get('/:id', asyncHandler(getProjectById));

// Protected routes
router.post('/', authenticateToken, asyncHandler(createProject));
router.put('/:id', authenticateToken, asyncHandler(updateProject));
router.delete('/:id', authenticateToken, asyncHandler(deleteProject));

// Bid routes
router.post('/:id/bid', authenticateToken, asyncHandler(placeBid));
router.post('/:projectId/bid/:bidId/accept', authenticateToken, asyncHandler(acceptBid));

export default router;
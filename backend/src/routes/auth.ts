import express from 'express';
import { loginUser, signupUser, getUserProfile, updateUserProfile } from '../controllers/auth/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', asyncHandler(loginUser));
router.post('/register', asyncHandler(signupUser));

// Protected routes
router.get('/profile/:id', authenticateToken, asyncHandler(getUserProfile));
router.put('/profile/:id', authenticateToken, asyncHandler(updateUserProfile));

export default router;
import express from 'express';
import {
  getUserChats,
  getChatMessages,
  createDirectChat,
  createGroupChat,
  sendMessage,
  leaveChat
} from '../controllers/chat/chat';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All chat routes require authentication
router.use(authenticateToken);

// Chat management
router.get('/', asyncHandler(getUserChats));
router.post('/direct', asyncHandler(createDirectChat));
router.post('/group', asyncHandler(createGroupChat));

// Chat room operations
router.get('/:chatId/messages', asyncHandler(getChatMessages));
router.post('/:chatId/messages', asyncHandler(sendMessage));
router.delete('/:chatId/leave', asyncHandler(leaveChat));

export default router;
import express from 'express';
import {
  connectGitHub,
  connectLinkedIn,
  connectTwitter,
  connectDiscord,
  getConnectedPlatforms,
  disconnectPlatform,
  shareToSocialPlatforms,
  syncSocialData,
  githubOAuthCallback,
  linkedinOAuthCallback,
  twitterOAuthCallback,
  discordOAuthCallback,
} from '../controllers/integrations/social';
import {
  createPaymentIntent,
  getPaymentHistory,
  getWalletBalance,
  processRefund,
  walletTransfer,
  getPaymentMethods,
  getPaymentStats,
} from '../controllers/integrations/payments';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Social Media Integration Routes
router.post('/social/github/connect', authenticateToken, asyncHandler(connectGitHub));
router.post('/social/linkedin/connect', authenticateToken, asyncHandler(connectLinkedIn));
router.post('/social/twitter/connect', authenticateToken, asyncHandler(connectTwitter));
router.post('/social/discord/connect', authenticateToken, asyncHandler(connectDiscord));

router.get('/social/platforms', authenticateToken, asyncHandler(getConnectedPlatforms));
router.delete('/social/platforms/:platform', authenticateToken, asyncHandler(disconnectPlatform));

router.post('/social/share', authenticateToken, asyncHandler(shareToSocialPlatforms));
router.post('/social/sync', authenticateToken, asyncHandler(syncSocialData));

// OAuth Callbacks (public routes for OAuth providers)
router.get('/social/github/callback', asyncHandler(githubOAuthCallback));
router.get('/social/linkedin/callback', asyncHandler(linkedinOAuthCallback));
router.get('/social/twitter/callback', asyncHandler(twitterOAuthCallback));
router.get('/social/discord/callback', asyncHandler(discordOAuthCallback));

// Payment Integration Routes
router.post('/payments/create', authenticateToken, asyncHandler(createPaymentIntent));
router.get('/payments/history', authenticateToken, asyncHandler(getPaymentHistory));
router.get('/payments/methods', asyncHandler(getPaymentMethods));
router.get('/payments/stats', authenticateToken, asyncHandler(getPaymentStats));

router.post('/payments/refund', authenticateToken, asyncHandler(processRefund));
router.post('/payments/wallet-transfer', authenticateToken, asyncHandler(walletTransfer));

router.get('/wallet/balance', authenticateToken, asyncHandler(getWalletBalance));

export default router;
import { Request, Response } from 'express';
import SocialIntegrationService from '../../services/socialIntegrationService';
import { asyncHandler } from '../../middleware/errorHandler';

const socialIntegration = new SocialIntegrationService();

// GitHub Integration
const connectGitHub = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user as string;
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({
      success: false,
      message: 'GitHub access token is required'
    });
  }

  await socialIntegration.connectGitHub(userId, accessToken);

  res.status(200).json({
    success: true,
    message: 'GitHub account connected successfully'
  });
});

// LinkedIn Integration
const connectLinkedIn = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user as string;
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({
      success: false,
      message: 'LinkedIn access token is required'
    });
  }

  await socialIntegration.connectLinkedIn(userId, accessToken);

  res.status(200).json({
    success: true,
    message: 'LinkedIn account connected successfully'
  });
});

// Twitter Integration
const connectTwitter = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user as string;
  const { accessToken, refreshToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({
      success: false,
      message: 'Twitter access token is required'
    });
  }

  await socialIntegration.connectTwitter(userId, accessToken, refreshToken);

  res.status(200).json({
    success: true,
    message: 'Twitter account connected successfully'
  });
});

// Discord Integration
const connectDiscord = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user as string;
  const { accessToken, refreshToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({
      success: false,
      message: 'Discord access token is required'
    });
  }

  await socialIntegration.connectDiscord(userId, accessToken, refreshToken);

  res.status(200).json({
    success: true,
    message: 'Discord account connected successfully'
  });
});

// Get connected platforms
const getConnectedPlatforms = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user as string;

  const platforms = await socialIntegration.getConnectedPlatforms(userId);

  res.status(200).json({
    success: true,
    platforms
  });
});

// Disconnect platform
const disconnectPlatform = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user as string;
  const { platform } = req.params;

  if (!platform) {
    return res.status(400).json({
      success: false,
      message: 'Platform is required'
    });
  }

  await socialIntegration.disconnectPlatform(userId, platform.toUpperCase());

  res.status(200).json({
    success: true,
    message: `${platform} account disconnected successfully`
  });
});

// Share to social platforms
const shareToSocialPlatforms = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user as string;
  const { content, platforms } = req.body;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: 'Content is required'
    });
  }

  if (!platforms || !Array.isArray(platforms)) {
    return res.status(400).json({
      success: false,
      message: 'Platforms array is required'
    });
  }

  await socialIntegration.shareToSocialPlatforms(userId, content, platforms);

  res.status(200).json({
    success: true,
    message: `Content shared to ${platforms.join(', ')}`
  });
});

// Sync social data
const syncSocialData = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user as string;

  await socialIntegration.syncSocialData(userId);

  res.status(200).json({
    success: true,
    message: 'Social data synchronized successfully'
  });
});

// OAuth callback handlers
const githubOAuthCallback = asyncHandler(async (req: Request, res: Response) => {
  const { code, state } = req.query;
  const userId = req.user as string;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Authorization code is required'
    });
  }

  // Exchange code for access token (implement OAuth flow)
  // const accessToken = await exchangeGitHubCodeForToken(code);

  res.status(200).json({
    success: true,
    message: 'GitHub OAuth callback received',
    code,
    state
  });
});

const linkedinOAuthCallback = asyncHandler(async (req: Request, res: Response) => {
  const { code, state } = req.query;

  res.status(200).json({
    success: true,
    message: 'LinkedIn OAuth callback received',
    code,
    state
  });
});

const twitterOAuthCallback = asyncHandler(async (req: Request, res: Response) => {
  const { oauth_token, oauth_verifier } = req.query;

  res.status(200).json({
    success: true,
    message: 'Twitter OAuth callback received',
    oauth_token,
    oauth_verifier
  });
});

const discordOAuthCallback = asyncHandler(async (req: Request, res: Response) => {
  const { code, state } = req.query;

  res.status(200).json({
    success: true,
    message: 'Discord OAuth callback received',
    code,
    state
  });
});

export {
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
};
import express from 'express';
import OTPService from '../services/otpService';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const otpService = new OTPService();

// Initialize OTP cleanup
otpService.initCleanupInterval();

// Request OTP
router.post('/request', asyncHandler(async (req, res) => {
  const { identifier, method } = req.body;

  if (!identifier) {
    return res.status(400).json({
      success: false,
      message: 'Identifier (email or phone) is required'
    });
  }

  const deliveryMethod = method || 'email';

  if (!['email', 'sms', 'whatsapp'].includes(deliveryMethod)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid delivery method. Use: email, sms, or whatsapp'
    });
  }

  await otpService.requestOTP(identifier, deliveryMethod as 'email' | 'sms' | 'whatsapp');

  res.status(200).json({
    success: true,
    message: `OTP sent via ${deliveryMethod}`,
    deliveryMethod
  });
}));

// Verify OTP
router.post('/verify', asyncHandler(async (req, res) => {
  const { identifier, otp } = req.body;

  if (!identifier || !otp) {
    return res.status(400).json({
      success: false,
      message: 'Identifier and OTP are required'
    });
  }

  const isValid = await otpService.verifyAndCleanOTP(identifier, otp);

  if (isValid) {
    res.status(200).json({
      success: true,
      message: 'OTP verified successfully'
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid or expired OTP'
    });
  }
}));

// Get OTP status (for debugging - remove in production)
router.get('/status/:identifier', asyncHandler(async (req, res) => {
  const { identifier } = req.params;

  const status = otpService.getOTPStatus(identifier);

  res.status(200).json({
    success: true,
    status
  });
}));

export default router;
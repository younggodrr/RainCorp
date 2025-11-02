import express from 'express';
import { handleStripeWebhook, testStripeWebhook } from '../controllers/webhooks/stripe';
import { handlePayPalWebhook, testPayPalWebhook, capturePayPalOrder } from '../controllers/webhooks/paypal';
import { handleMpesaWebhook, validateMpesaPayment, confirmMpesaPayment, queryMpesaPaymentStatus } from '../controllers/webhooks/mpesa';

const router = express.Router();

// Stripe Webhooks
router.post('/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);
router.post('/stripe/test', testStripeWebhook); // Remove in production

// PayPal Webhooks
router.post('/paypal', handlePayPalWebhook);
router.post('/paypal/test', testPayPalWebhook); // Remove in production
router.post('/paypal/capture/:orderId', capturePayPalOrder);

// M-Pesa Webhooks and APIs
router.post('/mpesa/callback', handleMpesaWebhook);
router.post('/mpesa/validation', validateMpesaPayment);
router.post('/mpesa/confirm', confirmMpesaPayment);
router.get('/mpesa/status/:checkoutRequestId', queryMpesaPaymentStatus);

// Webhook verification endpoint (for testing)
router.get('/verify', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Webhook endpoint is active',
    timestamp: new Date().toISOString(),
    providers: ['stripe', 'paypal', 'mpesa']
  });
});

export default router;
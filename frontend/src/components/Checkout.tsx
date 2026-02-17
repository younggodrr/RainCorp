import React, { useState } from 'react';
import { Loader2, ArrowLeft, RefreshCw } from 'lucide-react';

interface CheckoutProps {
  amount: number;
  currency?: string;
  itemTitle: string;
  itemDescription?: string;
  onClose: () => void;
  isDarkMode?: boolean;
}

export default function Checkout({
  amount,
  currency = 'KES',
  itemTitle,
  itemDescription,
  onClose,
  isDarkMode = false
}: CheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error' | 'refunded'>('idle');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRefunding, setIsRefunding] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'mpesa' | 'paypal' | 'stripe'>('card');

  const handlePayment = async () => {
    setIsProcessing(true);
    setErrorMessage('');
    try {
      const token = localStorage.getItem('accessToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE;
      if (!apiUrl) throw new Error('API URL is not defined');
      if (!token) throw new Error('Not authenticated');

      // Determine mock ID based on selected method
      let paymentMethodId = "pm_card_visa";
      if (selectedMethod === 'mpesa') paymentMethodId = "pm_mpesa_mock";
      if (selectedMethod === 'paypal') paymentMethodId = "pm_paypal_mock";

      // 1. Create Payment Intent
      const payload = {
        amount: amount * 100, // Convert to cents if needed, assuming backend expects smallest unit
        currency: currency.toLowerCase(),
        paymentMethodId: paymentMethodId,
        description: `Payment via ${selectedMethod}`
      };

      const response = await fetch(`${apiUrl}/integrations/payments/create`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      // Assuming the response contains an ID we can use for refund
      // Adjust based on actual backend response structure
      setPaymentId(data.id || data.paymentIntentId || 'mock_payment_id'); 
      setPaymentStatus('success');
    } catch (error: any) {
      console.error('Payment error:', error);
      setErrorMessage(error.message || 'Payment failed');
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRefund = async () => {
    if (!paymentId) return;
    
    setIsRefunding(true);
    try {
      const token = localStorage.getItem('accessToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE;
      if (!apiUrl) throw new Error('API URL is not defined');
      if (!token) throw new Error('Not authenticated');

      const payload = {
        paymentIntentId: paymentId,
        amount: amount * 100, // Refund full amount
        reason: "requested_by_user"
      };

      const response = await fetch(`${apiUrl}/integrations/payments/refund`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Refund failed');
      }

      setPaymentStatus('refunded');
      alert('Refund processed successfully');
    } catch (error: any) {
      console.error('Refund error:', error);
      alert(error.message || 'Refund failed');
    } finally {
      setIsRefunding(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm`}>
        <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl text-center ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20 text-white' : 'bg-white text-gray-800'}`}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
          <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            You have successfully purchased <strong>{itemTitle}</strong>
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Done
            </button>
            <button
              onClick={handleRefund}
              disabled={isRefunding}
              className={`px-6 py-3 rounded-xl font-bold border transition-colors flex items-center gap-2 ${
                isDarkMode 
                  ? 'border-red-500 text-red-500 hover:bg-red-500/10' 
                  : 'border-red-500 text-red-500 hover:bg-red-50'
              }`}
            >
              {isRefunding ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
              Request Refund
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm`}>
      <div className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#111] border border-[#E70008]/20 text-white' : 'bg-white text-gray-800'}`}>
        
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <h3 className="font-bold text-lg">Checkout</h3>
          <button onClick={onClose} className={`p-2 rounded-full hover:bg-gray-100/10`}>
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1">
          <div className="mb-8">
            <span className={`text-sm font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Order Summary</span>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h4 className="text-xl font-bold">{itemTitle}</h4>
                {itemDescription && <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{itemDescription}</p>}
              </div>
              <div className="text-xl font-bold">
                {currency} {amount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border mb-8 ${isDarkMode ? 'bg-[#222] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subtotal</span>
              <span className="font-medium">{currency} {amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tax (0%)</span>
              <span className="font-medium">{currency} 0.00</span>
            </div>
            <div className={`h-px w-full my-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg">{currency} {amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="mb-6">
            <span className={`text-sm font-medium uppercase tracking-wider block mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Payment Method</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  selectedMethod === 'card'
                    ? (isDarkMode ? 'border-[#E70008] bg-[#E70008]/10 text-[#E70008]' : 'border-black bg-black/5 text-black')
                    : (isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300')
                }`}
              >
                <span className="text-sm font-bold">Card</span>
              </button>
              <button
                onClick={() => setSelectedMethod('mpesa')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  selectedMethod === 'mpesa'
                    ? 'border-[#43B02A] bg-[#43B02A]/10 text-[#43B02A]'
                    : (isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300')
                }`}
              >
                <span className="text-sm font-bold">M-Pesa</span>
              </button>
              <button
                onClick={() => setSelectedMethod('paypal')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  selectedMethod === 'paypal'
                    ? 'border-[#003087] bg-[#003087]/10 text-[#003087]'
                    : (isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300')
                }`}
              >
                <span className="text-sm font-bold">PayPal</span>
              </button>
              <button
                onClick={() => setSelectedMethod('stripe')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  selectedMethod === 'stripe'
                    ? 'border-[#635BFF] bg-[#635BFF]/10 text-[#635BFF]'
                    : (isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300')
                }`}
              >
                <span className="text-sm font-bold">Stripe</span>
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-[#F4A261] to-[#E70008] text-white hover:opacity-90' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" /> Processing...
              </>
            ) : (
              `Pay ${currency} ${amount.toLocaleString()}`
            )}
          </button>
        </div>

        {/* Footer */}
        <div className={`p-4 text-center text-xs border-t ${isDarkMode ? 'border-gray-800 text-gray-500' : 'border-gray-100 text-gray-400'}`}>
          Secure payment processing by Magna Coders
        </div>
      </div>
    </div>
  );
}
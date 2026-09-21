import { request } from './api';

export async function createPaymentOrder({ profileId, unlockType, unlockedProfileIds }) {
  return await request('/payments/order', {
    method: 'POST',
    body: JSON.stringify({
      profileId,
      unlockType,
      unlockedProfileIds
    })
  });
}

export async function verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  return await request('/payments/verify', {
    method: 'POST',
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    })
  });
}

export function launchRazorpayCheckout({
  orderId,
  amount,
  currency = 'INR',
  keyId,
  userName,
  userEmail,
  onSuccess,
  onError,
  onDismiss
}) {
  if (typeof window.Razorpay === 'undefined') {
    const error = new Error('Razorpay SDK failed to load. Please check your internet connection.');
    if (onError) onError(error);
    return;
  }

  const options = {
    key: keyId,
    amount: amount,
    currency: currency,
    name: 'YAARIO',
    description: 'Unlock Matched Buddy Profiles',
    order_id: orderId,
    prefill: {
      name: userName || 'Buddy User',
      email: userEmail || 'user@yaario.com',
      contact: '9999999999'
    },
    theme: {
      color: '#e11d48'
    },
    handler: function (response) {
      if (onSuccess) {
        onSuccess(response);
      }
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) {
          onDismiss();
        }
      }
    }
  };

  const razorpayInstance = new window.Razorpay(options);
  razorpayInstance.on('payment.failed', function (response) {
    if (onError) {
      onError(response.error);
    }
  });

  razorpayInstance.open();
}

import React, { useState } from 'react';
import { X, Lock, CheckCircle2, ShieldCheck, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext';
import { createPaymentOrder, verifyPayment, launchRazorpayCheckout } from '../../services/paymentService';
import { getUnlockedMatches } from '../../services/matchService';
import { getProfileAvatar } from '../../lib/avatars';

export default function UnlockModal({
  targetProfile,
  allProfiles = [],
  isOpen,
  onClose,
  defaultUnlockType = 'single'
}) {
  if (!isOpen) return null;

  const { profile, profileId, markProfilesUnlocked, setUnlockedMatches, showToast, setCurrentScreen } = useApp();
  const [unlockType, setUnlockType] = useState(defaultUnlockType);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePaymentInitiate = async () => {
    if (!profileId) {
      showToast('Profile ID not found. Please create a profile first.', 'error');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      let targetIds = [];
      if (unlockType === 'single') {
        if (!targetProfile?._id) {
          throw new Error('Target profile is required for single unlock');
        }
        targetIds = [targetProfile._id];
      } else {
        targetIds = allProfiles.map((m) => m.profile._id);
      }

      // Step 1: Call POST /api/payments/order
      const orderRes = await createPaymentOrder({
        profileId,
        unlockType,
        unlockedProfileIds: targetIds
      });

      if (!orderRes.success || !orderRes.data) {
        throw new Error(orderRes.message || 'Failed to create payment order');
      }

      const { orderId, amount, currency, keyId } = orderRes.data;

      // Step 2: Open Razorpay Test Mode Checkout
      launchRazorpayCheckout({
        orderId,
        amount,
        currency,
        keyId,
        userName: profile?.name,
        userEmail: `${profile?.name?.toLowerCase().replace(/\s+/g, '') || 'user'}@yaario.com`,
        onSuccess: async (razorpayResponse) => {
          try {
            // Step 3: Call POST /api/payments/verify
            const verifyRes = await verifyPayment({
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature
            });

            if (verifyRes.success) {
              markProfilesUnlocked(targetIds);
              setIsSuccess(true);
              setIsProcessing(false);

              // Step 4: Fetch verified unlocked matches
              try {
                const unlockedRes = await getUnlockedMatches(profileId);
                if (unlockedRes.success) {
                  setUnlockedMatches(unlockedRes.data || []);
                }
              } catch (e) {
                console.error('Error fetching unlocked matches after payment:', e);
              }
            } else {
              throw new Error(verifyRes.message || 'Payment signature verification failed');
            }
          } catch (verifyError) {
            console.error('Verification error:', verifyError);
            setErrorMessage(verifyError.message || 'Payment verification failed');
            showToast(verifyError.message || 'Payment verification failed', 'error');
            setIsProcessing(false);
          }
        },
        onError: (err) => {
          console.error('Razorpay Error:', err);
          setErrorMessage(err.description || err.message || 'Payment failed');
          showToast('Payment cancelled or failed', 'error');
          setIsProcessing(false);
        },
        onDismiss: () => {
          showToast('Payment checkout closed', 'info');
          setIsProcessing(false);
        }
      });
    } catch (err) {
      console.error('Payment initialization error:', err);
      setErrorMessage(err.message || 'Could not initiate payment');
      showToast(err.message || 'Payment initialization failed', 'error');
      setIsProcessing(false);
    }
  };

  const handleSuccessDone = () => {
    onClose();
    setCurrentScreen('unlocked');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden flex flex-col">
        {/* SUCCESS VIEW */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                You're connected ✨
              </h3>
              <p className="text-sm text-stone-600">
                {unlockType === 'all'
                  ? 'All matched profiles have been unlocked.'
                  : `Your connection with ${targetProfile?.name || 'buddy'} has been unlocked.`}
              </p>
            </div>

            <p className="text-xs text-stone-400 bg-stone-50 p-3 rounded-2xl border border-stone-100">
              Verified via HMAC SHA-256 in Razorpay Test Sandbox. You can now explore full profile information.
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                onClick={handleSuccessDone}
                icon={ArrowRight}
                className="w-full"
              >
                View Unlocked Profiles
              </Button>
            </div>
          </div>
        ) : (
          /* UNLOCK PURCHASE OPTIONS VIEW */
          <>
            {/* Header */}
            <div className="p-6 pb-4 border-b border-stone-100 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-2xs">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">Unlock Connection</h3>
                  <p className="text-xs text-stone-500">Razorpay Test Mode Sandbox</p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="p-1.5 rounded-xl bg-white border border-stone-200 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body Options */}
            <div className="p-6 space-y-3">
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center gap-2.5 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {targetProfile && (
                <div
                  onClick={() => setUnlockType('single')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    unlockType === 'single'
                      ? 'bg-rose-50/50 border-rose-400 shadow-2xs'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={getProfileAvatar(targetProfile.name, targetProfile.gender)}
                        alt={targetProfile.name}
                        className="w-10 h-10 rounded-xl object-cover border border-stone-200 shadow-2xs"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">
                            Unlock {targetProfile.name}
                          </span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                            Single
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Direct meetup details for this profile
                        </p>
                      </div>
                    </div>
                    <span className="text-base font-extrabold text-stone-900">₹99</span>
                  </div>
                </div>
              )}

              <div
                onClick={() => setUnlockType('all')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  unlockType === 'all'
                    ? 'bg-purple-50/50 border-purple-400 shadow-2xs'
                    : 'bg-white border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">Unlock All Matches</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">
                        Best Value
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Unlock all {allProfiles.length} buddies discovered in {profile?.city || 'your city'}
                    </p>
                  </div>
                  <span className="text-base font-extrabold text-stone-900">₹99</span>
                </div>
              </div>

              {/* Safety notice */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-100 space-y-1.5 text-xs text-stone-500">
                <div className="flex items-center gap-2 text-stone-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Test-mode simulation (no real payment deducted)</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant HMAC SHA-256 verification</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0 flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handlePaymentInitiate}
                isLoading={isProcessing}
                icon={Sparkles}
              >
                Pay · ₹99
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

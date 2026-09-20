import crypto from 'crypto';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Payment from '../models/Payment.js';
import getRazorpayInstance from '../config/razorpay.js';

export const createOrder = async (req, res) => {
  try {
    const { profileId, unlockType, unlockedProfileIds } = req.body;

    if (!profileId || !mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing source profile ID'
      });
    }

    if (!unlockType || !['single', 'all'].includes(unlockType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid unlockType. Allowed values are "single" or "all"'
      });
    }

    if (!Array.isArray(unlockedProfileIds)) {
      return res.status(400).json({
        success: false,
        message: 'unlockedProfileIds must be an array'
      });
    }

    if (unlockType === 'single') {
      if (unlockedProfileIds.length !== 1) {
        return res.status(400).json({
          success: false,
          message: 'Exactly one unlockedProfileId is required for single unlockType'
        });
      }
      if (!mongoose.Types.ObjectId.isValid(unlockedProfileIds[0])) {
        return res.status(400).json({
          success: false,
          message: 'Invalid target profile ID format'
        });
      }
    } else if (unlockType === 'all') {
      for (const id of unlockedProfileIds) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            success: false,
            message: `Invalid target profile ID format: ${id}`
          });
        }
      }
    }

    const sourceProfile = await Profile.findById(profileId);
    if (!sourceProfile) {
      return res.status(404).json({
        success: false,
        message: 'Source profile not found'
      });
    }

    if (unlockType === 'single') {
      const targetProfile = await Profile.findById(unlockedProfileIds[0]);
      if (!targetProfile) {
        return res.status(404).json({
          success: false,
          message: 'Target profile to unlock not found'
        });
      }
    } else if (unlockType === 'all' && unlockedProfileIds.length > 0) {
      const existingCount = await Profile.countDocuments({
        _id: { $in: unlockedProfileIds }
      });
      if (existingCount !== unlockedProfileIds.length) {
        return res.status(404).json({
          success: false,
          message: 'One or more target profiles to unlock were not found'
        });
      }
    }

    const razorpay = getRazorpayInstance();
    const options = {
      amount: 9900,
      currency: 'INR',
      receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    await Payment.create({
      profileId: sourceProfile._id,
      razorpayOrderId: razorpayOrder.id,
      amount: 9900,
      currency: 'INR',
      unlockType,
      unlockedProfileIds,
      status: 'created'
    });

    return res.status(201).json({
      success: true,
      message: 'Payment order created successfully',
      data: {
        orderId: razorpayOrder.id,
        amount: 9900,
        currency: 'INR',
        unlockType,
        keyId: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    console.error('Error creating payment order:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create payment order'
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification fields'
      });
    }

    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment order not found'
      });
    }

    if (payment.status === 'paid') {
      return res.status(200).json({
        success: true,
        message: 'Payment is already verified',
        data: {
          orderId: payment.razorpayOrderId,
          paymentId: payment.razorpayPaymentId,
          status: 'paid',
          unlockType: payment.unlockType
        }
      });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error('RAZORPAY_KEY_SECRET is missing');
      return res.status(500).json({
        success: false,
        message: 'Failed to verify payment due to missing configuration'
      });
    }

    const body = `${payment.razorpayOrderId}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    const expectedBuf = Buffer.from(expectedSignature, 'utf8');
    const receivedBuf = Buffer.from(razorpay_signature, 'utf8');

    const isSignatureValid =
      expectedBuf.length === receivedBuf.length &&
      crypto.timingSafeEqual(expectedBuf, receivedBuf);

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.status = 'paid';
    await payment.save();

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        orderId: payment.razorpayOrderId,
        paymentId: payment.razorpayPaymentId,
        status: 'paid',
        unlockType: payment.unlockType
      }
    });
  } catch (error) {
    console.error('Error verifying payment:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify payment'
    });
  }
};

import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
    index: true
  },
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },
  razorpayPaymentId: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'INR'
  },
  unlockType: {
    type: String,
    required: true,
    enum: ['single', 'all']
  },
  unlockedProfileIds: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
    default: []
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'paid', 'failed'],
    default: 'created'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

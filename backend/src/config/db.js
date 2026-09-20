import mongoose from 'mongoose';

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is required');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed');
    throw error;
  }
}
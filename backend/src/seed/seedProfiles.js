import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Profile from '../models/Profile.js';
import { profileData } from './profileData.js';

dotenv.config();

const seedProfiles = async () => {
  try {
    await connectDB();

    const count = await Profile.countDocuments();
    if (count > 0) {
      console.log('Profiles already exist. Seed skipped.');
      await mongoose.connection.close();
      process.exit(0);
    }

    await Profile.insertMany(profileData);
    console.log('Successfully seeded 24 sample profiles.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedProfiles();

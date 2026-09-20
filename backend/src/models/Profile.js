import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 120
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  profession: {
    type: String,
    required: true,
    trim: true
  },
  hobbies: {
    type: [String],
    required: true,
    validate: [v => Array.isArray(v) && v.length > 0, 'At least one hobby is required']
  },
  interests: {
    type: [String],
    required: true,
    validate: [v => Array.isArray(v) && v.length > 0, 'At least one interest is required']
  },
  preferredActivities: {
    type: [String],
    required: true,
    validate: [v => Array.isArray(v) && v.length > 0, 'At least one preferred activity is required']
  },
  bio: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 500
  },
  lookingFor: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Both', 'Anyone']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

profileSchema.index({ city: 1, gender: 1 });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;

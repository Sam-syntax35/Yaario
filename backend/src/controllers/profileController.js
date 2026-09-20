import Profile from '../models/Profile.js';

export const createProfile = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required'
      });
    }

    const {
      name,
      age,
      gender,
      city,
      profession,
      hobbies,
      interests,
      preferredActivities,
      bio,
      lookingFor
    } = req.body;

    const profileData = {
      name,
      age,
      gender,
      city,
      profession,
      hobbies,
      interests,
      preferredActivities,
      bio,
      lookingFor
    };

    const profile = await Profile.create(profileData);

    return res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: profile
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    console.error('Error creating profile:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create profile'
    });
  }
};

import mongoose from 'mongoose';
import Profile from '../models/Profile.js';

export const getMatches = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid profile ID format'
      });
    }

    const sourceProfile = await Profile.findById(profileId);
    if (!sourceProfile) {
      return res.status(404).json({
        success: false,
        message: 'Source profile not found'
      });
    }

    const candidateQuery = {
      _id: { $ne: sourceProfile._id },
      city: sourceProfile.city
    };

    if (sourceProfile.lookingFor === 'Male') {
      candidateQuery.gender = 'Male';
    } else if (sourceProfile.lookingFor === 'Female') {
      candidateQuery.gender = 'Female';
    } else if (sourceProfile.lookingFor === 'Both') {
      candidateQuery.gender = { $in: ['Male', 'Female'] };
    }

    if (sourceProfile.gender === 'Male' || sourceProfile.gender === 'Female') {
      candidateQuery.lookingFor = { $in: [sourceProfile.gender, 'Both', 'Anyone'] };
    } else {
      candidateQuery.lookingFor = 'Anyone';
    }

    const candidates = await Profile.find(candidateQuery);

    const matches = candidates.map((candidate) => {
      const sharedHobbies = candidate.hobbies.filter((hobby) =>
        sourceProfile.hobbies.includes(hobby)
      );
      const hobbiesScore = sharedHobbies.length * 20;

      const sharedInterests = candidate.interests.filter((interest) =>
        sourceProfile.interests.includes(interest)
      );
      const interestsScore = sharedInterests.length * 20;

      const sharedActivities = candidate.preferredActivities.filter((activity) =>
        sourceProfile.preferredActivities.includes(activity)
      );
      const activitiesScore = sharedActivities.length * 15;

      const ageDifference = Math.abs(sourceProfile.age - candidate.age);
      let ageScore = 0;
      if (ageDifference <= 2) {
        ageScore = 25;
      } else if (ageDifference <= 5) {
        ageScore = 15;
      } else if (ageDifference <= 10) {
        ageScore = 5;
      }

      const totalScore = hobbiesScore + interestsScore + activitiesScore + ageScore;
      const matchScore = Math.min(100, totalScore);

      return {
        profile: candidate,
        matchScore,
        matchDetails: {
          sharedHobbies,
          sharedInterests,
          sharedActivities,
          ageDifference
        }
      };
    });

    matches.sort((a, b) => b.matchScore - a.matchScore);

    return res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch matches'
    });
  }
};

import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Payment from '../models/Payment.js';

export const getUnlockedMatches = async (req, res) => {
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

    const paidPayments = await Payment.find({
      profileId: sourceProfile._id,
      status: 'paid'
    });

    if (!paidPayments || paidPayments.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. No verified payments found for this profile.'
      });
    }

    const hasUnlockedAll = paidPayments.some(p => p.unlockType === 'all');
    const unlockedProfileIdSet = new Set();

    paidPayments.forEach(payment => {
      if (Array.isArray(payment.unlockedProfileIds)) {
        payment.unlockedProfileIds.forEach(id => {
          unlockedProfileIdSet.add(id.toString());
        });
      }
    });

    const unlockedProfileIds = [...unlockedProfileIdSet];

    let unlockedCandidates = [];

    if (hasUnlockedAll) {
      unlockedCandidates = await Profile.find({
        _id: { $ne: sourceProfile._id },
        city: sourceProfile.city
      });
    } else {
      unlockedCandidates = await Profile.find({
        _id: { $in: unlockedProfileIds }
      });
    }

    if (unlockedCandidates.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Target profile(s) have not been unlocked.'
      });
    }

    const matches = unlockedCandidates.map(candidate => {
      const sharedHobbies = candidate.hobbies.filter(hobby =>
        sourceProfile.hobbies.includes(hobby)
      );
      const hobbiesScore = sharedHobbies.length * 20;

      const sharedInterests = candidate.interests.filter(interest =>
        sourceProfile.interests.includes(interest)
      );
      const interestsScore = sharedInterests.length * 20;

      const sharedActivities = candidate.preferredActivities.filter(activity =>
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
    console.error('Error fetching unlocked matches:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch unlocked matches'
    });
  }
};

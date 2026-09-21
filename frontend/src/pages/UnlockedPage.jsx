import React, { useEffect, useState } from 'react';
import { UserCheck, Sparkles, ArrowLeft, MapPin, Briefcase, CheckCircle2, MessageCircle, Heart, Compass } from 'lucide-react';
import Button from '../components/common/Button';
import ProfileModal from '../components/matches/ProfileModal';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import { useApp } from '../context/AppContext';
import { getUnlockedMatches } from '../services/matchService';
import { getProfileAvatar } from '../lib/avatars';

export default function UnlockedPage() {
  const { profile, profileId, unlockedMatches, setUnlockedMatches, setCurrentScreen } = useApp();
  const [selectedProfileForModal, setSelectedProfileForModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!profileId) {
      setCurrentScreen('landing');
      return;
    }

    async function fetchVerifiedUnlocked() {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await getUnlockedMatches(profileId);
        if (response.success) {
          setUnlockedMatches(response.data || []);
        } else {
          throw new Error(response.message || 'No unlocked connections found');
        }
      } catch (err) {
        console.error('Error fetching unlocked profiles:', err);
        setFetchError(err.message || 'Could not retrieve unlocked profiles');
      } finally {
        setIsLoading(false);
      }
    }

    fetchVerifiedUnlocked();
  }, [profileId]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200/90">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Connections</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Unlocked Buddy Profiles
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Confirmed via Razorpay Test Mode with backend cryptographic verification. Direct hangout access enabled.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setCurrentScreen('matches')}
          icon={ArrowLeft}
        >
          Back to Matches
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <LoadingState
          title="Verifying your unlocked connections..."
          subtitle="Querying backend payment records and retrieving verified profiles."
        />
      )}

      {/* Empty / Error State */}
      {!isLoading && (fetchError || unlockedMatches.length === 0) && (
        <EmptyState
          title="No unlocked profiles yet"
          description={
            fetchError ||
            "You haven't completed any profile unlocks yet. Explore your matches and unlock a buddy with Razorpay test mode to see them here."
          }
          actionLabel="Browse Matches"
          onAction={() => setCurrentScreen('matches')}
        />
      )}

      {/* Unlocked Profiles Grid */}
      {!isLoading && unlockedMatches.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unlockedMatches.map((matchItem) => {
            const { profile: buddy, matchScore, matchDetails } = matchItem;
            const avatarUrl = getProfileAvatar(buddy.name, buddy.gender);

            return (
              <div
                key={buddy._id}
                className="rounded-3xl bg-white border border-emerald-200 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6">
                  {/* Status Banner */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Unlocked Connection
                    </span>
                    <span className="text-xs font-extrabold text-stone-500">
                      {matchScore}% Compatibility
                    </span>
                  </div>

                  {/* Profile Details */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={avatarUrl}
                      alt={buddy.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shadow-2xs"
                    />
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight">
                        {buddy.name}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {buddy.age} yrs • {buddy.profession}
                      </p>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {buddy.city}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-stone-600 italic bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-100 mb-4 leading-relaxed">
                    "{buddy.bio}"
                  </p>

                  {/* Hobbies & Activities */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                        Hobbies & Passions
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {buddy.hobbies?.map((h) => (
                          <span
                            key={h}
                            className="px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                        Preferred Hangouts
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {buddy.preferredActivities?.map((act) => (
                          <span
                            key={act}
                            className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-xs font-medium border border-amber-100"
                          >
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-[#FAF8F5] border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Ready to Connect
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedProfileForModal(matchItem)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Profile Detail Modal */}
      {selectedProfileForModal && (
        <ProfileModal
          matchData={selectedProfileForModal}
          isUnlocked={true}
          onClose={() => setSelectedProfileForModal(null)}
        />
      )}
    </div>
  );
}

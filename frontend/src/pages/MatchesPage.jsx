import React, { useState } from 'react';
import { Sparkles, Users, Lock, Filter, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import MatchCard from '../components/matches/MatchCard';
import ProfileModal from '../components/matches/ProfileModal';
import UnlockModal from '../components/payment/UnlockModal';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { useApp } from '../context/AppContext';

export default function MatchesPage() {
  const { profile, matches, unlockedIds, setCurrentScreen, resetFlow } = useApp();

  const [selectedProfileForModal, setSelectedProfileForModal] = useState(null);
  const [unlockModalState, setUnlockModalState] = useState({
    isOpen: false,
    targetProfile: null,
    defaultType: 'single'
  });

  const [filterTab, setFilterTab] = useState('all');

  const filteredMatches = matches.filter((item) => {
    const isUnlocked = unlockedIds.has(item.profile._id);
    if (filterTab === 'high_score') return item.matchScore >= 70;
    if (filterTab === 'unlocked') return isUnlocked;
    return true;
  });

  const handleOpenUnlockSingle = (targetProf) => {
    setUnlockModalState({
      isOpen: true,
      targetProfile: targetProf,
      defaultType: 'single'
    });
  };

  const handleOpenUnlockAll = () => {
    setUnlockModalState({
      isOpen: true,
      targetProfile: matches[0]?.profile || null,
      defaultType: 'all'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200/90">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-600 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated For {profile?.name?.split(' ')[0] || 'You'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            People you might click with
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            We discovered {matches.length} like-minded people in{' '}
            <strong className="text-stone-900">{profile?.city || 'your area'}</strong> based on shared hobbies and activities.
          </p>
        </div>

        {matches.length > 0 && (
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="primary"
              onClick={handleOpenUnlockAll}
              icon={Sparkles}
              className="shadow-sm shadow-rose-500/20"
            >
              Unlock all matches · ₹99
            </Button>
          </div>
        )}
      </div>

      {/* Tabs & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-stone-200/90 shadow-2xs w-fit">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterTab === 'all'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Matches ({matches.length})
          </button>
          <button
            onClick={() => setFilterTab('high_score')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterTab === 'high_score'
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Strong Synergy (&gt;70%)
          </button>
          <button
            onClick={() => setFilterTab('unlocked')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterTab === 'unlocked'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Unlocked ({unlockedIds.size})
          </button>
        </div>

        <span className="text-xs text-stone-500">
          Showing {filteredMatches.length} candidates
        </span>
      </div>

      {/* Empty States */}
      {filteredMatches.length === 0 ? (
        <EmptyState
          title={filterTab === 'unlocked' ? 'No unlocked profiles yet' : 'No matches found in this filter'}
          description={
            filterTab === 'unlocked'
              ? 'Click "Unlock profile · ₹99" on any buddy card to verify with Razorpay test mode and connect!'
              : `We couldn't find matches in ${profile?.city || 'this city'} with current filters. Try changing your filters or starting a new profile.`
          }
          actionLabel={filterTab === 'unlocked' ? 'View All Matches' : 'Create New Profile'}
          onAction={filterTab === 'unlocked' ? () => setFilterTab('all') : resetFlow}
        />
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((matchItem) => {
            const isUnlocked = unlockedIds.has(matchItem.profile._id);
            return (
              <MatchCard
                key={matchItem.profile._id}
                matchData={matchItem}
                isUnlocked={isUnlocked}
                onUnlockClick={handleOpenUnlockSingle}
                onViewClick={(data) => setSelectedProfileForModal(data)}
              />
            );
          })}
        </div>
      )}

      {/* Profile Detail Modal */}
      {selectedProfileForModal && (
        <ProfileModal
          matchData={selectedProfileForModal}
          isUnlocked={unlockedIds.has(selectedProfileForModal.profile._id)}
          onClose={() => setSelectedProfileForModal(null)}
          onUnlockClick={handleOpenUnlockSingle}
        />
      )}

      {/* Razorpay Test Mode Unlock Modal */}
      <UnlockModal
        isOpen={unlockModalState.isOpen}
        targetProfile={unlockModalState.targetProfile}
        allProfiles={matches}
        defaultUnlockType={unlockModalState.defaultType}
        onClose={() =>
          setUnlockModalState({ isOpen: false, targetProfile: null, defaultType: 'single' })
        }
      />
    </div>
  );
}

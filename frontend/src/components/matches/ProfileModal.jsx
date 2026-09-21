import React from 'react';
import { X, Sparkles, MapPin, Briefcase, Heart, Compass, CheckCircle2, Lock, Check } from 'lucide-react';
import Button from '../common/Button';
import { getProfileAvatar } from '../../lib/avatars';

export default function ProfileModal({
  matchData,
  isUnlocked = false,
  onClose,
  onUnlockClick
}) {
  if (!matchData) return null;

  const { profile, matchScore, matchDetails } = matchData;
  const { sharedHobbies = [], sharedInterests = [], sharedActivities = [], ageDifference = 0 } = matchDetails || {};

  const avatarUrl = getProfileAvatar(profile.name, profile.gender);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header with Avatar and Basic Info */}
        <div className="p-6 border-b border-stone-100 flex items-start justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-4">
            <img
              src={avatarUrl}
              alt={profile.name}
              className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                  {profile.name}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-200/80 text-stone-700 font-semibold">
                  {profile.age} yrs
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                  {profile.profession}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {profile.city}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Compatibility Breakdown Card: "Why you match" */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/70 via-purple-50/50 to-white border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <h4 className="text-sm font-extrabold text-stone-900">Why you match</h4>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200">
                {matchScore}% Compatibility
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700">
              {sharedHobbies.length > 0 && (
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Shared hobbies:</strong> {sharedHobbies.join(', ')}
                  </span>
                </div>
              )}

              {sharedInterests.length > 0 && (
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Common interests:</strong> {sharedInterests.join(', ')}
                  </span>
                </div>
              )}

              {sharedActivities.length > 0 && (
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Matching weekend vibe:</strong> {sharedActivities.join(', ')}
                  </span>
                </div>
              )}

              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Age compatibility:</strong> {ageDifference === 0 ? 'Same age' : `${ageDifference} year(s) apart`}
                </span>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              About {profile.name.split(' ')[0]}
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-stone-100">
              "{profile.bio}"
            </p>
          </div>

          {/* Full Hobbies & Interests Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-100">
              <h5 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                <span>All Hobbies</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {profile.hobbies?.map((hobby) => {
                  const isShared = sharedHobbies.includes(hobby);
                  return (
                    <span
                      key={hobby}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        isShared
                          ? 'bg-rose-100 text-rose-800 font-bold border border-rose-200'
                          : 'bg-white text-stone-600 border border-stone-200'
                      }`}
                    >
                      {hobby} {isShared && '✓'}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-100">
              <h5 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>All Interests</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests?.map((interest) => {
                  const isShared = sharedInterests.includes(interest);
                  return (
                    <span
                      key={interest}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        isShared
                          ? 'bg-purple-100 text-purple-800 font-bold border border-purple-200'
                          : 'bg-white text-stone-600 border border-stone-200'
                      }`}
                    >
                      {interest} {isShared && '✓'}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-5 border-t border-stone-100 bg-[#FAF8F5] flex items-center justify-between gap-3">
          {isUnlocked ? (
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>You have unlocked this connection</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-stone-500 text-xs">
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Unlock to connect directly</span>
            </div>
          )}

          {!isUnlocked && (
            <Button
              variant="primary"
              onClick={() => {
                onClose();
                onUnlockClick(profile);
              }}
              icon={Lock}
            >
              Unlock profile · ₹99
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

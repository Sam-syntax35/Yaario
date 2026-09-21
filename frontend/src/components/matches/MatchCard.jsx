import React from 'react';
import { MapPin, Briefcase, Heart, Compass, Sparkles, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { getProfileAvatar } from '../../lib/avatars';

export default function MatchCard({
  matchData,
  isUnlocked = false,
  onUnlockClick,
  onViewClick
}) {
  const { profile, matchScore, matchDetails } = matchData;
  const { sharedHobbies = [], sharedInterests = [], sharedActivities = [], ageDifference = 0 } = matchDetails || {};

  const avatarUrl = getProfileAvatar(profile.name, profile.gender);

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl bg-white border transition-all duration-200 ${
        isUnlocked
          ? 'border-emerald-200/90 shadow-sm shadow-emerald-500/5'
          : 'border-stone-200/90 shadow-sm hover:shadow-md hover:-translate-y-1'
      }`}
    >
      {/* Card Header with Avatar, Details, and Compatibility Badge */}
      <div className="p-5 sm:p-6 pb-3">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={avatarUrl}
                alt={profile.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-stone-200 shadow-2xs"
              />
              {isUnlocked && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-2xs">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight">
                  {profile.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                  {profile.age}
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

          {/* Match Score Badge */}
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-extrabold shrink-0">
            {matchScore}% Match
          </span>
        </div>

        {/* Bio Excerpt */}
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#FAF8F5] p-3 rounded-2xl border border-stone-100 italic line-clamp-2">
          "{profile.bio}"
        </p>
      </div>

      {/* Shared Intersections */}
      <div className="px-5 sm:px-6 space-y-2.5 flex-1">
        {sharedHobbies.length > 0 && (
          <div>
            <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block mb-1">
              Shared Hobbies ({sharedHobbies.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sharedHobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}

        {sharedInterests.length > 0 && (
          <div>
            <span className="text-[11px] font-semibold text-purple-600 uppercase tracking-wider block mb-1">
              Shared Interests ({sharedInterests.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sharedInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {sharedActivities.length > 0 && (
          <div>
            <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider block mb-1">
              Hangout Compatibility
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sharedActivities.map((act) => (
                <span
                  key={act}
                  className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-xs font-medium border border-amber-100"
                >
                  {act}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="p-5 sm:p-6 pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-3">
        {isUnlocked ? (
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Unlocked Connection</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-stone-400 text-xs font-medium">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>Direct meetups locked</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onViewClick(matchData)}
          >
            Why you match
          </Button>

          {isUnlocked ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewClick(matchData)}
            >
              View Full
            </Button>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onUnlockClick(profile)}
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

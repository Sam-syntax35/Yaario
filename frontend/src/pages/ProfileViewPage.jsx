import React from 'react';
import { User, MapPin, Briefcase, Heart, Compass, Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { getProfileAvatar } from '../lib/avatars';

export default function ProfileViewPage() {
  const { profile, setCurrentScreen, resetFlow } = useApp();

  if (!profile) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <h3 className="text-lg font-bold text-stone-900 mb-2">No Profile Active</h3>
        <p className="text-xs text-stone-500 mb-6">Create a profile to begin discovering buddies.</p>
        <Button variant="primary" onClick={() => setCurrentScreen('onboarding')}>
          Create Profile
        </Button>
      </div>
    );
  }

  const avatarUrl = getProfileAvatar(profile.name, profile.gender);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 bg-[#FAF8F5]">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/90">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentScreen('matches')}
          icon={ArrowLeft}
        >
          Back to Matches
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFlow}
          icon={RefreshCw}
        >
          Start New Profile
        </Button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={avatarUrl}
            alt={profile.name}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl object-cover border-2 border-stone-200 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                {profile.name}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
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
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-stone-500">
              <span className="font-semibold text-stone-700">Looking for:</span> {profile.lookingFor} buddies
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
            Bio & Lifestyle
          </h4>
          <p className="text-sm text-stone-700 leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-stone-100">
            "{profile.bio}"
          </p>
        </div>

        {/* Hobbies & Interests */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              <span>Your Hobbies</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {profile.hobbies?.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Your Interests</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests?.map((i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Preferred Hangout Style</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {profile.preferredActivities?.map((a) => (
                <span
                  key={a}
                  className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-medium border border-amber-100"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getMatches } from '../services/matchService';
import Button from '../components/common/Button';
import { HERO_SAMPLE_PROFILES } from '../lib/constants';
import { getProfileAvatar } from '../lib/avatars';

export default function ScanningPage() {
  const { profile, profileId, setMatches, setCurrentScreen, showToast } = useApp();
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [hasError, setHasError] = useState(null);

  const scanStatusMessages = [
    `Finding people near you in ${profile?.city || 'your city'}...`,
    'Comparing your interests and passions...',
    'Checking shared hobbies & weekend plans...',
    'Calculating multi-factor compatibility...'
  ];

  useEffect(() => {
    if (!profileId) {
      setCurrentScreen('onboarding');
      return;
    }

    // Step cycle ticker
    const interval = setInterval(() => {
      setScanStepIndex((prev) => (prev < scanStatusMessages.length - 1 ? prev + 1 : prev));
    }, 750);

    let isMounted = true;

    async function fetchMatches() {
      try {
        const response = await getMatches(profileId);
        if (!isMounted) return;

        if (response.success) {
          setMatches(response.data || []);
          setTimeout(() => {
            if (isMounted) {
              setCurrentScreen('matches');
            }
          }, 2200);
        } else {
          throw new Error(response.message || 'Failed to fetch matches');
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Scan error:', err);
        setHasError(err.message || 'Failed to retrieve matches');
        showToast(err.message || 'Error finding matches', 'error');
      }
    }

    fetchMatches();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [profileId]);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-12 text-center bg-[#FAF8F5]">
      {hasError ? (
        <div className="max-w-md p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-1">Could Not Load Matches</h3>
          <p className="text-xs text-stone-500 mb-6">{hasError}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setCurrentScreen('onboarding')}>
              Edit Preferences
            </Button>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center max-w-lg mx-auto">
          {/* Central Orbit Effect */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-8">
            {/* Outer Orbit Circle */}
            <div className="absolute inset-0 rounded-full border border-stone-200/90" />
            <div className="absolute inset-8 rounded-full border border-dashed border-rose-200" />
            <div className="absolute inset-16 rounded-full border border-stone-200/70" />

            {/* Orbiting Satellite Avatars */}
            <div className="absolute inset-0 animate-orbit pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  src={getProfileAvatar(HERO_SAMPLE_PROFILES[0].name, HERO_SAMPLE_PROFILES[0].gender)}
                  alt="Candidate"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
              <div className="absolute bottom-4 right-6">
                <img
                  src={getProfileAvatar(HERO_SAMPLE_PROFILES[1].name, HERO_SAMPLE_PROFILES[1].gender)}
                  alt="Candidate"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
              <div className="absolute bottom-4 left-6">
                <img
                  src={getProfileAvatar(HERO_SAMPLE_PROFILES[2].name, HERO_SAMPLE_PROFILES[2].gender)}
                  alt="Candidate"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
            </div>

            {/* Center Core Profile Photo */}
            <div className="relative w-20 h-20 rounded-full bg-white border-2 border-rose-500 p-1 shadow-md animate-warm-pulse">
              <img
                src={getProfileAvatar(profile?.name || '', profile?.gender || 'Male')}
                alt={profile?.name || 'User'}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Dynamic Status Captions */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-600">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Matching Engine</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight transition-all duration-300">
              {scanStatusMessages[scanStepIndex]}
            </h2>

            <p className="text-xs text-stone-500">
              Matching for <strong className="text-stone-800">{profile?.name}</strong> in{' '}
              <strong className="text-stone-800">{profile?.city}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

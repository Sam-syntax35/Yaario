import React from 'react';
import { Compass, Users, UserCheck, User, RefreshCw, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getProfileAvatar } from '../../lib/avatars';

export default function Navbar() {
  const { currentScreen, setCurrentScreen, profile, matches, unlockedIds, resetFlow } = useApp();

  const isPostOnboarding = Boolean(profile) && currentScreen !== 'landing' && currentScreen !== 'onboarding' && currentScreen !== 'scanning';

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EBE6DF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => setCurrentScreen(profile ? 'matches' : 'landing')}
            className="flex items-center cursor-pointer select-none group"
          >
            <img
              src="/logo.svg"
              alt="yaario."
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* Minimal Navigation (Before Profile Creation) */}
          {!isPostOnboarding ? (
            <div className="flex items-center gap-4">
              {currentScreen === 'landing' && (
                <>
                  <button
                    onClick={() => setCurrentScreen('onboarding')}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#141416] hover:bg-stone-800 text-[#FAF7F2] transition-all shadow-sm cursor-pointer"
                  >
                    <span>Find my people</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF5364]" />
                  </button>
                </>
              )}
            </div>
          ) : (
            /* App-style Navigation (After Onboarding) */
            <div className="flex items-center gap-1 sm:gap-2">
              <nav className="hidden md:flex items-center gap-1 p-1 bg-white rounded-full border border-[#EBE6DF] shadow-2xs">
                <button
                  onClick={() => setCurrentScreen('matches')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    currentScreen === 'matches'
                      ? 'bg-[#141416] text-[#FAF7F2] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Matches</span>
                  {matches.length > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      currentScreen === 'matches' ? 'bg-stone-800 text-rose-300' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {matches.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentScreen('unlocked')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    currentScreen === 'unlocked'
                      ? 'bg-[#FF5364] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Unlocked</span>
                  {unlockedIds.size > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      currentScreen === 'unlocked' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-[#FF5364]'
                    }`}>
                      {unlockedIds.size}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentScreen('profile_view')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    currentScreen === 'profile_view'
                      ? 'bg-[#141416] text-[#FAF7F2] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>
              </nav>

              {/* User profile avatar pill */}
              <div
                onClick={() => setCurrentScreen('profile_view')}
                className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-[#EBE6DF] text-xs text-stone-700 cursor-pointer hover:border-stone-400 transition-colors shadow-2xs"
              >
                <img
                  src={getProfileAvatar(profile.name, profile.gender)}
                  alt={profile.name}
                  className="w-6 h-6 rounded-full object-cover border border-stone-200"
                />
                <span className="font-semibold text-stone-900 hidden sm:inline">{profile.name.split(' ')[0]}</span>
                <span className="text-[11px] text-stone-400 hidden sm:inline">({profile.city})</span>
              </div>

              {/* Restart flow */}
              <button
                onClick={resetFlow}
                title="Start New Profile"
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (When in active app mode) */}
      {isPostOnboarding && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EBE6DF] px-4 py-2 flex items-center justify-around shadow-lg">
          <button
            onClick={() => setCurrentScreen('matches')}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-3 rounded-xl transition-colors ${
              currentScreen === 'matches' ? 'text-[#FF5364] font-bold' : 'text-stone-500'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Matches ({matches.length})</span>
          </button>

          <button
            onClick={() => setCurrentScreen('unlocked')}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-3 rounded-xl transition-colors ${
              currentScreen === 'unlocked' ? 'text-[#FF5364] font-bold' : 'text-stone-500'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Unlocked ({unlockedIds.size})</span>
          </button>

          <button
            onClick={() => setCurrentScreen('profile_view')}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-3 rounded-xl transition-colors ${
              currentScreen === 'profile_view' ? 'text-[#FF5364] font-bold' : 'text-stone-500'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </nav>
      )}
    </>
  );
}

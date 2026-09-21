import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Screen flow: 'landing' | 'onboarding' | 'scanning' | 'matches' | 'unlocked'
  const [currentScreen, setCurrentScreen] = useState('landing');
  
  // Active user profile & matches
  const [profile, setProfile] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [unlockedMatches, setUnlockedMatches] = useState([]);
  const [unlockedIds, setUnlockedIds] = useState(new Set());

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, duration);
  };

  const setProfileData = (newProfile) => {
    setProfile(newProfile);
    setProfileId(newProfile?._id || null);
  };

  const markProfilesUnlocked = (newUnlockedIds) => {
    setUnlockedIds((prev) => {
      const updated = new Set(prev);
      newUnlockedIds.forEach((id) => updated.add(id));
      return updated;
    });
  };

  const resetFlow = () => {
    setProfile(null);
    setProfileId(null);
    setMatches([]);
    setUnlockedMatches([]);
    setUnlockedIds(new Set());
    setCurrentScreen('landing');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        profile,
        profileId,
        setProfileData,
        matches,
        setMatches,
        unlockedMatches,
        setUnlockedMatches,
        unlockedIds,
        markProfilesUnlocked,
        toast,
        showToast,
        resetFlow
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

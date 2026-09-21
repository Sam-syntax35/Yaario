import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Toast from './components/common/Toast';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import ScanningPage from './pages/ScanningPage';
import MatchesPage from './pages/MatchesPage';
import UnlockedPage from './pages/UnlockedPage';
import ProfileViewPage from './pages/ProfileViewPage';

function MainContent() {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-rose-500 selection:text-white">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        {currentScreen === 'landing' && <LandingPage />}
        {currentScreen === 'onboarding' && <OnboardingPage />}
        {currentScreen === 'scanning' && <ScanningPage />}
        {currentScreen === 'matches' && <MatchesPage />}
        {currentScreen === 'unlocked' && <UnlockedPage />}
        {currentScreen === 'profile_view' && <ProfileViewPage />}
      </main>
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InteractiveMapBackground } from './components/DigitalTwinMap/InteractiveMapBackground';
import { AuthCard } from './components/Auth/AuthCard';
import { LandingPage } from './components/Landing/LandingPage';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const [viewMode, setViewMode] = useState<'landing' | 'auth'>('landing');

  // When user is authenticated, enter directly into the Innovation (SUMO Simulation sandbox) view!
  if (isAuthenticated) {
    return (
      <LandingPage
        initialTab="twin"
        authenticatedUser={user}
        onSignOut={logout}
        onExplore={() => {}}
        onLaunch={() => {}}
      />
    );
  }

  // 1. Landing Page View (Default when user arrives)
  if (viewMode === 'landing') {
    return (
      <LandingPage
        onExplore={() => setViewMode('auth')}
        onLaunch={() => setViewMode('auth')}
      />
    );
  }

  // 2. Authentication View (Opened upon clicking "Explore the Digital Twin" or "Launch Experience")
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden flex flex-col justify-center">
      {/* 1. Architectural 3D Isometric Map Background with Live Traffic & Pedestrians */}
      <InteractiveMapBackground />

      {/* 2. Main Content Viewport: Balanced centered position */}
      <main className="relative z-10 w-full min-h-screen flex items-center justify-center lg:justify-start px-6 sm:px-12 lg:pl-[14vw] xl:pl-[18vw] 2xl:pl-[22vw] py-8 animate-fadeIn">
        {isLoading ? (
          <div className="glass-card rounded-[20px] p-10 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#58A783] animate-spin" />
            <span className="text-xs font-semibold text-[#293A27] tracking-wider uppercase">
              Verifying Smart City Session...
            </span>
          </div>
        ) : (
          <AuthCard onBackToLanding={() => setViewMode('landing')} />
        )}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  const googleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    '616697110221-s826h11pfu4nunm4j437lhu0iot49oqo.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;

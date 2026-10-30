import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { ArrowLeft } from 'lucide-react';

interface AuthCardProps {
  onBackToLanding?: () => void;
  defaultMode?: 'login' | 'signup';
}

export const AuthCard: React.FC<AuthCardProps> = ({ onBackToLanding, defaultMode = 'signup' }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(defaultMode);

  return (
    <div className="w-full max-w-[430px] transition-all duration-300">
      <div className="glass-card rounded-[20px] px-7 py-7 sm:px-9 sm:py-8 relative">
        {/* Back to Landing Page Button */}
        {onBackToLanding && (
          <button
            type="button"
            onClick={onBackToLanding}
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D4A38] hover:text-[#112418] hover:-translate-x-0.5 transition-all cursor-pointer"
            title="Return to Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        )}

        {/* Tab Toggle Header */}
        <div className="flex bg-[#1E281C]/10 p-1 rounded-full mb-5 max-w-[240px] mx-auto border border-[#B5C3B1]/40">
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              authMode === 'signup'
                ? 'bg-white text-[#192318] shadow-sm'
                : 'text-[#485846] hover:text-[#192318]'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-[#192318] shadow-sm'
                : 'text-[#485846] hover:text-[#192318]'
            }`}
          >
            Log In
          </button>
        </div>

        {/* Active Auth View */}
        {authMode === 'signup' ? (
          <SignUpForm onSwitchToLogin={() => setAuthMode('login')} />
        ) : (
          <LoginForm onSwitchToSignUp={() => setAuthMode('signup')} />
        )}
      </div>
    </div>
  );
};


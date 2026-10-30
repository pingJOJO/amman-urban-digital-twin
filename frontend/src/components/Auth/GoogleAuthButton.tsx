import React, { useState } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';

interface GoogleAuthButtonProps {
  disabled?: boolean;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ disabled = false }) => {
  const { loginWithGoogle, isLoading } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const isRealClientConfigured =
    googleClientId &&
    !googleClientId.includes('your_google_client_id') &&
    googleClientId.endsWith('.apps.googleusercontent.com');

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    setAuthError(null);
    if (credentialResponse.credential) {
      try {
        await loginWithGoogle(credentialResponse.credential);
      } catch (err: unknown) {
        console.error('Google auth error:', err);
        setAuthError(err instanceof Error ? err.message : 'Google authentication failed.');
      }
    }
  };

  const handleError = () => {
    console.warn('Google Login popup closed or origin unverified.');
    setAuthError(
      'Google sign-in could not be completed. If popups are blocked, please allow them or ensure http://localhost:5173 is authorized in Google Cloud Console.'
    );
  };

  const handleSimulatedGoogleClick = async () => {
    setAuthError(null);
    const demoToken = JSON.stringify({
      mock_email: 'city.planner@amman-digital-twin.jo',
      mock_name: 'Eng. Laila Haddad',
      sub: 'google-sub-sample-987654321',
    });
    try {
      await loginWithGoogle(demoToken);
    } catch (err: unknown) {
      console.error('Google simulated auth error:', err);
      setAuthError(err instanceof Error ? err.message : 'Simulation failed');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {authError && (
        <div className="w-full mb-3 p-2.5 rounded-lg bg-amber-950/20 border border-amber-600/40 text-amber-950 text-xs flex items-center gap-2 text-left">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
          <div className="flex-1 text-[11px] leading-tight">
            <span>{authError}</span>
            <button
              type="button"
              onClick={handleSimulatedGoogleClick}
              className="mt-1 block text-emerald-800 underline font-semibold hover:text-emerald-950 cursor-pointer"
            >
              Instant Demo Google Account Login (Quick Preview)
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="w-full h-[42px] rounded-full border border-[#96B89F] bg-white/60 flex items-center justify-center gap-2 shadow-sm">
          <Loader2 className="w-4 h-4 animate-spin text-[#2E7752]" />
          <span className="text-xs font-semibold text-[#1F3320] tracking-wide">
            Authenticating Google account with system...
          </span>
        </div>
      ) : isRealClientConfigured ? (
        <div className="flex justify-center w-full min-h-[44px]">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap={false}
            shape="pill"
            text="continue_with"
            size="large"
            theme="outline"
            width="340"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={handleSimulatedGoogleClick}
          disabled={disabled || isLoading}
          className="w-full h-[43px] rounded-full border border-[#AAB8A6] bg-white/40 hover:bg-white/75 active:bg-white/90 transition-all flex items-center justify-center gap-2.5 text-[14px] text-[#1C241B] font-medium shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          title="Sign in with Google OAuth2"
        >
          <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.49 12.275c0-.85-.075-1.675-.215-2.475H12v4.685h6.45c-.28 1.5-1.125 2.775-2.395 3.63v3.015h3.875c2.265-2.085 3.56-5.16 3.56-8.855z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.955-1.075 7.94-2.91l-3.875-3.015c-1.075.72-2.45 1.15-4.065 1.15-3.125 0-5.775-2.11-6.72-4.945H1.275v3.11C3.25 21.31 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.61H1.275C.465 8.23 0 10.06 0 12s.465 3.77 1.275 5.39l4.005-3.11z"
            />
            <path
              fill="#EA4335"
              d="M12 4.775c1.76 0 3.34.605 4.585 1.795l3.435-3.435C17.95 1.19 15.235 0 12 0 7.31 0 3.25 2.69 1.275 6.61l4.005 3.11c.945-2.835 3.595-4.945 6.72-4.945z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      )}
    </div>
  );
};

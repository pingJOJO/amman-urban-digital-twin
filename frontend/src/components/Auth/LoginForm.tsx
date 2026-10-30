import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GoogleAuthButton } from './GoogleAuthButton';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Sparkles, Check } from 'lucide-react';

interface LoginFormProps {
  onSwitchToSignUp: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignUp }) => {
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isEmailValid = emailRegex.test(email.trim());

  const validateForm = (): boolean => {
    setValidationError(null);
    clearError();

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setValidationError('يرجى إدخال البريد الإلكتروني / Please enter your email.');
      return false;
    }

    if (!isEmailValid) {
      setValidationError('صيغة البريد الإلكتروني غير صحيحة (مثال: name@domain.com)');
      return false;
    }

    if (!password) {
      setValidationError('يرجى إدخال كلمة المرور / Please enter your password.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login({
        email: email.trim().toLowerCase(),
        password,
      });
    } catch {
      // Error handled by AuthContext
    }
  };

  const handleDemoLogin = async () => {
    setValidationError(null);
    clearError();
    setEmail('engineer.faris@amman-digital-twin.jo');
    setPassword('SmartCity#2026');
    try {
      await login({
        email: 'engineer.faris@amman-digital-twin.jo',
        password: 'SmartCity#2026',
      });
    } catch {
      // Error handled by AuthContext
    }
  };

  return (
    <div className="w-full">
      {/* Header with Official Logo */}
      <div className="text-center mb-3">
        <img
          src="/logo.png"
          alt="Amman Urban Digital Twin Logo"
          className="w-16 h-16 sm:w-[72px] sm:h-[72px] mx-auto mb-1.5 object-contain drop-shadow-[0_8px_16px_rgba(20,50,30,0.18)] hover:scale-105 transition-transform duration-300 pointer-events-none"
        />
        <h2 className="font-editorial text-[33px] sm:text-[37px] text-[#141B14] font-normal leading-tight tracking-[-0.01em] mb-1">
          Sign In
        </h2>
        <p className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.06em] uppercase text-[#384A36]">
          ACCESS THE AMMAN URBAN DIGITAL TWIN PLATFORM
        </p>
      </div>

      {/* 1-Click Demo Login Banner */}
      <div className="mb-3.5 p-2.5 rounded-xl bg-emerald-900/10 border border-emerald-600/30 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="text-left">
            <p className="text-[11.5px] font-semibold text-[#1B3219]">حساب تجريبي جاهز للدخول الفوري</p>
            <p className="text-[10px] text-[#475C44]">engineer.faris@amman-digital-twin.jo</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="px-3 py-1.5 rounded-full bg-[#3D8B62] hover:bg-[#327753] active:bg-[#276243] text-white text-[11px] font-semibold tracking-wide transition-all shadow-sm hover:scale-105 cursor-pointer shrink-0 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'دخول فوري ⚡'}
        </button>
      </div>

      {/* Alert Error Box */}
      {(validationError || error) && (
        <div className="mb-3.5 p-3 rounded-lg bg-red-900/15 border border-red-500/35 text-red-900 text-xs flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
          <span>{validationError || error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Email Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-medium text-[#293828]">
            <label>Email Address</label>
            {email.length > 0 && (
              isEmailValid ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                  <Check className="w-3 h-3 stroke-[3]" /> صحيح
                </span>
              ) : (
                <span className="text-amber-800 font-medium text-[11px]">
                  صيغة غير مكتملة
                </span>
              )
            )}
          </div>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#60745D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationError) setValidationError(null);
              }}
              required
              placeholder="engineer.faris@amman-digital-twin.jo"
              className="twin-input w-full h-[40px] pl-10 pr-3.5 rounded-[8px] text-[13.5px]"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-medium text-[#293828]">
            <label>Password</label>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#60745D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (validationError) setValidationError(null);
              }}
              required
              placeholder="••••••••••••"
              className="twin-input w-full h-[40px] pl-10 pr-10 rounded-[8px] text-[13.5px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#60745D] hover:text-[#283827] focus:outline-none cursor-pointer"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-cta w-full h-[44px] rounded-full text-[#152216] text-[13.5px] font-semibold tracking-[0.04em] uppercase flex items-center justify-center gap-2 mt-3 cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AUTHENTICATING...</span>
            </>
          ) : (
            <span>LOG IN</span>
          )}
        </button>
      </form>

      {/* "OR" Divider */}
      <div className="relative flex py-3.5 items-center">
        <div className="flex-grow border-t border-[#B5C4B2]"></div>
        <span className="flex-shrink mx-3 text-[11px] font-medium text-[#4D5E4B] uppercase tracking-wider">
          OR
        </span>
        <div className="flex-grow border-t border-[#B5C4B2]"></div>
      </div>

      {/* Google OAuth Button - Official Pill Design matching Attachment 1 */}
      <GoogleAuthButton disabled={isLoading} label="Sign in with Google" />

      {/* Footer Switcher */}
      <p className="text-center text-[13px] text-[#1E271D] mt-4 font-normal">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="underline decoration-[#1E271D] underline-offset-2 font-semibold hover:text-[#2A6D4E] transition-colors cursor-pointer"
        >
          Create Account
        </button>
      </p>
    </div>
  );
};


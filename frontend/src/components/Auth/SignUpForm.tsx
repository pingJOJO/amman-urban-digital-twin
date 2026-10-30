import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GoogleAuthButton } from './GoogleAuthButton';
import { User, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Check, X } from 'lucide-react';

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToLogin }) => {
  const { signup, isLoading, error, clearError } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Real-time validations
  const nameHasSpace = /\s/.test(fullName);
  const isNameValid = fullName.trim().length >= 2 && !nameHasSpace;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isEmailValid = emailRegex.test(email.trim());

  // Password Checklist criteria
  const hasUpper = /[A-Z]/.test(password);
  const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasLength = password.length >= 8;
  const isPasswordValid = hasUpper && hasNumberOrSymbol && hasLength;

  const isConfirmMatch = confirmPassword.length > 0 && confirmPassword === password;
  const isConfirmMismatch = confirmPassword.length > 0 && confirmPassword !== password;

  const isFormComplete = isNameValid && isEmailValid && isPasswordValid && isConfirmMatch && agreeTerms;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFullName(val);
    if (validationError) setValidationError(null);
  };

  const validateBeforeSubmit = (): boolean => {
    setValidationError(null);
    clearError();

    if (!fullName.trim()) {
      setValidationError('يرجى إدخال الاسم / Please enter your name.');
      return false;
    }

    if (nameHasSpace) {
      setValidationError('الاسم يجب ألا يحتوي على أي مسافات (No spaces allowed in name/username).');
      return false;
    }

    if (fullName.trim().length < 2) {
      setValidationError('الاسم يجب أن يكون خانتين على الأقل (Name must be at least 2 characters).');
      return false;
    }

    if (!isEmailValid) {
      setValidationError('يرجى إدخال بريد إلكتروني صحيح (e.g. name@domain.com).');
      return false;
    }

    if (!isPasswordValid) {
      setValidationError('يرجى استيفاء جميع شروط كلمة المرور الثلاثة الموضحة بالأسفل.');
      return false;
    }

    if (password !== confirmPassword) {
      setValidationError('كلمة المرور وتأكيد كلمة المرور غير متطابقتين (Passwords do not match).');
      return false;
    }

    if (!agreeTerms) {
      setValidationError('يجب الموافقة على شروط الاستخدام لإنشاء الحساب.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBeforeSubmit()) return;

    try {
      await signup({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
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
        <h2 className="font-editorial text-[32px] sm:text-[36px] text-[#141B14] font-normal leading-tight tracking-[-0.01em] mb-1">
          Create Account
        </h2>
        <p className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.06em] uppercase text-[#384A36]">
          JOIN THE AMMAN URBAN DIGITAL TWIN PLATFORM
        </p>
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
        {/* Full Name / Username */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-medium text-[#293828]">
            <span>Name / Username (بدون مسافات)</span>
            {fullName.length > 0 && (
              nameHasSpace ? (
                <span className="text-red-700 font-semibold flex items-center gap-1 text-[11px]">
                  <X className="w-3 h-3 stroke-[3]" /> لا يُسمح بالمسافات
                </span>
              ) : isNameValid ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                  <Check className="w-3 h-3 stroke-[3]" /> صحيح
                </span>
              ) : null
            )}
          </div>
          <div className="relative">
            <User className="w-4 h-4 text-[#60745D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={fullName}
              onChange={handleNameChange}
              required
              placeholder="Faris_AlMajali"
              className={`twin-input w-full h-[40px] pl-10 pr-3.5 rounded-[8px] text-[13.5px] ${
                nameHasSpace ? 'border-red-500 ring-2 ring-red-400/30' : ''
              }`}
            />
          </div>
          {nameHasSpace && (
            <p className="text-red-700 text-[11px] font-medium mt-0.5">
              ⚠️ يرجى إزالة المسافات (استخدم الأحرف، الأرقام، أو _ بدلاً من المسافة).
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-medium text-[#293828]">
            <span>Email Address</span>
            {email.length > 0 && (
              isEmailValid ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                  <Check className="w-3 h-3 stroke-[3]" /> صحيح
                </span>
              ) : (
                <span className="text-amber-800 font-medium text-[11px]">
                  بريد غير مكتمل
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
              placeholder="engineer@amman-digital-twin.jo"
              className="twin-input w-full h-[40px] pl-10 pr-3.5 rounded-[8px] text-[13.5px]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-medium text-[#293828]">
            <span>Password</span>
            {password.length > 0 && isPasswordValid && (
              <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                <Check className="w-3 h-3 stroke-[3]" /> كلمة مرور قوية
              </span>
            )}
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

          {/* DYNAMIC 3-ITEM PASSWORD CHECKLIST (Displayed only when user starts typing password) */}
          {password.length > 0 && (
            <div className="p-2.5 rounded-lg bg-black/5 border border-[#B5C4B2]/40 text-xs space-y-1.5 mt-1.5 transition-all animate-fadeIn">
              <p className="font-semibold text-[#273826] text-[11px] mb-0.5">
                متطلبات كلمة المرور (Password Checklist):
              </p>
              
              {/* Checklist Item 1: Uppercase Letter */}
              <div className={`flex items-center gap-2 transition-colors ${hasUpper ? 'text-emerald-700 font-semibold' : 'text-[#586A56]'}`}>
                {hasUpper ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-[#8BA088] inline-block shrink-0" />
                )}
                <span className="text-[11.5px]">حرف كبير واحد على الأقل (At least one uppercase A-Z)</span>
              </div>

              {/* Checklist Item 2: Number or Special Symbol */}
              <div className={`flex items-center gap-2 transition-colors ${hasNumberOrSymbol ? 'text-emerald-700 font-semibold' : 'text-[#586A56]'}`}>
                {hasNumberOrSymbol ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-[#8BA088] inline-block shrink-0" />
                )}
                <span className="text-[11.5px]">رقم أو رمز واحد على الأقل (At least one number or symbol)</span>
              </div>

              {/* Checklist Item 3: Minimum 8 characters */}
              <div className={`flex items-center gap-2 transition-colors ${hasLength ? 'text-emerald-700 font-semibold' : 'text-[#586A56]'}`}>
                {hasLength ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-[#8BA088] inline-block shrink-0" />
                )}
                <span className="text-[11.5px]">8 خانات على الأقل (At least 8 characters)</span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-medium text-[#293828]">
            <span>Confirm Password</span>
            {isConfirmMatch && (
              <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                <Check className="w-3 h-3 stroke-[3]" /> متطابقتان
              </span>
            )}
            {isConfirmMismatch && (
              <span className="text-red-700 font-semibold flex items-center gap-1 text-[11px]">
                <X className="w-3 h-3 stroke-[3]" /> غير متطابقتين
              </span>
            )}
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#60745D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (validationError) setValidationError(null);
              }}
              required
              placeholder="••••••••••••"
              className={`twin-input w-full h-[40px] pl-10 pr-3.5 rounded-[8px] text-[13.5px] ${
                isConfirmMismatch ? 'border-red-500 ring-2 ring-red-400/30' : ''
              }`}
            />
          </div>
          {isConfirmMismatch && (
            <p className="text-red-700 text-[11px] font-medium mt-0.5">
              ⚠️ كلمة المرور وتأكيدها غير متطابقتين.
            </p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="pt-0.5 pb-0.5 flex items-center">
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="peer sr-only"
            />
            <span className="w-[18px] h-[18px] rounded-[4px] bg-[#BEE8B2] border border-[#8FC685] flex items-center justify-center text-[#1B2B19] peer-checked:bg-[#8EDAA7] transition-all">
              {agreeTerms && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </span>
            <span className="text-[12.5px] text-[#1C251B]">
              I agree to Terms & Conditions
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !isFormComplete}
          className="btn-cta w-full h-[44px] rounded-full text-[#152216] text-[13.5px] font-semibold tracking-[0.04em] uppercase flex items-center justify-center gap-2 mt-2 cursor-pointer transition disabled:opacity-55 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>CREATING ACCOUNT...</span>
            </>
          ) : (
            <span>CREATE ACCOUNT</span>
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
      <GoogleAuthButton disabled={isLoading} label="Sign up with Google" />

      {/* Footer Switcher */}
      <p className="text-center text-[13px] text-[#1E271D] mt-3.5 font-normal">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="underline decoration-[#1E271D] underline-offset-2 font-semibold hover:text-[#2A6D4E] transition-colors cursor-pointer"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

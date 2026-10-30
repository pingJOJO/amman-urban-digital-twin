import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginFormData, SignUpFormData } from '../types/auth';
import { authService } from '../services/api';
import type { AxiosError } from 'axios';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: Omit<SignUpFormData, 'confirm_password' | 'terms_accepted'>) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'smart_city_auth_token';
const USER_KEY = 'smart_city_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Restore and verify user session on initial load
  useEffect(() => {
    const verifySession = async () => {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const freshUser = await authService.getMe();
        setUser(freshUser);
        localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
      } catch (err) {
        console.warn('Stored session invalid or expired:', err);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();

    // Listen for 401 session expiration event from api interceptor
    const handleExpired = () => {
      setToken(null);
      setUser(null);
      setError('Your session has expired. Please log in again.');
    };
    window.addEventListener('auth_session_expired', handleExpired);

    return () => {
      window.removeEventListener('auth_session_expired', handleExpired);
    };
  }, []);

  const clearError = () => setError(null);

  const handleAuthSuccess = (accessToken: string, authUser: User) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    setToken(accessToken);
    setUser(authUser);
    setError(null);
  };

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      handleAuthSuccess(response.access_token, response.user);
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      const msg = axiosErr.response?.data?.detail || 'Invalid email or password. Please try again.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: Omit<SignUpFormData, 'confirm_password' | 'terms_accepted'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.signup(data);
      handleAuthSuccess(response.access_token, response.user);
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      const msg = axiosErr.response?.data?.detail || 'Registration failed. Please check your data and try again.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (credential: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.googleAuth(credential);
      handleAuthSuccess(response.access_token, response.user);
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      const msg = axiosErr.response?.data?.detail || 'Google sign-in failed. Please try again.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        error,
        login,
        signup,
        loginWithGoogle,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

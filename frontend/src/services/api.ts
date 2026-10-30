import axios, { type AxiosError } from 'axios';
import type { AuthResponse, User, LoginFormData, SignUpFormData } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token from localStorage to every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('smart_city_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Global error formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ detail?: string }>) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized / expired session
      localStorage.removeItem('smart_city_auth_token');
      localStorage.removeItem('smart_city_user');
      window.dispatchEvent(new Event('auth_session_expired'));
    }
    return Promise.reject(error);
  }
);

export const authService = {
  /**
   * Register a new user with email, password, and full name.
   */
  async signup(data: Omit<SignUpFormData, 'confirm_password' | 'terms_accepted'>): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/signup', data);
    return res.data;
  },

  /**
   * Authenticate user with email and password.
   */
  async login(data: LoginFormData): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', data);
    return res.data;
  },

  /**
   * Authenticate or register user via Google OAuth2 ID token.
   */
  async googleAuth(credential: string): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/google', { credential });
    return res.data;
  },

  /**
   * Fetch current authenticated user's profile.
   */
  async getMe(): Promise<User> {
    const res = await apiClient.get<User>('/auth/me');
    return res.data;
  },
};

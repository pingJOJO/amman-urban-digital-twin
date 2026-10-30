export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  has_password: boolean;
  auth_provider: 'local' | 'google' | 'hybrid';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_accepted: boolean;
}

export interface FormValidationErrors {
  full_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  terms?: string;
  general?: string;
}


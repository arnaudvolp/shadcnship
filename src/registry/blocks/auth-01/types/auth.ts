// =============================================================================
// Authentication Types
// =============================================================================

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
}

export type OAuthProvider = "google" | "github" | "discord" | "twitter";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface UpdatePasswordCredentials {
  password: string;
  confirmPassword: string;
}

export interface AuthFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  redirectTo?: string;
  className?: string;
}

export interface OAuthButtonsProps {
  providers?: OAuthProvider[];
  onOAuthClick?: (provider: OAuthProvider) => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

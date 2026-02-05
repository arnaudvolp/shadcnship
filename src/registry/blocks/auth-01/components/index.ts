// Components
export { AuthLayout } from "./auth-layout";
export { LoginForm } from "./login-form";
export { RegisterForm } from "./register-form";
export { ForgotPasswordForm } from "./forgot-password-form";
export { ResetPasswordForm } from "./reset-password-form";
export { MagicLinkForm } from "./magic-link-form";
export { OAuthButtons } from "./oauth-buttons";

// Re-export types
export type {
  AuthUser,
  AuthSession,
  AuthState,
  OAuthProvider,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  UpdatePasswordCredentials,
  AuthFormProps,
  OAuthButtonsProps,
} from "../types/auth";

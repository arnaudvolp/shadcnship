"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AuthLayout,
  LoginForm,
  RegisterForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  MagicLinkForm,
  OAuthButtons,
} from "./components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoIcon } from "../social-icons/icons";
import type { OAuthProvider } from "./types/auth";

// =============================================================================
// Demo Auth Actions (for preview)
// =============================================================================

const demoSignIn = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (password.length < 8) throw new Error("Invalid email or password");
  console.log("Sign in:", { email, password });
};

const demoSignUp = async (data: { email: string; password: string; name?: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Sign up:", data);
};

const demoOAuth = async (provider: OAuthProvider) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("OAuth:", provider);
};

const demoForgotPassword = async (email: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Forgot password:", email);
};

const demoResetPassword = async (password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Reset password");
};

const demoMagicLink = async (email: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Magic link:", email);
};

// =============================================================================
// Auth01 Props
// =============================================================================

interface Auth01Props {
  defaultTab?: "login" | "register" | "forgot" | "reset" | "magic";
  variant?: "card" | "split";
  logo?: React.ReactNode;
  splitImage?: string;
  tagline?: string;
  onSignIn?: (email: string, password: string) => Promise<void>;
  onSignUp?: (data: { email: string; password: string; name?: string }) => Promise<void>;
  onOAuth?: (provider: OAuthProvider) => Promise<void>;
  onForgotPassword?: (email: string) => Promise<void>;
  onResetPassword?: (password: string) => Promise<void>;
  onMagicLink?: (email: string) => Promise<void>;
  oauthProviders?: OAuthProvider[];
  showMagicLink?: boolean;
  className?: string;
}

// =============================================================================
// Main Component
// =============================================================================

export default function Auth01({
  defaultTab = "login",
  variant = "card",
  logo,
  splitImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
  tagline = "Build faster. Ship smarter.",
  onSignIn = demoSignIn,
  onSignUp = demoSignUp,
  onOAuth = demoOAuth,
  onForgotPassword = demoForgotPassword,
  onResetPassword = demoResetPassword,
  onMagicLink = demoMagicLink,
  oauthProviders = ["google", "github"],
  showMagicLink = true,
  className,
}: Auth01Props) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const defaultLogo = (
    <div className="flex items-center gap-2">
      <LogoIcon className="size-6 dark:invert" />
      <span className="font-semibold">ShadcnShip</span>
    </div>
  );

  const renderContent = () => {
    // Forgot password view
    if (activeTab === "forgot") {
      return (
        <AuthLayout
          logo={logo ?? defaultLogo}
          heading="Forgot password?"
          description="Enter your email and we'll send you a reset link."
          variant={variant}
          splitImage={splitImage}
          splitContent={
            <div className="max-w-md">
              <p className="text-sm text-muted mb-2 dark:text-muted-foreground">
                No worries
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                {tagline}
              </h2>
            </div>
          }
          footer={
            <p className="text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <button
                onClick={() => setActiveTab("login")}
                className="font-medium text-foreground hover:underline underline-offset-4"
              >
                Sign in
              </button>
            </p>
          }
          className={className}
        >
          <ForgotPasswordForm onSubmit={onForgotPassword} />
        </AuthLayout>
      );
    }

    // Reset password view
    if (activeTab === "reset") {
      return (
        <AuthLayout
          logo={logo ?? defaultLogo}
          heading="Reset password"
          description="Enter your new password below."
          variant={variant}
          splitImage={splitImage}
          splitContent={
            <div className="max-w-md">
              <p className="text-sm text-muted mb-2 dark:text-muted-foreground">
                Almost there
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                {tagline}
              </h2>
            </div>
          }
          className={className}
        >
          <ResetPasswordForm
            onSubmit={onResetPassword}
            loginHref="#"
          />
        </AuthLayout>
      );
    }

    // Magic link view
    if (activeTab === "magic") {
      return (
        <AuthLayout
          logo={logo ?? defaultLogo}
          heading="Sign in with magic link"
          description="We'll email you a magic link for a password-free sign in."
          variant={variant}
          splitImage={splitImage}
          splitContent={
            <div className="max-w-md">
              <p className="text-sm text-muted mb-2 dark:text-muted-foreground">
                No password needed
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                {tagline}
              </h2>
            </div>
          }
          footer={
            <p className="text-center text-sm text-muted-foreground">
              Prefer to use a password?{" "}
              <button
                onClick={() => setActiveTab("login")}
                className="font-medium text-foreground hover:underline underline-offset-4"
              >
                Sign in with password
              </button>
            </p>
          }
          className={className}
        >
          <MagicLinkForm onSubmit={onMagicLink} />
        </AuthLayout>
      );
    }

    // Login / Register tabs
    return (
      <AuthLayout
        logo={logo ?? defaultLogo}
        heading={activeTab === "login" ? "Welcome back" : "Create an account"}
        description={
          activeTab === "login"
            ? "Enter your credentials to access your account"
            : "Enter your details to get started"
        }
        variant={variant}
        splitImage={splitImage}
        splitContent={
          <div className="max-w-md">
            <p className="text-sm text-muted mb-2 dark:text-muted-foreground">
              Get started
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              {tagline}
            </h2>
          </div>
        }
        footer={
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {activeTab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setActiveTab("register")}
                    className="font-medium text-foreground hover:underline underline-offset-4"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="font-medium text-foreground hover:underline underline-offset-4"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-foreground">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-foreground">
                Privacy Policy
              </a>
            </p>
          </div>
        }
        className={className}
      >
        <div className="space-y-6">
          {/* OAuth Buttons */}
          {oauthProviders.length > 0 && (
            <>
              <OAuthButtons providers={oauthProviders} onOAuthClick={onOAuth} />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-4 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Forms */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm
                onSubmit={async (data) => onSignIn(data.email, data.password)}
                forgotPasswordHref="#"
                onSuccess={() => console.log("Login success")}
              />
              {showMagicLink && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setActiveTab("magic")}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sign in with magic link instead
                  </button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm
                onSubmit={onSignUp}
                onSuccess={() => console.log("Register success")}
              />
            </TabsContent>
          </Tabs>

          {/* Forgot password link (only on login tab) */}
          {activeTab === "login" && (
            <div className="text-center">
              <button
                onClick={() => setActiveTab("forgot")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </div>
      </AuthLayout>
    );
  };

  return renderContent();
}

export { Auth01 };

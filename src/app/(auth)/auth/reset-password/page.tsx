/**
 * Reset Password Page
 *
 * This page is shown when a user clicks on a password reset link from their email.
 * The URL contains a code that Supabase uses to verify the reset request.
 */

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ResetPasswordForm } from "@/registry/blocks/auth-01/components/reset-password-form";
import { LogoIcon } from "@/registry/blocks/social-icons/icons";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // Handle error from callback
  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md rounded-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <LogoIcon className="size-10 dark:invert" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-destructive">
              Reset Link Invalid
            </h1>
            <p className="text-sm text-muted-foreground">
              This password reset link is invalid or has expired.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <a
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Request a new reset link
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleResetPassword = async (password: string) => {
    // =========================================================================
    // SUPABASE IMPLEMENTATION
    // Uncomment this block when using Supabase Auth
    // =========================================================================
    /*
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    */

    // Demo mode - simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password reset:", { code, passwordLength: password.length });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <LogoIcon className="size-10 dark:invert" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below
          </p>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm
            onSubmit={handleResetPassword}
            loginHref="/"
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}

"use server";

/**
 * Supabase Auth Server Actions
 *
 * These server actions handle authentication with Supabase Auth.
 * They should be used with Next.js App Router.
 *
 * @example
 * // In a server component or server action
 * import { signInWithEmail, signUpWithEmail, signOut } from "@/components/auth-01/supabase/auth-actions"
 *
 * // Sign in
 * await signInWithEmail("user@example.com", "password")
 *
 * // Sign up
 * await signUpWithEmail("user@example.com", "password", "John Doe")
 *
 * // Sign out
 * await signOut()
 */

import type { OAuthProvider } from "../types/auth";

// =============================================================================
// MOCK IMPLEMENTATIONS (for preview/demo)
// Replace with actual Supabase client calls in production
// =============================================================================

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Demo: reject invalid credentials
  if (password.length < 8) {
    throw new Error("Invalid email or password");
  }

  return {
    user: {
      id: "demo-user-id",
      email,
      name: email.split("@")[0],
    },
  };
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email: string, password: string, name?: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Demo: check password requirements
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  return {
    user: {
      id: "demo-user-id",
      email,
      name: name ?? email.split("@")[0],
    },
  };
}

/**
 * Sign in with OAuth provider
 * Returns the OAuth URL to redirect to
 */
export async function signInWithOAuth(provider: OAuthProvider) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In production, this would return the OAuth URL from Supabase
  return {
    url: `#oauth-${provider}`,
  };
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Demo: always succeed
  return { success: true };
}

/**
 * Update user password (for reset password flow)
 */
export async function updatePassword(password: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  return { success: true };
}

/**
 * Send magic link email
 */
export async function sendMagicLink(email: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}

/**
 * Sign out the current user
 */
export async function signOut() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}

/**
 * Get current user session
 */
export async function getSession() {
  // In production, this would check the Supabase session
  return null;
}

// =============================================================================
// SUPABASE IMPLEMENTATION EXAMPLE (uncomment for production)
// =============================================================================

/*
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { user: data.user };
}

export async function signUpWithEmail(email: string, password: string, name?: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { user: data.user };
}

export async function signInWithOAuth(provider: OAuthProvider) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { url: data.url };
}

export async function resetPassword(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function updatePassword(password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function sendMagicLink(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
*/

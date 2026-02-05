"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { AuthUser, AuthSession, AuthState, OAuthProvider } from "../types/auth";

// =============================================================================
// Auth Context
// =============================================================================

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signInWithOAuth: (provider: OAuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =============================================================================
// Auth Provider
// =============================================================================

interface AuthProviderProps {
  children: React.ReactNode;
  // Optional: inject custom auth handlers for different backends
  authHandlers?: {
    signIn?: (email: string, password: string) => Promise<{ user: AuthUser }>;
    signUp?: (email: string, password: string, name?: string) => Promise<{ user: AuthUser }>;
    signInWithOAuth?: (provider: OAuthProvider) => Promise<{ url: string }>;
    signOut?: () => Promise<void>;
    resetPassword?: (email: string) => Promise<void>;
    updatePassword?: (password: string) => Promise<void>;
    sendMagicLink?: (email: string) => Promise<void>;
    getSession?: () => Promise<AuthSession | null>;
  };
}

export function AuthProvider({ children, authHandlers }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  });

  // Initialize - check for existing session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await authHandlers?.getSession?.();
        setState({
          user: session?.user ?? null,
          session: session ?? null,
          isLoading: false,
          error: null,
        });
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, [authHandlers]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await authHandlers?.signIn?.(email, password);
        if (result?.user) {
          setState({
            user: result.user,
            session: { user: result.user, accessToken: "demo-token" },
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Sign in failed";
        setState((prev) => ({ ...prev, isLoading: false, error: message }));
        throw error;
      }
    },
    [authHandlers]
  );

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await authHandlers?.signUp?.(email, password, name);
        if (result?.user) {
          setState({
            user: result.user,
            session: { user: result.user, accessToken: "demo-token" },
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Sign up failed";
        setState((prev) => ({ ...prev, isLoading: false, error: message }));
        throw error;
      }
    },
    [authHandlers]
  );

  const signInWithOAuth = useCallback(
    async (provider: OAuthProvider) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await authHandlers?.signInWithOAuth?.(provider);
        if (result?.url) {
          // Redirect to OAuth provider
          window.location.href = result.url;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "OAuth sign in failed";
        setState((prev) => ({ ...prev, isLoading: false, error: message }));
        throw error;
      }
    },
    [authHandlers]
  );

  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await authHandlers?.signOut?.();
      setState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign out failed";
      setState((prev) => ({ ...prev, isLoading: false, error: message }));
      throw error;
    }
  }, [authHandlers]);

  const resetPassword = useCallback(
    async (email: string) => {
      await authHandlers?.resetPassword?.(email);
    },
    [authHandlers]
  );

  const updatePassword = useCallback(
    async (password: string) => {
      await authHandlers?.updatePassword?.(password);
    },
    [authHandlers]
  );

  const sendMagicLink = useCallback(
    async (email: string) => {
      await authHandlers?.sendMagicLink?.(email);
    },
    [authHandlers]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signInWithOAuth,
        signOut,
        resetPassword,
        updatePassword,
        sendMagicLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =============================================================================
// Hook
// =============================================================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Supabase Setup Notes:
 *
 * 1. Create a Supabase client for server-side:
 *    // lib/supabase/server.ts
 *    import { createServerClient } from "@supabase/ssr";
 *    import { cookies } from "next/headers";
 *
 *    export async function createClient() {
 *      const cookieStore = await cookies();
 *      return createServerClient(
 *        process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 *        {
 *          cookies: {
 *            getAll() { return cookieStore.getAll(); },
 *            setAll(cookiesToSet) {
 *              cookiesToSet.forEach(({ name, value, options }) =>
 *                cookieStore.set(name, value, options)
 *              );
 *            },
 *          },
 *        }
 *      );
 *    }
 *
 * 2. Create a Supabase client for client-side:
 *    // lib/supabase/client.ts
 *    import { createBrowserClient } from "@supabase/ssr";
 *
 *    export function createClient() {
 *      return createBrowserClient(
 *        process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 *      );
 *    }
 *
 * 3. Set up the callback route:
 *    // app/auth/callback/route.ts
 *    import { createClient } from "@/lib/supabase/server";
 *    import { NextResponse } from "next/server";
 *
 *    export async function GET(request: Request) {
 *      const { searchParams, origin } = new URL(request.url);
 *      const code = searchParams.get("code");
 *      const next = searchParams.get("next") ?? "/dashboard";
 *
 *      if (code) {
 *        const supabase = await createClient();
 *        const { error } = await supabase.auth.exchangeCodeForSession(code);
 *        if (!error) {
 *          return NextResponse.redirect(`${origin}${next}`);
 *        }
 *      }
 *
 *      return NextResponse.redirect(`${origin}/auth/error`);
 *    }
 */

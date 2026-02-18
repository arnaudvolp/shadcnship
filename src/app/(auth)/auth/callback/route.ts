/**
 * Auth Callback Route
 *
 * This route handles OAuth and email confirmation callbacks from Supabase Auth.
 * It exchanges the auth code for a session and redirects to the appropriate page.
 *
 * Usage:
 * - OAuth providers redirect here after successful authentication
 * - Email confirmation links redirect here
 * - Magic link emails redirect here
 */

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Handle OAuth errors
  if (error) {
    const errorUrl = new URL("/auth/error", origin);
    errorUrl.searchParams.set("error", error);
    if (errorDescription) {
      errorUrl.searchParams.set("message", errorDescription);
    }
    return NextResponse.redirect(errorUrl);
  }

  // Exchange code for session
  if (code) {
    // =========================================================================
    // SUPABASE IMPLEMENTATION
    // Uncomment this block when using Supabase Auth
    // =========================================================================
    /*
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      const errorUrl = new URL("/auth/error", origin);
      errorUrl.searchParams.set("error", "exchange_failed");
      errorUrl.searchParams.set("message", exchangeError.message);
      return NextResponse.redirect(errorUrl);
    }

    // Successful authentication - redirect to destination
    return NextResponse.redirect(`${origin}${next}`);
    */

    // =========================================================================
    // DEMO MODE
    // For preview/demo purposes, just redirect to the next page
    // =========================================================================
    console.log("Auth callback received with code:", code.substring(0, 10) + "...");
    return NextResponse.redirect(`${origin}${next}`);
  }

  // No code provided - redirect to error
  const errorUrl = new URL("/auth/error", origin);
  errorUrl.searchParams.set("error", "no_code");
  errorUrl.searchParams.set("message", "No authorization code provided");
  return NextResponse.redirect(errorUrl);
}

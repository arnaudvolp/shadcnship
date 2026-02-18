"use server";

import { createClient } from "@supabase/supabase-js";
import type { UserProfile, NotificationPreferences, AppearanceSettings, Session } from "../types/settings";

/**
 * Server actions for settings management with Supabase
 *
 * Prerequisites:
 * 1. Set up environment variables:
 *    - SUPABASE_URL
 *    - SUPABASE_SERVICE_ROLE_KEY
 *
 * 2. Create required tables in Supabase SQL Editor (see postgres/settings-actions.ts for schema)
 */

const getSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
};

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = getSupabase();

  const { data: user } = await supabase.auth.admin.getUserById(userId);

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!user.user) return null;

  return {
    id: user.user.id,
    email: user.user.email || "",
    name: profile?.name || user.user.user_metadata?.name || "",
    username: profile?.username,
    bio: profile?.bio,
    avatar: profile?.avatar || user.user.user_metadata?.avatar_url,
    phone: profile?.phone,
    website: profile?.website,
    company: profile?.company,
    location: profile?.location,
  };
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("user_profiles")
    .upsert({
      user_id: userId,
      name: data.name,
      username: data.username,
      bio: data.bio,
      phone: data.phone,
      website: data.website,
      company: data.company,
      location: data.location,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (error) throw new Error(error.message);
}

export async function getNotificationPreferences(userId: string): Promise<NotificationPreferences> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("notification_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  // Return defaults if no preferences exist
  return {
    emailMarketing: data?.email_marketing ?? true,
    emailProduct: data?.email_product ?? true,
    emailSecurity: data?.email_security ?? true,
    pushEnabled: data?.push_enabled ?? true,
    pushMentions: data?.push_mentions ?? true,
    pushComments: data?.push_comments ?? true,
    pushUpdates: data?.push_updates ?? true,
  };
}

export async function updateNotificationPreferences(
  userId: string,
  data: Partial<NotificationPreferences>
): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("notification_preferences")
    .upsert({
      user_id: userId,
      email_marketing: data.emailMarketing,
      email_product: data.emailProduct,
      email_security: data.emailSecurity,
      push_enabled: data.pushEnabled,
      push_mentions: data.pushMentions,
      push_comments: data.pushComments,
      push_updates: data.pushUpdates,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (error) throw new Error(error.message);
}

export async function updatePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const supabase = getSupabase();

  // Note: For security, password verification should happen on the client
  // using supabase.auth.updateUser({ password: newPassword })
  // This server action is a placeholder for custom implementations

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) throw new Error(error.message);
}

export async function toggle2FA(userId: string, enabled: boolean): Promise<void> {
  // Supabase MFA is managed through the client-side auth API
  // See: https://supabase.com/docs/guides/auth/mfa
  throw new Error("2FA should be managed through the client-side Supabase Auth API");
}

export async function getUserSessions(userId: string): Promise<Session[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("user_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("last_active", { ascending: false });

  if (error) throw new Error(error.message);

  return (data || []).map((row) => ({
    id: row.id,
    device: row.device,
    browser: row.browser,
    location: row.location,
    lastActive: row.last_active,
    current: row.is_current,
  }));
}

export async function revokeSession(sessionId: string, userId: string): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("user_sessions")
    .delete()
    .eq("id", sessionId)
    .eq("user_id", userId)
    .eq("is_current", false);

  if (error) throw new Error(error.message);
}

export async function getAppearanceSettings(userId: string): Promise<AppearanceSettings> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("appearance_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return {
    theme: data?.theme ?? "system",
    accentColor: data?.accent_color ?? "blue",
    fontSize: data?.font_size ?? "medium",
    reducedMotion: data?.reduced_motion ?? false,
  };
}

export async function updateAppearanceSettings(
  userId: string,
  data: Partial<AppearanceSettings>
): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("appearance_settings")
    .upsert({
      user_id: userId,
      theme: data.theme,
      accent_color: data.accentColor,
      font_size: data.fontSize,
      reduced_motion: data.reducedMotion,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (error) throw new Error(error.message);
}

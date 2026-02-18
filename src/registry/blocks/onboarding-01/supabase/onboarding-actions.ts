"use server";

import { createClient } from "@supabase/supabase-js";
import type { OnboardingData, OnboardingStep } from "../types/onboarding";

/**
 * Server actions for onboarding with Supabase
 *
 * Prerequisites:
 * 1. Set up environment variables:
 *    - SUPABASE_URL
 *    - SUPABASE_SERVICE_ROLE_KEY
 *
 * 2. Create required tables in Supabase SQL Editor (see postgres/onboarding-actions.ts for schema)
 */

const getSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
};

export async function getOnboardingProgress(userId: string): Promise<{
  currentStep: OnboardingStep;
  data: Partial<OnboardingData>;
  completed: boolean;
}> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("user_onboarding")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  if (!data) {
    return {
      currentStep: "welcome",
      data: {},
      completed: false,
    };
  }

  return {
    currentStep: data.current_step as OnboardingStep,
    data: {
      profile: data.profile_data,
      preferences: data.preferences_data,
      workspace: data.workspace_data,
    },
    completed: data.completed,
  };
}

export async function saveOnboardingProgress(
  userId: string,
  step: OnboardingStep,
  data: Partial<OnboardingData>
): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("user_onboarding")
    .upsert({
      user_id: userId,
      current_step: step,
      profile_data: data.profile,
      preferences_data: data.preferences,
      workspace_data: data.workspace,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (error) throw new Error(error.message);
}

export async function completeOnboarding(userId: string, data: OnboardingData): Promise<void> {
  const supabase = getSupabase();

  // 1. Update user profile
  const { error: profileError } = await supabase
    .from("user_profiles")
    .upsert({
      user_id: userId,
      name: data.profile.name,
      avatar: data.profile.avatar,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (profileError) throw new Error(profileError.message);

  // 2. Create workspace
  const { error: workspaceError } = await supabase
    .from("workspaces")
    .insert({
      name: data.workspace.workspaceName,
      owner_id: userId,
      team_size: data.workspace.teamSize,
      industry: data.workspace.industry,
    });

  if (workspaceError) throw new Error(workspaceError.message);

  // 3. Mark onboarding as complete
  const { error: onboardingError } = await supabase
    .from("user_onboarding")
    .upsert({
      user_id: userId,
      completed: true,
      current_step: "complete",
      profile_data: data.profile,
      preferences_data: data.preferences,
      workspace_data: data.workspace,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (onboardingError) throw new Error(onboardingError.message);
}

export async function skipOnboarding(userId: string): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("user_onboarding")
    .upsert({
      user_id: userId,
      completed: true,
      current_step: "complete",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (error) throw new Error(error.message);
}

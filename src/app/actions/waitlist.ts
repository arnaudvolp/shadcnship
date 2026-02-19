"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

export type WaitlistResult = {
  success: boolean;
  message: string;
  isDemo?: boolean;
};

export async function joinWaitlist(email: string): Promise<WaitlistResult> {
  // Validate email
  const result = emailSchema.safeParse(email);
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message || "Invalid email",
    };
  }

  // If Supabase is not configured, return demo mode success
  if (!isSupabaseConfigured) {
    console.log("[Demo Mode] Waitlist signup:", email);
    return {
      success: true,
      message: "You're on the list! (Demo mode - Supabase not configured)",
      isDemo: true,
    };
  }

  try {
    const supabase = await createClient();

    if (!supabase) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }

    // Insert email into waitlist table
    const { error } = await supabase.from("waitlist").insert({
      email: result.data,
    });

    if (error) {
      // Handle duplicate email
      if (error.code === "23505") {
        return {
          success: false,
          message: "This email is already on the waitlist",
        };
      }

      console.error("Waitlist error:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    return {
      success: true,
      message: "You're on the list! We'll notify you when we launch.",
    };
  } catch (error) {
    console.error("Waitlist error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

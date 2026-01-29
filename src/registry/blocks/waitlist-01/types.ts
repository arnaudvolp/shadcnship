export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export type SubmitStatus = "idle" | "loading" | "success" | "error";

// Provider configurations
export interface WebhookProvider {
  type: "webhook";
  url: string;
  method?: "POST" | "PUT";
  headers?: Record<string, string>;
}

export interface SupabaseProvider {
  type: "supabase";
  url: string;
  anonKey: string;
  table?: string;
}

export interface CustomProvider {
  type: "custom";
  handler: (email: string) => Promise<void>;
}

export type WaitlistProvider =
  | WebhookProvider
  | SupabaseProvider
  | CustomProvider;

export interface Waitlist01Props {
  // Content
  badge?: string;
  heading?: string;
  description?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  // Provider
  provider?: WaitlistProvider;
  onSubmit?: (email: string) => Promise<void>;
  // Messages
  successMessage?: string;
  errorMessage?: string;
  // Social proof
  socialProof?: {
    avatars: string[];
    text: string;
  };
  // Countdown
  countdown?: {
    targetDate: Date | number;
    label?: string;
  };
  className?: string;
}

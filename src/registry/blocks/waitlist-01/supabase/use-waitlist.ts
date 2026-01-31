import { useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

interface UseWaitlistOptions {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  tableName?: string;
}

/**
 * Hook for Supabase waitlist integration
 *
 * @example
 * // page.tsx
 * import { Waitlist01 } from "@/components/waitlist-01/waitlist"
 * import { useWaitlist } from "@/components/waitlist-01/supabase/use-waitlist"
 *
 * export default function Page() {
 *   const { onSubmit } = useWaitlist()
 *   return <Waitlist01 onSubmit={onSubmit} />
 * }
 *
 * // Required env vars:
 * // NEXT_PUBLIC_SUPABASE_URL=your-project-url
 * // NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
 */
export function useWaitlist({
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  tableName = "waitlist",
}: UseWaitlistOptions = {}) {
  const supabase = useMemo(
    () => createClient(supabaseUrl, supabaseAnonKey),
    [supabaseUrl, supabaseAnonKey],
  );

  const onSubmit = async (email: string): Promise<void> => {
    const { error } = await supabase.from(tableName).insert({ email });
    if (error) {
      if (error.code === "23505") {
        throw new Error("This email is already on the waitlist");
      }
      throw new Error(error.message);
    }
  };

  return { onSubmit };
}

/**
 * Supabase Setup - Run in SQL Editor:
 *
 * CREATE TABLE waitlist (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   email TEXT UNIQUE NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
 *
 * CREATE POLICY "Allow anonymous inserts" ON waitlist
 *   FOR INSERT TO anon WITH CHECK (true);
 */

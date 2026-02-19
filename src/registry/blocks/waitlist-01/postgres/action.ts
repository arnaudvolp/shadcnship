"use server";

// ============================================================================
// Example server action for PostgreSQL waitlist
//
// Replace with your preferred database client:
// - @vercel/postgres
// - pg (node-postgres)
// - drizzle-orm
// - prisma
// ============================================================================

/**
 * Add email to waitlist
 *
 * @example
 * // page.tsx
 * import { Waitlist01 } from "@/components/waitlist-01/waitlist"
 * import { addToWaitlist } from "@/components/waitlist-01/postgres/action"
 *
 * export default function Page() {
 *   return <Waitlist01 onSubmit={addToWaitlist} />
 * }
 */
export async function addToWaitlist(email: string): Promise<void> {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Option 1: @vercel/postgres
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // import { sql } from "@vercel/postgres";
  //
  // try {
  //   await sql`INSERT INTO waitlist (email) VALUES (${email})`;
  // } catch (error: unknown) {
  //   if (_isPostgresError(error, "23505")) {
  //     throw new Error("This email is already on the waitlist");
  //   }
  //   throw error;
  // }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Option 2: Drizzle ORM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // import { db } from "@/db";
  // import { waitlist } from "@/db/schema";
  //
  // try {
  //   await db.insert(waitlist).values({ email });
  // } catch (error: unknown) {
  //   if (_isPostgresError(error, "23505")) {
  //     throw new Error("This email is already on the waitlist");
  //   }
  //   throw error;
  // }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Demo mode (remove this and uncomment one of the options above)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`[Demo] Added ${email} to waitlist`);
}

// Helper to check PostgreSQL error codes
function __isPostgresError(error: unknown, code: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === code
  );
}

/**
 * PostgreSQL Schema - Run in your database:
 *
 * CREATE TABLE waitlist (
 *   id SERIAL PRIMARY KEY,
 *   email VARCHAR(255) UNIQUE NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 */

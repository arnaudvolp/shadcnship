// ============================================================================
// Drizzle ORM Schema for Users Table
//
// This is an example schema - copy and adapt to your project
// ============================================================================

// import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";

/**
 * Users table schema
 *
 * @example
 * // db/schema.ts
 * import { users } from "@/components/table-02/postgres/schema"
 *
 * // Export for use in your application
 * export { users }
 */
// export const users = pgTable("users", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   email: varchar("email", { length: 255 }).unique().notNull(),
//   name: varchar("name", { length: 255 }).notNull(),
//   status: varchar("status", { length: 50 })
//     .default("pending")
//     .notNull()
//     .$type<"active" | "inactive" | "pending" | "suspended">(),
//   role: varchar("role", { length: 50 })
//     .default("user")
//     .notNull()
//     .$type<"admin" | "user" | "editor" | "viewer">(),
//   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
//   lastLogin: timestamp("last_login", { withTimezone: true }),
// });

// Type inference
// export type UserSelect = typeof users.$inferSelect;
// export type UserInsert = typeof users.$inferInsert;

/**
 * SQL Migration:
 *
 * CREATE TABLE users (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   email VARCHAR(255) UNIQUE NOT NULL,
 *   name VARCHAR(255) NOT NULL,
 *   status VARCHAR(50) DEFAULT 'pending' NOT NULL,
 *   role VARCHAR(50) DEFAULT 'user' NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
 *   last_login TIMESTAMPTZ
 * );
 *
 * -- Check constraints
 * ALTER TABLE users ADD CONSTRAINT users_status_check
 *   CHECK (status IN ('active', 'inactive', 'pending', 'suspended'));
 *
 * ALTER TABLE users ADD CONSTRAINT users_role_check
 *   CHECK (role IN ('admin', 'user', 'editor', 'viewer'));
 *
 * -- Indexes for performance
 * CREATE INDEX idx_users_email ON users(email);
 * CREATE INDEX idx_users_status ON users(status);
 * CREATE INDEX idx_users_role ON users(role);
 * CREATE INDEX idx_users_created_at ON users(created_at DESC);
 */

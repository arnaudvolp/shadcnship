# PostgreSQL Integration (Drizzle ORM)

This guide explains how to set up the table-02 component with PostgreSQL using Drizzle ORM.

## Prerequisites

1. A PostgreSQL database (Neon, Vercel Postgres, or self-hosted)
2. Drizzle ORM installed and configured

## Installation

```bash
# Drizzle ORM
pnpm add drizzle-orm

# Dev dependencies
pnpm add -D drizzle-kit

# Database driver (choose one)
pnpm add @neondatabase/serverless  # For Neon
pnpm add @vercel/postgres          # For Vercel Postgres
pnpm add pg                        # For standard PostgreSQL
```

## Environment Variables

```env
# Neon
DATABASE_URL=postgres://user:password@host/database?sslmode=require

# Vercel Postgres
POSTGRES_URL=postgres://...

# Standard PostgreSQL
DATABASE_URL=postgres://user:password@localhost:5432/mydb
```

## Database Setup

### Option 1: SQL Migration

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' NOT NULL,
  role VARCHAR(50) DEFAULT 'user' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_login TIMESTAMPTZ
);

-- Check constraints
ALTER TABLE users ADD CONSTRAINT users_status_check
  CHECK (status IN ('active', 'inactive', 'pending', 'suspended'));

ALTER TABLE users ADD CONSTRAINT users_role_check
  CHECK (role IN ('admin', 'user', 'editor', 'viewer'));

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
```

### Option 2: Drizzle Schema

```typescript
// db/schema.ts
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 })
    .default("pending")
    .notNull()
    .$type<"active" | "inactive" | "pending" | "suspended">(),
  role: varchar("role", { length: 50 })
    .default("user")
    .notNull()
    .$type<"admin" | "user" | "editor" | "viewer">(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  lastLogin: timestamp("last_login", { withTimezone: true }),
});
```

Then run:

```bash
pnpm drizzle-kit push
```

## Database Connection

```typescript
// db/index.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
```

## Usage

```tsx
// app/users/page.tsx
import { Table02 } from "@/components/table-02/table";
import { fetchTableData, deleteUsers } from "@/components/table-02/postgres/fetch-action";

export default function UsersPage() {
  return (
    <Table02
      onFetchData={fetchTableData}
      onDelete={deleteUsers}
      onEdit={(id) => console.log("Edit user:", id)}
      onView={(id) => console.log("View user:", id)}
    />
  );
}
```

## Implementing the Server Actions

Uncomment and adapt the code in `fetch-action.ts`:

```typescript
// postgres/fetch-action.ts
"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { sql, eq, ilike, or, and, asc, desc, count, inArray } from "drizzle-orm";
import type { FetchTableDataParams, TableDataResult, User } from "../types/table";

export async function fetchTableData(
  params: FetchTableDataParams
): Promise<TableDataResult<User>> {
  const { page, pageSize, sort, filters, search } = params;
  const offset = (page - 1) * pageSize;

  // Build WHERE conditions
  const conditions = [];

  if (search) {
    conditions.push(
      or(
        ilike(users.name, `%${search}%`),
        ilike(users.email, `%${search}%`)
      )
    );
  }

  if (filters && filters.length > 0) {
    filters.forEach((filter) => {
      if (filter.column === "status") {
        conditions.push(eq(users.status, filter.value as string));
      }
      if (filter.column === "role") {
        conditions.push(eq(users.role, filter.value as string));
      }
    });
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Build ORDER BY
  const orderBy = sort?.column
    ? sort.direction === "asc"
      ? asc(users[sort.column as keyof typeof users])
      : desc(users[sort.column as keyof typeof users])
    : desc(users.createdAt);

  // Execute queries
  const [data, [{ count: total }]] = await Promise.all([
    db
      .select()
      .from(users)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: count() })
      .from(users)
      .where(whereClause),
  ]);

  return {
    data: data.map((row) => ({
      id: row.id,
      email: row.email,
      name: row.name,
      status: row.status,
      role: row.role,
      createdAt: row.createdAt.toISOString(),
      lastLogin: row.lastLogin?.toISOString(),
    })),
    total: Number(total),
    page,
    pageSize,
  };
}

export async function deleteUsers(ids: string[]): Promise<void> {
  await db.delete(users).where(inArray(users.id, ids));
}
```

## Features

- **Server-side pagination**: LIMIT/OFFSET with COUNT query
- **Sorting**: Dynamic ORDER BY with type safety
- **Filtering**: WHERE clause building with Drizzle operators
- **Search**: ILIKE for case-insensitive search
- **Bulk delete**: DELETE with IN clause

## Performance Tips

1. **Add indexes** for frequently filtered/sorted columns
2. **Use connection pooling** for serverless environments
3. **Consider prepared statements** for repeated queries
4. **Add pagination limits** to prevent large result sets

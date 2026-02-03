# Supabase Integration

This guide explains how to set up the table-02 component with Supabase.

## Prerequisites

1. A [Supabase](https://supabase.com) project
2. Supabase JavaScript client installed

## Installation

```bash
pnpm add @supabase/supabase-js
```

## Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

## Database Setup

Run this SQL in the Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending', 'suspended')),
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Sample RLS policies (adjust for your use case)
CREATE POLICY "Allow read for authenticated users" ON users
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert for authenticated users" ON users
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow update for admins" ON users
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Allow delete for admins" ON users
  FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
```

## Usage

```tsx
// app/users/page.tsx
"use client";

import { Table02 } from "@/components/table-02/table";
import { useTableData } from "@/components/table-02/supabase/use-table-data";

export default function UsersPage() {
  const { onFetchData, onDelete } = useTableData();

  return (
    <Table02
      onFetchData={onFetchData}
      onDelete={onDelete}
      onEdit={(id) => console.log("Edit user:", id)}
      onView={(id) => console.log("View user:", id)}
    />
  );
}
```

## Custom Table Name

If your table is named differently:

```tsx
const { onFetchData, onDelete } = useTableData({
  tableName: "team_members",
});
```

## Features

- **Server-side pagination**: Efficient data loading with LIMIT/OFFSET
- **Sorting**: Order by any column, ascending or descending
- **Filtering**: Filter by status, role, or any column
- **Search**: Full-text search across name and email
- **Bulk delete**: Delete multiple records at once

## Customizing the Hook

You can extend the hook to add more features:

```tsx
import { useTableData } from "@/components/table-02/supabase/use-table-data";

function useCustomTableData() {
  const { onFetchData, onDelete, supabase } = useTableData();

  const onUpdate = async (id: string, data: Partial<User>) => {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("id", id);

    if (error) throw new Error(error.message);
  };

  return { onFetchData, onDelete, onUpdate };
}
```

import { useMemo, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import type {
  FetchTableDataParams,
  TableDataResult,
  User,
  Filter,
  CreateUserInput,
  UpdateUserInput,
} from "../types/table";

interface UseTableDataOptions {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  tableName?: string;
}

/**
 * Hook for Supabase table data integration
 *
 * @example
 * // page.tsx
 * import { Table02 } from "@/components/table-02/table"
 * import { useTableData } from "@/components/table-02/supabase/use-table-data"
 *
 * export default function Page() {
 *   const { onFetchData, onDelete, onCreate, onUpdate } = useTableData()
 *   return (
 *     <Table02
 *       onFetchData={onFetchData}
 *       onDelete={onDelete}
 *       onCreate={onCreate}
 *       onUpdate={onUpdate}
 *     />
 *   )
 * }
 *
 * // Required env vars:
 * // NEXT_PUBLIC_SUPABASE_URL=your-project-url
 * // NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
 */
export function useTableData({
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  tableName = "users",
}: UseTableDataOptions = {}) {
  const supabase = useMemo(
    () => createClient(supabaseUrl, supabaseAnonKey),
    [supabaseUrl, supabaseAnonKey]
  );

  const onFetchData = useCallback(
    async (params: FetchTableDataParams): Promise<TableDataResult<User>> => {
      const { page, pageSize, sort, filters, search } = params;
      const offset = (page - 1) * pageSize;

      // Start query with count
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" });

      // Apply search (across name and email)
      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      // Apply filters
      if (filters && filters.length > 0) {
        filters.forEach((filter: Filter) => {
          switch (filter.operator) {
            case "eq":
              query = query.eq(filter.column, filter.value);
              break;
            case "neq":
              query = query.neq(filter.column, filter.value);
              break;
            case "gt":
              query = query.gt(filter.column, filter.value);
              break;
            case "gte":
              query = query.gte(filter.column, filter.value);
              break;
            case "lt":
              query = query.lt(filter.column, filter.value);
              break;
            case "lte":
              query = query.lte(filter.column, filter.value);
              break;
            case "like":
              query = query.like(filter.column, `%${filter.value}%`);
              break;
            case "ilike":
              query = query.ilike(filter.column, `%${filter.value}%`);
              break;
            case "in":
              query = query.in(filter.column, filter.value as string[]);
              break;
          }
        });
      }

      // Apply sort
      if (sort && sort.column) {
        query = query.order(sort.column, { ascending: sort.direction === "asc" });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      // Apply pagination
      query = query.range(offset, offset + pageSize - 1);

      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message);
      }

      // Map snake_case to camelCase
      const mappedData: User[] = (data || []).map((row) => ({
        id: row.id,
        email: row.email,
        name: row.name,
        status: row.status,
        role: row.role,
        createdAt: row.created_at,
        lastLogin: row.last_login,
      }));

      return {
        data: mappedData,
        total: count || 0,
        page,
        pageSize,
      };
    },
    [supabase, tableName]
  );

  const onDelete = useCallback(
    async (ids: string[]): Promise<void> => {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .in("id", ids);

      if (error) {
        throw new Error(error.message);
      }
    },
    [supabase, tableName]
  );

  const onCreate = useCallback(
    async (data: CreateUserInput): Promise<User> => {
      const { data: newUser, error } = await supabase
        .from(tableName)
        .insert({
          email: data.email,
          name: data.name,
          status: data.status ?? "pending",
          role: data.role ?? "user",
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        status: newUser.status,
        role: newUser.role,
        createdAt: newUser.created_at,
        lastLogin: newUser.last_login,
      };
    },
    [supabase, tableName]
  );

  const onUpdate = useCallback(
    async (data: UpdateUserInput): Promise<User> => {
      const updateData: Record<string, unknown> = {};
      if (data.email !== undefined) updateData.email = data.email;
      if (data.name !== undefined) updateData.name = data.name;
      if (data.status !== undefined) updateData.status = data.status;
      if (data.role !== undefined) updateData.role = data.role;

      const { data: updatedUser, error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq("id", data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        status: updatedUser.status,
        role: updatedUser.role,
        createdAt: updatedUser.created_at,
        lastLogin: updatedUser.last_login,
      };
    },
    [supabase, tableName]
  );

  return { onFetchData, onDelete, onCreate, onUpdate };
}

/**
 * Supabase Setup - Run in SQL Editor:
 *
 * CREATE TABLE users (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   email TEXT UNIQUE NOT NULL,
 *   name TEXT NOT NULL,
 *   status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending', 'suspended')),
 *   role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'editor', 'viewer')),
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   last_login TIMESTAMPTZ
 * );
 *
 * -- Indexes for performance
 * CREATE INDEX idx_users_email ON users(email);
 * CREATE INDEX idx_users_status ON users(status);
 * CREATE INDEX idx_users_role ON users(role);
 * CREATE INDEX idx_users_created_at ON users(created_at DESC);
 *
 * -- Enable RLS
 * ALTER TABLE users ENABLE ROW LEVEL SECURITY;
 *
 * -- Policy for authenticated users (adjust as needed)
 * CREATE POLICY "Users can view all users" ON users
 *   FOR SELECT TO authenticated USING (true);
 *
 * CREATE POLICY "Admins can delete users" ON users
 *   FOR DELETE TO authenticated USING (
 *     EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
 *   );
 *
 * CREATE POLICY "Admins can insert users" ON users
 *   FOR INSERT TO authenticated WITH CHECK (
 *     EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
 *   );
 *
 * CREATE POLICY "Admins can update users" ON users
 *   FOR UPDATE TO authenticated USING (
 *     EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
 *   );
 */

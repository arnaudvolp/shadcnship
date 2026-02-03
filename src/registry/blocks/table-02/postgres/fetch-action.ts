"use server";

// ============================================================================
// Server Actions for PostgreSQL table data
//
// Prerequisites:
// 1. Install drizzle-orm and your database driver
// 2. Configure your database connection
// ============================================================================

import type {
  FetchTableDataParams,
  TableDataResult,
  User,
} from "../types/table";

/**
 * Fetch paginated, filtered, and sorted table data
 *
 * @example
 * // page.tsx
 * import { Table02 } from "@/components/table-02/table"
 * import { fetchTableData } from "@/components/table-02/postgres/fetch-action"
 *
 * export default function Page() {
 *   return <Table02 onFetchData={fetchTableData} />
 * }
 */
export async function fetchTableData(
  params: FetchTableDataParams
): Promise<TableDataResult<User>> {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Drizzle ORM Implementation (uncomment when ready):
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // import { db } from "@/db";
  // import { users } from "@/db/schema";
  // import { sql, eq, ilike, or, asc, desc, count } from "drizzle-orm";
  //
  // const { page, pageSize, sort, filters, search } = params;
  // const offset = (page - 1) * pageSize;
  //
  // // Build WHERE conditions
  // const conditions = [];
  //
  // if (search) {
  //   conditions.push(
  //     or(
  //       ilike(users.name, `%${search}%`),
  //       ilike(users.email, `%${search}%`)
  //     )
  //   );
  // }
  //
  // if (filters && filters.length > 0) {
  //   filters.forEach((filter) => {
  //     if (filter.column === "status") {
  //       conditions.push(eq(users.status, filter.value as string));
  //     }
  //     if (filter.column === "role") {
  //       conditions.push(eq(users.role, filter.value as string));
  //     }
  //   });
  // }
  //
  // // Build ORDER BY
  // const orderBy = sort?.column
  //   ? sort.direction === "asc"
  //     ? asc(users[sort.column as keyof typeof users])
  //     : desc(users[sort.column as keyof typeof users])
  //   : desc(users.createdAt);
  //
  // // Execute query with pagination
  // const [data, [{ count: total }]] = await Promise.all([
  //   db
  //     .select()
  //     .from(users)
  //     .where(conditions.length > 0 ? and(...conditions) : undefined)
  //     .orderBy(orderBy)
  //     .limit(pageSize)
  //     .offset(offset),
  //   db
  //     .select({ count: count() })
  //     .from(users)
  //     .where(conditions.length > 0 ? and(...conditions) : undefined),
  // ]);
  //
  // return {
  //   data: data.map((row) => ({
  //     id: row.id,
  //     email: row.email,
  //     name: row.name,
  //     status: row.status as User["status"],
  //     role: row.role as User["role"],
  //     createdAt: row.createdAt.toISOString(),
  //     lastLogin: row.lastLogin?.toISOString(),
  //   })),
  //   total: Number(total),
  //   page,
  //   pageSize,
  // };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Demo mode (remove this and uncomment above when ready):
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log(`[Demo] Fetching table data with params:`, params);
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return demo data
  const mockUsers: User[] = [
    { id: "1", email: "admin@example.com", name: "Admin User", status: "active", role: "admin", createdAt: new Date().toISOString() },
    { id: "2", email: "user@example.com", name: "Regular User", status: "active", role: "user", createdAt: new Date().toISOString() },
  ];

  return {
    data: mockUsers.slice(0, params.pageSize),
    total: mockUsers.length,
    page: params.page,
    pageSize: params.pageSize,
  };
}

/**
 * Delete users by IDs
 *
 * @example
 * // page.tsx
 * import { Table02 } from "@/components/table-02/table"
 * import { fetchTableData, deleteUsers } from "@/components/table-02/postgres/fetch-action"
 *
 * export default function Page() {
 *   return <Table02 onFetchData={fetchTableData} onDelete={deleteUsers} />
 * }
 */
export async function deleteUsers(ids: string[]): Promise<void> {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Drizzle ORM Implementation (uncomment when ready):
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // import { db } from "@/db";
  // import { users } from "@/db/schema";
  // import { inArray } from "drizzle-orm";
  //
  // await db.delete(users).where(inArray(users.id, ids));

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Demo mode:
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log(`[Demo] Deleting users with IDs:`, ids);
  await new Promise((resolve) => setTimeout(resolve, 500));
}

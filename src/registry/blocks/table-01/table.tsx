import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { DataTable } from "./components/data-table";
import { fetchTableData } from "./supabase/fetch-data";

interface Table01Props {
  /** Title displayed above the table */
  title?: string;
  /** Description displayed below the title */
  description?: string;
  /** Supabase table name to fetch data from */
  tableName?: string;
  /** Array of field names to display (if not provided, all fields are shown) */
  fields?: string[];
  /** Field to order by */
  orderBy?: string;
  /** Order ascending (default: false for descending) */
  orderAsc?: boolean;
  /** Search params from Next.js page (for pagination) */
  searchParams?: { page?: string; pageSize?: string };
  /** Additional CSS classes */
  className?: string;
}

// Loading skeleton
function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="h-12 border-b bg-muted/50" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 border-b animate-pulse bg-muted/20" />
        ))}
      </div>
    </div>
  );
}

// Inner component that fetches data
async function TableContent({
  tableName,
  fields,
  orderBy,
  orderAsc,
  searchParams,
}: {
  tableName: string;
  fields?: string[];
  orderBy?: string;
  orderAsc?: boolean;
  searchParams?: { page?: string; pageSize?: string };
}) {
  const page = Number(searchParams?.page) || 0;
  const pageSize = Number(searchParams?.pageSize) || 5;

  const { data, fields: detectedFields, pageCount, error } = await fetchTableData({
    tableName,
    fields,
    page,
    pageSize,
    orderBy,
    orderAsc,
  });

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">Error loading data: {error}</p>
      </div>
    );
  }

  return (
    <DataTable
      data={data}
      fields={fields || detectedFields}
      pageCount={pageCount}
      pageIndex={page}
      pageSize={pageSize}
    />
  );
}

// Server Component - fetches data from Supabase
export async function Table01({
  title = "Data",
  description,
  tableName = "table_01",
  fields,
  orderBy = "created_at",
  orderAsc = false,
  searchParams,
  className,
}: Table01Props) {
  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>

      {/* Data Table with Suspense */}
      <Suspense fallback={<TableSkeleton />}>
        <TableContent
          tableName={tableName}
          fields={fields}
          orderBy={orderBy}
          orderAsc={orderAsc}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}

export default Table01;

// =============================================================================
// USAGE EXAMPLES
// =============================================================================
//
// // Basic usage - fetches all fields from "table_01"
// <Table01 />
//
// // Custom table with specific fields
// <Table01
//   title="Users"
//   description="A list of registered users."
//   tableName="users"
//   fields={["name", "email", "status", "created_at"]}
// />
//
// // Orders table with custom ordering
// <Table01
//   title="Recent Orders"
//   tableName="orders"
//   fields={["order_id", "customer", "amount", "status"]}
//   orderBy="amount"
//   orderAsc={false}
// />
//
// // In a Next.js page with pagination support
// export default async function UsersPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ page?: string; pageSize?: string }>;
// }) {
//   const params = await searchParams;
//   return (
//     <Table01
//       title="Users"
//       tableName="users"
//       searchParams={params}
//     />
//   );
// }

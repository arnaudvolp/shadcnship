"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  DataTable,
  SearchInput,
  TableFilters,
  TablePagination,
  BulkActions,
  LoadingSkeleton,
} from "./components";
import type {
  Table02Props,
  User,
  ColumnDef,
  SortState,
  Filter,
  PaginationState,
  FetchTableDataParams,
  TableDataResult,
} from "./types/table";

// ============================================================================
// Mock Data for Preview
// ============================================================================

const mockUsers: User[] = [
  { id: "1", email: "jean.dupont@example.com", name: "Jean Dupont", status: "active", role: "admin", createdAt: "2026-01-15T10:30:00Z", lastLogin: "2026-02-03T08:15:00Z" },
  { id: "2", email: "marie.martin@example.com", name: "Marie Martin", status: "active", role: "user", createdAt: "2026-01-18T14:20:00Z", lastLogin: "2026-02-02T16:45:00Z" },
  { id: "3", email: "pierre.durand@example.com", name: "Pierre Durand", status: "pending", role: "user", createdAt: "2026-01-20T09:00:00Z" },
  { id: "4", email: "sophie.bernard@example.com", name: "Sophie Bernard", status: "active", role: "editor", createdAt: "2026-01-22T11:30:00Z", lastLogin: "2026-02-01T10:00:00Z" },
  { id: "5", email: "lucas.petit@example.com", name: "Lucas Petit", status: "inactive", role: "viewer", createdAt: "2026-01-25T16:00:00Z" },
  { id: "6", email: "emma.robert@example.com", name: "Emma Robert", status: "active", role: "user", createdAt: "2026-01-27T08:45:00Z", lastLogin: "2026-02-03T09:30:00Z" },
  { id: "7", email: "hugo.richard@example.com", name: "Hugo Richard", status: "suspended", role: "user", createdAt: "2026-01-28T13:15:00Z" },
  { id: "8", email: "chloe.moreau@example.com", name: "Chloe Moreau", status: "active", role: "editor", createdAt: "2026-01-29T10:00:00Z", lastLogin: "2026-02-02T14:20:00Z" },
  { id: "9", email: "thomas.simon@example.com", name: "Thomas Simon", status: "pending", role: "user", createdAt: "2026-01-30T15:30:00Z" },
  { id: "10", email: "lea.laurent@example.com", name: "Lea Laurent", status: "active", role: "admin", createdAt: "2026-01-31T09:00:00Z", lastLogin: "2026-02-03T07:00:00Z" },
  { id: "11", email: "nathan.lefebvre@example.com", name: "Nathan Lefebvre", status: "active", role: "user", createdAt: "2026-02-01T11:00:00Z", lastLogin: "2026-02-02T18:00:00Z" },
  { id: "12", email: "manon.garcia@example.com", name: "Manon Garcia", status: "inactive", role: "viewer", createdAt: "2026-02-01T14:30:00Z" },
];

// ============================================================================
// Column Definitions
// ============================================================================

const statusConfig: Record<User["status"], { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  inactive: { label: "Inactive", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  suspended: { label: "Suspended", className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" },
};

const roleLabels: Record<User["role"], string> = {
  admin: "Administrator",
  user: "User",
  editor: "Editor",
  viewer: "Viewer",
};

const columns: ColumnDef<User>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    sortable: true,
    cell: (_, row) => (
      <div>
        <div className="font-medium">{row.name}</div>
        <div className="text-sm text-muted-foreground">{row.email}</div>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    sortable: true,
    filterable: true,
    filterType: "select",
    filterOptions: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" },
      { label: "Suspended", value: "suspended" },
    ],
    cell: (value) => {
      const config = statusConfig[value as User["status"]];
      return (
        <Badge variant="secondary" className={cn("font-normal", config.className)}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    sortable: true,
    filterable: true,
    filterType: "select",
    filterOptions: [
      { label: "Administrator", value: "admin" },
      { label: "User", value: "user" },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
    ],
    cell: (value) => roleLabels[value as User["role"]],
  },
  {
    id: "createdAt",
    header: "Created",
    accessorKey: "createdAt",
    sortable: true,
    cell: (value) => new Date(value as string).toLocaleDateString(),
  },
];

// ============================================================================
// Demo Data Fetcher
// ============================================================================

async function fetchMockData(params: FetchTableDataParams): Promise<TableDataResult<User>> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...mockUsers];

  // Apply search
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  // Apply filters
  if (params.filters && params.filters.length > 0) {
    params.filters.forEach((filter) => {
      filtered = filtered.filter((user) => {
        const value = user[filter.column as keyof User];
        return value === filter.value;
      });
    });
  }

  // Apply sort
  if (params.sort && params.sort.column) {
    filtered.sort((a, b) => {
      const aVal = a[params.sort!.column as keyof User];
      const bVal = b[params.sort!.column as keyof User];
      const cmp = String(aVal).localeCompare(String(bVal));
      return params.sort!.direction === "asc" ? cmp : -cmp;
    });
  }

  // Apply pagination
  const total = filtered.length;
  const start = (params.page - 1) * params.pageSize;
  const data = filtered.slice(start, start + params.pageSize);

  return { data, total, page: params.page, pageSize: params.pageSize };
}

// ============================================================================
// Main Component
// ============================================================================

const Table02 = ({
  className,
  onFetchData,
  onDelete,
  onEdit,
  onView,
}: Table02Props) => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sort, setSort] = useState<SortState>({ column: "createdAt", direction: "desc" });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: FetchTableDataParams = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        sort,
        filters,
        search,
      };

      const result = onFetchData
        ? await onFetchData(params)
        : await fetchMockData(params);

      setData(result.data);
      setPagination((prev) => ({ ...prev, total: result.total }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize, sort, filters, search, onFetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [search, filters]);

  const handleDelete = async (ids: string[]) => {
    try {
      if (onDelete) {
        await onDelete(ids);
      } else {
        // Demo mode
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      toast.success(`Deleted ${ids.length} item(s)`);
      setSelectedIds([]);
      fetchData();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    setSelectedIds([]);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, page: 1 }));
    setSelectedIds([]);
  };

  return (
    <div className={cn("w-full bg-background", className)}>
      <Toaster />

      {/* Header */}
      <div className="border-b px-6 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your users and their permissions.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search users..."
            className="w-64"
          />
          <TableFilters
            columns={columns}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={cn("mr-2 size-4", loading && "animate-spin")} />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            Add user
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="px-6 py-2">
          <BulkActions
            selectedCount={selectedIds.length}
            onDelete={() => handleDelete(selectedIds)}
            onExport={() => toast.info("Export not implemented in demo")}
          />
        </div>
      )}

      {/* Table */}
      <div className="px-6 py-4">
        {error ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
            <p className="text-muted-foreground">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={fetchData}>
              Try again
            </Button>
          </div>
        ) : loading ? (
          <LoadingSkeleton columns={4} rows={5} />
        ) : (
          <DataTable
            data={data}
            columns={columns}
            sort={sort}
            onSortChange={setSort}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onView={onView}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && (
        <div className="border-t px-6 py-4">
          <TablePagination
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </div>
  );
};

export { Table02 };
export type { Table02Props, User, ColumnDef, FetchTableDataParams, TableDataResult };

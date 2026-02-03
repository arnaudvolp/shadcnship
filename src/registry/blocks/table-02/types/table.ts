// ============================================================================
// Types for Data-Driven Table Component
// ============================================================================

export type SortDirection = "asc" | "desc";

export interface SortState {
  column: string;
  direction: SortDirection;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface FilterOperator {
  value: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "like" | "ilike" | "in";
  label: string;
}

export interface Filter {
  column: string;
  operator: FilterOperator["value"];
  value: string | number | string[];
}

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: "text" | "select" | "date" | "number";
  filterOptions?: { label: string; value: string }[];
  cell?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

export interface TableDataResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface FetchTableDataParams {
  page: number;
  pageSize: number;
  sort?: SortState;
  filters?: Filter[];
  search?: string;
}

// User type for demo data
export type UserStatus = "active" | "inactive" | "pending" | "suspended";
export type UserRole = "admin" | "user" | "editor" | "viewer";

export interface User {
  id: string;
  email: string;
  name: string;
  status: UserStatus;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

export interface Table02Props {
  className?: string;
  // Data fetching - injected by stack-specific hooks/actions
  onFetchData?: (params: FetchTableDataParams) => Promise<TableDataResult<User>>;
  // CRUD operations
  onDelete?: (ids: string[]) => Promise<void>;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

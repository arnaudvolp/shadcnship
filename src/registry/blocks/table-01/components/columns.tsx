"use client";

import { ColumnDef } from "@tanstack/react-table";

// Generic row type
export type TableRow = Record<string, unknown>;

// Format value based on type
function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number") {
    // Check if it looks like a currency amount
    return value.toLocaleString();
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value instanceof Date) return value.toLocaleDateString();
  if (typeof value === "string") {
    // Check if it's an ISO date string
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      return new Date(value).toLocaleDateString();
    }
    return value;
  }
  return String(value);
}

// Convert field name to readable header
function formatHeader(field: string): string {
  return field
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Status badge component for status-like fields
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    processing: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    pending: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    failed: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    error: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    cancelled: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    inactive: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  };

  const variant = variants[status.toLowerCase()] || "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium capitalize ${variant}`}>
      {status}
    </span>
  );
}

// Generate columns dynamically from field names
export function generateColumns(fields: string[]): ColumnDef<TableRow>[] {
  // Filter out common internal fields
  const displayFields = fields.filter(
    (f) => !["id", "created_at", "updated_at", "deleted_at"].includes(f)
  );

  return displayFields.map((field) => {
    const isStatusField = field.toLowerCase().includes("status") || field.toLowerCase() === "state";
    const isAmountField = field.toLowerCase().includes("amount") || field.toLowerCase().includes("price") || field.toLowerCase().includes("total");

    return {
      accessorKey: field,
      header: isAmountField
        ? () => <div className="text-right">{formatHeader(field)}</div>
        : formatHeader(field),
      cell: ({ row }) => {
        const value = row.getValue(field);

        // Status field - show badge
        if (isStatusField && typeof value === "string") {
          return <StatusBadge status={value} />;
        }

        // Amount field - right align and format as currency
        if (isAmountField && typeof value === "number") {
          return (
            <div className="text-right font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(value)}
            </div>
          );
        }

        // Default formatting
        return <div className="text-muted-foreground">{formatValue(value)}</div>;
      },
    };
  });
}

// Default columns for demo (Payment type)
export type Payment = {
  id: string;
  email: string;
  amount: number;
  status: "success" | "processing" | "failed";
  created_at: string;
};

export const defaultColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(row.getValue("amount"))}
      </div>
    ),
  },
];

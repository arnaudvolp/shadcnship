"use client";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./row-actions";
import type { ColumnDef, User, SortState } from "../types/table";

interface DataTableProps {
  data: User[];
  columns: ColumnDef<User>[];
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (ids: string[]) => void;
  className?: string;
}

export function DataTable({
  data,
  columns,
  sort,
  onSortChange,
  selectedIds,
  onSelectionChange,
  onView,
  onEdit,
  onDelete,
  className,
}: DataTableProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(data.map((row) => row.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleSort = (columnId: string) => {
    if (!onSortChange) return;

    if (sort?.column === columnId) {
      if (sort.direction === "asc") {
        onSortChange({ column: columnId, direction: "desc" });
      } else {
        onSortChange({ column: "", direction: "asc" }); // Clear sort
      }
    } else {
      onSortChange({ column: columnId, direction: "asc" });
    }
  };

  const getSortDirection = (columnId: string) => {
    if (sort?.column === columnId) {
      return sort.direction;
    }
    return false;
  };

  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                ref={(ref) => {
                  if (ref) {
                    (ref as HTMLButtonElement).dataset.state = someSelected
                      ? "indeterminate"
                      : allSelected
                      ? "checked"
                      : "unchecked";
                  }
                }}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            {columns.map((column) => (
              <TableHead key={column.id} className={column.className}>
                <ColumnHeader
                  title={column.header}
                  sortable={column.sortable}
                  sorted={getSortDirection(column.id)}
                  onSort={() => handleSort(column.id)}
                />
              </TableHead>
            ))}
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + 2}
                className="h-24 text-center text-muted-foreground"
              >
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow
                key={row.id}
                data-state={selectedIds.includes(row.id) ? "selected" : undefined}
                className="hover:bg-muted/50"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(row.id, checked as boolean)
                    }
                    aria-label={`Select row ${row.id}`}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} className={column.className}>
                    {column.cell
                      ? column.cell(row[column.accessorKey], row)
                      : String(row[column.accessorKey] ?? "")}
                  </TableCell>
                ))}
                <TableCell>
                  <RowActions
                    onView={onView ? () => onView(row.id) : undefined}
                    onEdit={onEdit ? () => onEdit(row.id) : undefined}
                    onDelete={onDelete ? () => onDelete([row.id]) : undefined}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

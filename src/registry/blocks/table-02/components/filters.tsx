"use client";

import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Filter as FilterType, ColumnDef, User } from "../types/table";

interface TableFiltersProps {
  columns: ColumnDef<User>[];
  filters: FilterType[];
  onFiltersChange: (filters: FilterType[]) => void;
  className?: string;
}

export function TableFilters({
  columns,
  filters,
  onFiltersChange,
  className,
}: TableFiltersProps) {
  const filterableColumns = columns.filter((col) => col.filterable);
  const activeFilters = filters.length;

  const handleAddFilter = (column: string, value: string) => {
    const existingIndex = filters.findIndex((f) => f.column === column);
    if (existingIndex >= 0) {
      const newFilters = [...filters];
      newFilters[existingIndex] = { column, operator: "eq", value };
      onFiltersChange(newFilters);
    } else {
      onFiltersChange([...filters, { column, operator: "eq", value }]);
    }
  };

  const handleRemoveFilter = (column: string) => {
    onFiltersChange(filters.filter((f) => f.column !== column));
  };

  const handleClearAll = () => {
    onFiltersChange([]);
  };

  const getFilterValue = (column: string) => {
    const filter = filters.find((f) => f.column === column);
    return filter?.value as string | undefined;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 size-4" />
            Filters
            {activeFilters > 0 && (
              <Badge variant="secondary" className="ml-2 rounded-full px-1.5">
                {activeFilters}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72" align="start">
          <div className="flex items-center justify-between px-2 py-1.5">
            <DropdownMenuLabel className="p-0">Filters</DropdownMenuLabel>
            {activeFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground"
                onClick={handleClearAll}
              >
                Clear all
              </Button>
            )}
          </div>
          <DropdownMenuSeparator />
          <div className="space-y-3 p-2">
            {filterableColumns.map((column) => (
              <div key={column.id} className="space-y-1.5">
                <label className="text-xs font-medium">{column.header}</label>
                <Select
                  value={getFilterValue(column.id) || ""}
                  onValueChange={(value) => {
                    if (value && value !== "_all") {
                      handleAddFilter(column.id, value);
                    } else {
                      handleRemoveFilter(column.id);
                    }
                  }}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder={`Select ${column.header.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">All</SelectItem>
                    {column.filterOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Active filter badges */}
      {filters.map((filter) => {
        const column = columns.find((c) => c.id === filter.column);
        const option = column?.filterOptions?.find((o) => o.value === filter.value);
        return (
          <Badge key={filter.column} variant="secondary" className="gap-1">
            {column?.header}: {option?.label || filter.value}
            <button
              onClick={() => handleRemoveFilter(filter.column)}
              className="ml-1 rounded-full hover:bg-muted"
            >
              <X className="size-3" />
              <span className="sr-only">Remove filter</span>
            </button>
          </Badge>
        );
      })}
    </div>
  );
}

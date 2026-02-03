"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { SortDirection } from "../types/table";

interface ColumnHeaderProps {
  title: string;
  sortable?: boolean;
  sorted?: SortDirection | false;
  onSort?: () => void;
  className?: string;
}

export function ColumnHeader({
  title,
  sortable,
  sorted,
  onSort,
  className,
}: ColumnHeaderProps) {
  if (!sortable) {
    return <span className={cn("text-muted-foreground", className)}>{title}</span>;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-3 h-8 font-medium", className)}
      onClick={onSort}
    >
      {title}
      {sorted === "asc" ? (
        <ArrowUp className="ml-1 size-3" />
      ) : sorted === "desc" ? (
        <ArrowDown className="ml-1 size-3" />
      ) : (
        <ArrowUpDown className="ml-1 size-3 text-muted-foreground" />
      )}
    </Button>
  );
}

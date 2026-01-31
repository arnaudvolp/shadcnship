"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  BlocksViewOptions,
  type ViewMode,
  type ColumnCount,
} from "@/components/blocks/category";

interface SaasToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  columns: ColumnCount;
  onColumnsChange: (columns: ColumnCount) => void;
  resultsCount: number;
}

export function SaasToolbar({
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  columns,
  onColumnsChange,
  resultsCount,
}: SaasToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left side: Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search SaaS blocks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Right side: Results count and View options */}
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{resultsCount}</span>{" "}
          {resultsCount === 1 ? "block" : "blocks"}
        </p>
        <BlocksViewOptions
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          columns={columns}
          onColumnsChange={onColumnsChange}
        />
      </div>
    </div>
  );
}

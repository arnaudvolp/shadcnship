"use client";

import { BlocksSearch } from "./blocks-search";
import { BlocksCategoryFilter } from "./blocks-category-filter";
import {
  BlocksViewOptions,
  type ViewMode,
  type ColumnCount,
} from "./blocks-view-options";
import type { BlockCategory } from "@/types/blocks";

interface BlocksToolbarProps {
  // Search
  search: string;
  onSearchChange: (value: string) => void;
  // Category filter
  categories: BlockCategory[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  // View options
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  columns: ColumnCount;
  onColumnsChange: (columns: ColumnCount) => void;
  // Results count
  resultsCount: number;
}

export function BlocksToolbar({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  columns,
  onColumnsChange,
  resultsCount,
}: BlocksToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left side: Search and Category filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <BlocksSearch value={search} onChange={onSearchChange} />
        <BlocksCategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={onCategoryChange}
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

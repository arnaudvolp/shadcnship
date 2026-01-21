"use client";

import { useState, useMemo } from "react";
import { BlockCard } from "@/components/blocks/block-card";
import { BlocksEmpty } from "@/components/blocks/blocks-empty";
import { BackgroundsToolbar } from "./backgrounds-toolbar";
import { useDebounce } from "@/hooks/use-debounce";
import type { SerializableRegistryBlock } from "@/types/blocks";
import type { ViewMode, ColumnCount } from "@/components/blocks/category";
import { cn } from "@/lib/utils";

interface BackgroundsGridProps {
  backgrounds: SerializableRegistryBlock[];
}

const columnClasses: Record<ColumnCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function BackgroundsGrid({ backgrounds }: BackgroundsGridProps) {
  // Filter state
  const [search, setSearch] = useState("");

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [columns, setColumns] = useState<ColumnCount>(3);

  // Debounce search for performance
  const debouncedSearch = useDebounce(search, 300);

  // Filter backgrounds based on search
  const filteredBackgrounds = useMemo(() => {
    return backgrounds.filter((background) => {
      const searchLower = debouncedSearch.toLowerCase();
      return (
        !debouncedSearch ||
        background.name.toLowerCase().includes(searchLower) ||
        background.title.toLowerCase().includes(searchLower) ||
        background.description.toLowerCase().includes(searchLower)
      );
    });
  }, [backgrounds, debouncedSearch]);

  return (
    <div className="space-y-8">
      {/* Toolbar with search and view options */}
      <BackgroundsToolbar
        search={search}
        onSearchChange={setSearch}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        columns={columns}
        onColumnsChange={setColumns}
        resultsCount={filteredBackgrounds.length}
      />

      {/* Backgrounds display */}
      {filteredBackgrounds.length === 0 ? (
        <BlocksEmpty isFiltered={debouncedSearch !== ""} />
      ) : viewMode === "grid" ? (
        <div className={cn("grid gap-6", columnClasses[columns])}>
          {filteredBackgrounds.map((background) => (
            <BlockCard
              key={background.name}
              block={background}
              basePath="/background"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredBackgrounds.map((background) => (
            <BlockCard
              key={background.name}
              block={background}
              basePath="/background"
            />
          ))}
        </div>
      )}
    </div>
  );
}

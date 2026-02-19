"use client";

import { useState, useMemo } from "react";
import { BlockCard } from "@/components/blocks/block-card";
import { BlocksEmpty } from "@/components/blocks/blocks-empty";
import { SaasToolbar } from "./saas-toolbar";
import { useDebounce } from "@/hooks/use-debounce";
import type { SerializableRegistryBlock } from "@/types/blocks";
import type { ViewMode, ColumnCount } from "@/components/blocks/category";
import { cn } from "@/lib/utils";

interface SaasGridProps {
  blocks: SerializableRegistryBlock[];
}

const columnClasses: Record<ColumnCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function SaasGrid({ blocks }: SaasGridProps) {
  // Filter state
  const [search, setSearch] = useState("");

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [columns, setColumns] = useState<ColumnCount>(3);

  // Debounce search for performance
  const debouncedSearch = useDebounce(search, 300);

  // Filter blocks based on search
  const filteredBlocks = useMemo(() => {
    return blocks.filter((block) => {
      const searchLower = debouncedSearch.toLowerCase();
      return (
        !debouncedSearch ||
        block.name.toLowerCase().includes(searchLower) ||
        block.title.toLowerCase().includes(searchLower) ||
        block.description.toLowerCase().includes(searchLower)
      );
    });
  }, [blocks, debouncedSearch]);

  return (
    <div className="space-y-8">
      {/* Toolbar with search and view options */}
      <SaasToolbar
        search={search}
        onSearchChange={setSearch}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        columns={columns}
        onColumnsChange={setColumns}
        resultsCount={filteredBlocks.length}
      />

      {/* Blocks display */}
      {filteredBlocks.length === 0 ? (
        <BlocksEmpty isFiltered={debouncedSearch !== ""} />
      ) : viewMode === "grid" ? (
        <div className={cn("grid gap-6", columnClasses[columns])}>
          {filteredBlocks.map((block) => (
            <BlockCard
              key={block.name}
              block={block}
              basePath="/saas"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredBlocks.map((block) => (
            <BlockCard
              key={block.name}
              block={block}
              basePath="/saas"
            />
          ))}
        </div>
      )}
    </div>
  );
}

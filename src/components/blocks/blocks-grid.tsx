"use client";

import { useState, useMemo } from "react";
import { BlockCard } from "./block-card";
import { BlocksEmpty } from "./blocks-empty";
import { BlocksToolbar, type ViewMode, type ColumnCount } from "./category";
import { useDebounce } from "@/hooks/use-debounce";
import type { SerializableRegistryBlock, BlockCategory } from "@/types/blocks";
import { cn } from "@/lib/utils";

interface BlocksGridProps {
  blocks: SerializableRegistryBlock[];
  categories: BlockCategory[];
  initialCategory?: string;
}

const columnClasses: Record<ColumnCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function BlocksGrid({ blocks, categories, initialCategory }: BlocksGridProps) {
  // Filter state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all");

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [columns, setColumns] = useState<ColumnCount>(3);

  // Debounce search for performance
  const debouncedSearch = useDebounce(search, 300);

  // Filter blocks based on search and category
  const filteredBlocks = useMemo(() => {
    return blocks.filter((block) => {
      // Search filter
      const searchLower = debouncedSearch.toLowerCase();
      const matchesSearch =
        !debouncedSearch ||
        block.name.toLowerCase().includes(searchLower) ||
        block.title.toLowerCase().includes(searchLower) ||
        block.description.toLowerCase().includes(searchLower) ||
        block.categories.some((cat) =>
          cat.title.toLowerCase().includes(searchLower)
        );

      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        block.categories.some((cat) => cat.name === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [blocks, debouncedSearch, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Toolbar with filters and view options */}
      <BlocksToolbar
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        columns={columns}
        onColumnsChange={setColumns}
        resultsCount={filteredBlocks.length}
      />

      {/* Blocks display */}
      {filteredBlocks.length === 0 ? (
        <BlocksEmpty
          isFiltered={debouncedSearch !== "" || selectedCategory !== "all"}
        />
      ) : viewMode === "grid" ? (
        <div className={cn("grid gap-6", columnClasses[columns])}>
          {filteredBlocks.map((block) => (
            <BlockCard key={block.name} block={block} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredBlocks.map((block) => (
            <BlockCard key={block.name} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}

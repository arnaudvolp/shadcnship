"use client";

import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";
export type ColumnCount = 1 | 2 | 3 | 4;

interface BlocksViewOptionsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  columns: ColumnCount;
  onColumnsChange: (columns: ColumnCount) => void;
}

const columnOptions: ColumnCount[] = [1, 2, 3, 4];

export function BlocksViewOptions({
  viewMode,
  onViewModeChange,
  columns,
  onColumnsChange,
}: BlocksViewOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Grid/List toggle */}
      <ToggleGroup
        type="single"
        value={viewMode}
        onValueChange={(value) => value && onViewModeChange(value as ViewMode)}
        className="border rounded-md"
      >
        <ToggleGroupItem value="grid" aria-label="Grid view" className="px-2.5">
          <LayoutGrid className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List view" className="px-2.5">
          <List className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Column count selector (only show in grid mode) */}
      {viewMode === "grid" && (
        <div className="flex items-center border rounded-md">
          {columnOptions.map((count) => (
            <Button
              key={count}
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0 rounded-none first:rounded-l-md last:rounded-r-md",
                columns === count && "bg-accent text-accent-foreground"
              )}
              onClick={() => onColumnsChange(count)}
            >
              {count}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

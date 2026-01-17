"use client";

import { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBlockContext } from "@/providers/block-provider";
import { themePresets } from "@/config/theme-presets";
import type { ThemePreset, ThemePresetColors } from "@/types/blocks";
import { cn } from "@/lib/utils";

function ColorDots({ colors, compact = false }: { colors: ThemePresetColors; compact?: boolean }) {
  // Extract the main colors for display
  const allColors = [
    colors.primary,
    colors.secondary,
    colors.accent,
    colors.muted,
  ];

  // Show only first 2 colors in compact mode (mobile)
  const dotColors = compact ? allColors.slice(0, 2) : allColors;

  return (
    <div className="flex items-center gap-0.5">
      {dotColors.map((color, index) => (
        <div
          key={index}
          className="size-3 rounded-full border border-border/50"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export function ThemePresetSelector() {
  const { themePreset, setThemePreset, theme } = useBlockContext();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredPresets = themePresets.filter((preset) =>
    preset.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (preset: ThemePreset) => {
    setThemePreset(preset);
    setOpen(false);
    setSearch("");
  };

  // Get colors based on current theme mode
  const currentColors = themePreset.colors[theme];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 md:min-w-[140px] justify-between"
        >
          <div className="flex items-center gap-2">
            {/* Mobile: 2 dots only */}
            <div className="md:hidden">
              <ColorDots colors={currentColors} compact />
            </div>
            {/* Desktop: 4 dots */}
            <div className="hidden md:block">
              <ColorDots colors={currentColors} />
            </div>
            <span className="font-normal hidden md:inline">{themePreset.label}</span>
          </div>
          <ChevronDown className="size-3.5 text-muted-foreground hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <div className="p-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Themes
          </p>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search themes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "w-full h-8 pl-7 pr-2 text-sm rounded-md border bg-transparent",
                "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              )}
            />
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredPresets.length === 0 ? (
            <div className="py-4 text-center text-sm text-muted-foreground">
              No themes found
            </div>
          ) : (
            filteredPresets.map((preset) => (
              <DropdownMenuItem
                key={preset.name}
                onClick={() => handleSelect(preset)}
                className="cursor-pointer gap-2 py-2"
              >
                <ColorDots colors={preset.colors[theme]} />
                <span className="flex-1">{preset.label}</span>
                {preset.author && (
                  <span className="text-xs text-muted-foreground">
                    by {preset.author}
                  </span>
                )}
                {themePreset.name === preset.name && (
                  <Check className="size-4 text-green-500" />
                )}
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

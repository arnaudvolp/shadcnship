"use client";

import { Moon, Sun, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlockContext } from "./block-provider";

export function BlockControls() {
  const { block, theme, setTheme } = useBlockContext();

  return (
    <div className="flex items-center gap-2">
      {/* Theme toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {/* Fullscreen */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(`/blocks/${block.name}/preview`, "_blank")}
        title="Open in fullscreen"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

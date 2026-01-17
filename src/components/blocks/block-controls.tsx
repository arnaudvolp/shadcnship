"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useBlockContext } from "./block-provider";
import { BlockInstallCommand } from "./block-install-command";
import { BlockThemeToggle } from "./block-theme-toggle";
import { BlockFullscreenButton } from "./block-fullscreen-button";
import { V0Button } from "./v0-button";
import { ScreenSizeSelector } from "./screen-size-selector";
import { ThemePresetSelector } from "./theme-preset-selector";

export function BlockControls() {
  const { block } = useBlockContext();

  const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "";
  const v0RegistryUrl = `${registryUrl}/r/${block.name}.json`;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center gap-2">
        <BlockInstallCommand blockName={block.name} />
        <BlockThemeToggle />
        <BlockFullscreenButton blockName={block.name} />
        <V0Button url={v0RegistryUrl} />
        <ScreenSizeSelector />
        <ThemePresetSelector />
      </div>
    </TooltipProvider>
  );
}

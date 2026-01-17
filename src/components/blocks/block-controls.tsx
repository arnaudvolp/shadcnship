"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useBlockContext } from "../../providers/block-provider";
import {
  BlockInstallCommand,
  BlockThemeToggle,
  BlockFullscreenButton,
  V0Button,
  ScreenSizeSelector,
  ThemePresetSelector,
} from "./tools";

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

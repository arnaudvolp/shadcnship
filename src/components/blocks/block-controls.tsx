"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlockContext } from "../../providers/block-provider";
import {
  BlockInstallCommand,
  BlockThemeToggle,
  BlockFullscreenButton,
  V0Button,
  ScreenSizeSelector,
  StackSelector,
  ThemePresetSelector,
} from "./tools";
import { siteConfig } from "@/config/site";

interface BlockControlsProps {
  hasDocs?: boolean;
}

export function BlockControls({ hasDocs = false }: BlockControlsProps) {
  const { block, availableStacks } = useBlockContext();
  const hasStacks = availableStacks.length > 0;

  const v0RegistryUrl = `${siteConfig.url}/r/${block.name}.json`;

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile layout */}
      <div className="flex md:hidden items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <BlockInstallCommand blockName={block.name} />
          <V0Button url={v0RegistryUrl} />
          <BlockFullscreenButton blockName={block.name} />
        </div>
        <div className="flex items-center gap-2">
          {hasStacks && <StackSelector />}
          <ThemePresetSelector />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex flex-wrap items-center gap-2">
        <BlockInstallCommand blockName={block.name} />
        <V0Button url={v0RegistryUrl} />
        <BlockFullscreenButton blockName={block.name} />

        <div className="h-4 w-px bg-border mx-1" />

        <BlockThemeToggle />
        <ThemePresetSelector />

        {hasStacks && (
          <>
            <div className="h-4 w-px bg-border mx-1" />
            <StackSelector />
          </>
        )}

        <div className="h-4 w-px bg-border mx-1" />

        <ScreenSizeSelector />

        <div className="h-4 w-px bg-border mx-1" />

        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          {hasDocs && <TabsTrigger value="docs">Docs</TabsTrigger>}
        </TabsList>
      </div>
    </TooltipProvider>
  );
}

"use client";

import { createContext, useContext, ReactNode, useState, useMemo } from "react";
import { useBlockTheme } from "@/hooks/use-block-theme";
import type { SerializableRegistryBlock, Theme, ScreenSize, ThemePreset, Stack } from "@/types/blocks";

// File code data type
export interface FileCodeData {
  path: string;
  code: string;
  highlightedCode: string;
  fileName: string;
}

interface BlockContextValue {
  block: SerializableRegistryBlock;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  screenSize: ScreenSize;
  setScreenSize: (size: ScreenSize) => void;
  themePreset: ThemePreset;
  setThemePreset: (preset: ThemePreset) => void;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  previewBasePath: string;
  // File code management
  filesCode: Record<string, FileCodeData>;
  activeFilePath: string;
  setActiveFilePath: (path: string) => void;
  // Documentation
  docs: string | null;
  // Stack selection
  selectedStack: Stack | null;
  setSelectedStack: (stack: Stack | null) => void;
  availableStacks: Stack[];
}

const BlockContext = createContext<BlockContextValue | undefined>(undefined);

export function useBlockContext() {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error("useBlockContext must be used within BlockProvider");
  }
  return context;
}

interface BlockProviderProps {
  children: ReactNode;
  block: SerializableRegistryBlock;
  previewBasePath?: string;
  filesCode?: FileCodeData[];
  docs?: string | null;
}

export function BlockProvider({
  children,
  block,
  previewBasePath = "/blocks",
  filesCode = [],
  docs = null,
}: BlockProviderProps) {
  const { theme, setTheme, screenSize, setScreenSize, themePreset, setThemePreset, iframeRef } = useBlockTheme();

  // Convert array to record for easy lookup
  const filesCodeRecord = filesCode.reduce((acc, file) => {
    acc[file.path] = file;
    return acc;
  }, {} as Record<string, FileCodeData>);

  // Track active file (default to first file)
  const [activeFilePath, setActiveFilePath] = useState(filesCode[0]?.path || "");

  // Stack selection - initialize from block's meta.stacks
  // Filter to only include valid Stack values
  const availableStacks = useMemo(() => {
    const stacks = block.meta?.stacks || [];
    const validStacks: Stack[] = ["supabase", "postgres"];
    return stacks.filter((s): s is Stack => validStacks.includes(s as Stack));
  }, [block.meta?.stacks]);

  const [selectedStack, setSelectedStack] = useState<Stack | null>(
    availableStacks.length > 0 ? availableStacks[0] : null
  );

  return (
    <BlockContext.Provider value={{
      block,
      theme,
      setTheme,
      screenSize,
      setScreenSize,
      themePreset,
      setThemePreset,
      iframeRef,
      previewBasePath,
      filesCode: filesCodeRecord,
      activeFilePath,
      setActiveFilePath,
      docs,
      selectedStack,
      setSelectedStack,
      availableStacks,
    }}>
      {children}
    </BlockContext.Provider>
  );
}

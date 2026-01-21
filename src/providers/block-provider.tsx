"use client";

import { createContext, useContext, ReactNode } from "react";
import { useBlockTheme } from "@/hooks/use-block-theme";
import type { SerializableRegistryBlock, Theme, ScreenSize, ThemePreset } from "@/types/blocks";

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
}

export function BlockProvider({ children, block, previewBasePath = "/blocks" }: BlockProviderProps) {
  const { theme, setTheme, screenSize, setScreenSize, themePreset, setThemePreset, iframeRef } = useBlockTheme();

  return (
    <BlockContext.Provider value={{ block, theme, setTheme, screenSize, setScreenSize, themePreset, setThemePreset, iframeRef, previewBasePath }}>
      {children}
    </BlockContext.Provider>
  );
}

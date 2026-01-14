"use client";

import { createContext, useContext, ReactNode } from "react";
import { useBlockTheme } from "@/hooks/use-block-theme";
import type { RegistryBlock, Theme } from "@/types/blocks";

interface BlockContextValue {
  block: RegistryBlock;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
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
  block: RegistryBlock;
}

export function BlockProvider({ children, block }: BlockProviderProps) {
  const { theme, setTheme, iframeRef } = useBlockTheme();

  return (
    <BlockContext.Provider value={{ block, theme, setTheme, iframeRef }}>
      {children}
    </BlockContext.Provider>
  );
}

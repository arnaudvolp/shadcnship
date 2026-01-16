"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { PackageManager } from "@/config/package-managers";

const STORAGE_KEY = "preferred-package-manager";

interface PackageManagerContextValue {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
  isHydrated: boolean;
}

const PackageManagerContext = createContext<PackageManagerContextValue | undefined>(undefined);

export function PackageManagerProvider({ children }: { children: ReactNode }) {
  const [packageManager, setPackageManagerState] = useState<PackageManager>("npm");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PackageManager | null;
    if (stored && ["npm", "pnpm", "yarn", "bun"].includes(stored)) {
      setPackageManagerState(stored);
    }
    setIsHydrated(true);
  }, []);

  const setPackageManager = (pm: PackageManager) => {
    setPackageManagerState(pm);
    localStorage.setItem(STORAGE_KEY, pm);
  };

  return (
    <PackageManagerContext.Provider value={{ packageManager, setPackageManager, isHydrated }}>
      {children}
    </PackageManagerContext.Provider>
  );
}

export function usePackageManager() {
  const context = useContext(PackageManagerContext);
  if (!context) {
    throw new Error("usePackageManager must be used within PackageManagerProvider");
  }
  return context;
}

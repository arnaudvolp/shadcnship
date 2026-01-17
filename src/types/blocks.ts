import { JSX } from "react";

export type Theme = "light" | "dark";

export type ScreenSize = "mobile" | "tablet" | "desktop";

export type Plan = "free" | "pro" | "premium";

export const BLOCK_PRICING: Record<Plan, Plan> = {
  free: "free",
  pro: "pro",
  premium: "premium",
};

export type BlockCategory = {
  name: string;
  title: string;
  icon?: string;
  description?: string;
};

export interface RegistryFile {
  path: string;
  type?: string;
  target?: string;
}

export interface RegistryMeta {
  category?: string;
  tags?: string[];
  image?: string;
}

// Type for registry.json (shadcn CLI compatibility)
export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
  meta?: RegistryMeta;
}

// Type for blocks config (with React components)
export interface RegistryBlock {
  name: string;
  title: string;
  slug?: string;
  description: string;
  categories: BlockCategory[];
  component?: React.LazyExoticComponent<() => JSX.Element>;
  files: RegistryFile[];
  layout?: React.FC<{ children: React.ReactNode }>;
  pricing?: Plan;
  dependencies?: string[];
  registryDependencies?: string[];
  image?: string;
}

// Serializable version (for passing to Client Components)
export type SerializableRegistryBlock = Omit<RegistryBlock, "component" | "layout">;

// Theme preset system
export interface ThemePresetColors {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  radius?: string;
  // Chart colors (optional)
  "chart-1"?: string;
  "chart-2"?: string;
  "chart-3"?: string;
  "chart-4"?: string;
  "chart-5"?: string;
  // Sidebar colors (optional)
  "sidebar-background"?: string;
  "sidebar-foreground"?: string;
  "sidebar-primary"?: string;
  "sidebar-primary-foreground"?: string;
  "sidebar-accent"?: string;
  "sidebar-accent-foreground"?: string;
  "sidebar-border"?: string;
  "sidebar-ring"?: string;
}

export interface ThemePreset {
  name: string;
  label: string;
  author?: string;
  colors: {
    light: ThemePresetColors;
    dark: ThemePresetColors;
  };
}

import { JSX } from "react";

export type Theme = "light" | "dark";

export type ScreenSize = "mobile" | "tablet" | "desktop";

// Category with rich metadata (from config/categories.ts)
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
  image?: string;
  [key: string]: unknown;
}

// Type for raw registry.json items (shadcn CLI schema)
export interface RegistryJsonItem {
  name: string;
  type: string;
  title: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  categories?: string[]; // Official schema: string[]
  files?: RegistryFile[];
  meta?: RegistryMeta;
}

// Type for registry.json file structure
export interface RegistryJson {
  $schema?: string;
  name: string;
  homepage?: string;
  items: RegistryJsonItem[];
}

// Type for enriched blocks (with React components and category objects)
export interface RegistryBlock {
  name: string;
  title: string;
  description: string;
  categories: BlockCategory[]; // Enriched with full category data
  component?: React.LazyExoticComponent<() => JSX.Element>;
  files: RegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
  image?: string;
}

// Serializable version (for passing to Client Components)
export type SerializableRegistryBlock = Omit<RegistryBlock, "component">;

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
  // Chart colors (optional)
  "chart-1"?: string;
  "chart-2"?: string;
  "chart-3"?: string;
  "chart-4"?: string;
  "chart-5"?: string;
  // Sidebar colors (optional)
  sidebar?: string;
  "sidebar-foreground"?: string;
  "sidebar-primary"?: string;
  "sidebar-primary-foreground"?: string;
  "sidebar-accent"?: string;
  "sidebar-accent-foreground"?: string;
  "sidebar-border"?: string;
  "sidebar-ring"?: string;
  // Fonts (optional)
  "font-sans"?: string;
  "font-serif"?: string;
  "font-mono"?: string;
  // Radius (optional)
  radius?: string;
  // Shadow primitives (optional)
  "shadow-x"?: string;
  "shadow-y"?: string;
  "shadow-blur"?: string;
  "shadow-spread"?: string;
  "shadow-opacity"?: string;
  "shadow-color"?: string;
  // Shadow presets (optional)
  "shadow-2xs"?: string;
  "shadow-xs"?: string;
  "shadow-sm"?: string;
  shadow?: string;
  "shadow-md"?: string;
  "shadow-lg"?: string;
  "shadow-xl"?: string;
  "shadow-2xl"?: string;
  // Spacing & tracking (optional)
  "tracking-normal"?: string;
  spacing?: string;
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

import { JSX } from "react";

export type Theme = "light" | "dark";

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

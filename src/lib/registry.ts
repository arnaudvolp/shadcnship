import React from "react";
import registryData from "../../registry.json";
import { categories, getCategory, getAllCategories } from "@/config/categories";
import type {
  RegistryBlock,
  RegistryJsonItem,
  BlockCategory,
} from "@/types/blocks";

// Re-export categories for convenience
export { categories, getAllCategories };

/**
 * Transform a registry.json item to a RegistryBlock with enriched data
 */
function transformToBlock(item: RegistryJsonItem): RegistryBlock {
  // Map category strings to full category objects
  const blockCategories: BlockCategory[] = (item.categories || [])
    .map((catName) => getCategory(catName))
    .filter((cat): cat is BlockCategory => cat !== undefined);

  // If no categories found, use a default
  if (blockCategories.length === 0) {
    blockCategories.push({
      name: "uncategorized",
      title: "Uncategorized",
    });
  }

  // Extract the component file name from the first file path
  // e.g., "src/registry/blocks/hero-01/hero.tsx" -> "hero"
  const mainFile = item.files?.[0];
  const componentName = mainFile?.path
    ? mainFile.path.split("/").pop()?.replace(".tsx", "")
    : item.name;

  return {
    name: item.name,
    title: item.title,
    description: item.description || "",
    categories: blockCategories,
    files: item.files || [],
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    // Use meta.image if available, otherwise fallback to standard preview path
    image:
      (item.meta?.image as string | undefined) ||
      `/r/previews/${item.name}.webp`,
    // Pass through meta for stacks and other metadata
    meta: item.meta,
    // Lazy load the component based on block name convention
    component: React.lazy(() =>
      import(`@/registry/blocks/${item.name}/${componentName}`).then((mod) => ({
        // Try to find the exported component (PascalCase version of name or default)
        default: mod.default || mod[Object.keys(mod)[0]],
      })),
    ),
  };
}

// Categories that are excluded from the regular blocks page
const excludedCategories = ["background", "social-icons"];
// Categories that belong to SaaS blocks (separate page)
const saasCategories = ["waitlist", "table"];

// Transform all registry items to blocks (excluding backgrounds, social-icons, and SaaS categories)
const blocks: RegistryBlock[] = registryData.items
  .filter((item) => {
    const categories = item.categories as string[] | undefined;
    const isExcluded = categories?.some((cat) => excludedCategories.includes(cat));
    const isSaas = categories?.some((cat) => saasCategories.includes(cat));
    return !isExcluded && !isSaas;
  })
  .map(transformToBlock);

// Transform background items separately
const backgroundBlocks: RegistryBlock[] = registryData.items
  .filter((item) =>
    (item.categories as string[] | undefined)?.includes("background"),
  )
  .map(transformToBlock);

// Transform SaaS blocks separately
const saasBlocks: RegistryBlock[] = registryData.items
  .filter((item) =>
    (item.categories as string[] | undefined)?.some((cat) => saasCategories.includes(cat)),
  )
  .map(transformToBlock);

/**
 * Get all blocks
 */
export function getBlocks(): RegistryBlock[] {
  return blocks;
}

/**
 * Get a single block by name
 */
export function getBlock(name: string): RegistryBlock | undefined {
  return blocks.find((block) => block.name === name);
}

/**
 * Get blocks filtered by category name
 */
export function getBlocksByCategory(categoryName: string): RegistryBlock[] {
  return blocks.filter((block) =>
    block.categories.some((cat) => cat.name === categoryName),
  );
}

/**
 * Get all unique categories that have at least one block
 */
export function getCategories(): BlockCategory[] {
  const categoryMap = new Map<string, BlockCategory>();

  blocks.forEach((block) => {
    block.categories.forEach((category) => {
      if (!categoryMap.has(category.name)) {
        categoryMap.set(category.name, category);
      }
    });
  });

  return Array.from(categoryMap.values()).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
}

/**
 * Get all background blocks
 */
export function getBackgroundBlocks(): RegistryBlock[] {
  return backgroundBlocks;
}

/**
 * Get a single background block by name
 */
export function getBackgroundBlock(name: string): RegistryBlock | undefined {
  return backgroundBlocks.find((block) => block.name === name);
}

/**
 * Get all SaaS blocks
 */
export function getSaasBlocks(): RegistryBlock[] {
  return saasBlocks;
}

/**
 * Get a single SaaS block by name
 */
export function getSaasBlock(name: string): RegistryBlock | undefined {
  return saasBlocks.find((block) => block.name === name);
}

/**
 * Get all unique categories that have at least one SaaS block
 */
export function getSaasCategories(): BlockCategory[] {
  const categoryMap = new Map<string, BlockCategory>();

  saasBlocks.forEach((block) => {
    block.categories.forEach((category) => {
      if (!categoryMap.has(category.name)) {
        categoryMap.set(category.name, category);
      }
    });
  });

  return Array.from(categoryMap.values()).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
}

/**
 * Get any block by name (blocks, backgrounds, or SaaS)
 * Used for preview pages that need to handle all types
 */
export function getAnyBlock(name: string): RegistryBlock | undefined {
  return (
    blocks.find((block) => block.name === name) ||
    backgroundBlocks.find((block) => block.name === name) ||
    saasBlocks.find((block) => block.name === name)
  );
}

/**
 * Get all blocks including backgrounds and SaaS blocks
 * Used for generating static params
 */
export function getAllBlocks(): RegistryBlock[] {
  return [...blocks, ...backgroundBlocks, ...saasBlocks];
}

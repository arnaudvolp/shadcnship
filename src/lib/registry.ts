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
    image: item.meta?.image as string | undefined,
    // Lazy load the component based on block name convention
    component: React.lazy(() =>
      import(`@/registry/blocks/${item.name}/${componentName}`).then((mod) => ({
        // Try to find the exported component (PascalCase version of name or default)
        default: mod.default || mod[Object.keys(mod)[0]],
      }))
    ),
  };
}

// Transform all registry items to blocks
const blocks: RegistryBlock[] = registryData.items.map(transformToBlock);

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
    block.categories.some((cat) => cat.name === categoryName)
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
    a.title.localeCompare(b.title)
  );
}

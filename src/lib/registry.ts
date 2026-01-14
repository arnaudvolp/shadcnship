import { blocks, categories } from "@/config/blocks";
import type { RegistryBlock, RegistryItem, BlockCategory } from "@/types/blocks";

/**
 * Export blocks for direct use in pages
 */
export { blocks, categories };

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
 * Get all unique categories from blocks
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

/**
 * Convert RegistryBlock to RegistryItem (for API/CLI compatibility)
 * Removes React components and converts to registry.json format
 */
export function blockToRegistryItem(block: RegistryBlock): RegistryItem {
  const primaryCategory = block.categories[0]?.name;

  return {
    name: block.name,
    type: "registry:block",
    title: block.title,
    description: block.description,
    dependencies: block.dependencies,
    registryDependencies: block.registryDependencies,
    files: block.files.map((file) => ({
      path: `src/registry/blocks/${block.name}/${file.path}`,
      type: file.type || "registry:component",
      target: file.target,
    })),
    meta: {
      category: primaryCategory,
      tags: block.categories.map((cat) => cat.name),
      image: block.image,
    },
  };
}

/**
 * Get all registry items (for API)
 */
export function getRegistryItems(): RegistryItem[] {
  return blocks.map(blockToRegistryItem);
}

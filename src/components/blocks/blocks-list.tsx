import type { RegistryBlock, BlockCategory } from "@/types/blocks";
import { BlockCard } from "./block-card";

interface BlocksListProps {
  blocks: RegistryBlock[];
  categories: BlockCategory[];
}

export function BlocksList({ blocks, categories }: BlocksListProps) {
  return (
    <>
      {categories.map((category) => {
        const categoryBlocks = blocks.filter((block) =>
          block.categories.some((cat) => cat.name === category.name)
        );

        if (categoryBlocks.length === 0) return null;

        return (
          <section key={category.name} className="mb-16">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold mb-2">
                {category.icon} {category.title}
              </h2>
              {category.description && (
                <p className="text-muted-foreground">{category.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryBlocks.map((block) => (
                <BlockCard key={block.name} block={block} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

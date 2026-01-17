import { getBlocks, getCategories } from "@/lib/registry";
import { BlocksGrid, BlocksEmpty } from "@/components/blocks";
import type { SerializableRegistryBlock } from "@/types/blocks";

export const metadata = {
  title: "Blocks",
  description:
    "Beautiful, reusable components built with Shadcn UI and Tailwind CSS. Copy, paste, and customize.",
};

export default function BlocksPage() {
  const blocks = getBlocks();
  const categories = getCategories();

  // Convert blocks to serializable format (remove component function)
  const serializableBlocks: SerializableRegistryBlock[] = blocks.map(
    ({ component, ...rest }) => rest
  );

  return (
    <div className="container mx-auto py-12 border-x px-4">
      {blocks.length === 0 ? (
        <BlocksEmpty />
      ) : (
        <BlocksGrid blocks={serializableBlocks} categories={categories} />
      )}
    </div>
  );
}

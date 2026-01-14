import { getBlocks, getCategories } from "@/lib/registry";
import { BlocksList } from "@/components/blocks/blocks-list";
import { BlocksEmpty } from "@/components/blocks/blocks-empty";

export const metadata = {
  title: "Blocks",
  description:
    "Beautiful, reusable components built with Shadcn UI and Tailwind CSS. Copy, paste, and customize.",
};

export default function BlocksPage() {
  const blocks = getBlocks();
  const categories = getCategories();

  return (
    <div className="container mx-auto py-12">
      {blocks.length === 0 ? (
        <BlocksEmpty />
      ) : (
        <BlocksList blocks={blocks} categories={categories} />
      )}
    </div>
  );
}

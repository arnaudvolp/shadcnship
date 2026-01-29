import { getBlocks, getCategories } from "@/lib/registry";
import { BlocksGrid, BlocksEmpty } from "@/components/blocks";
import type { SerializableRegistryBlock } from "@/types/blocks";
import { constructMetadata, absoluteUrl } from "@/config/site";
import { BlocksPageJsonLd } from "@/components/json-ld";

export const metadata = constructMetadata({
  title: "Browse All Blocks",
  description:
    "Explore our collection of beautiful, reusable Shadcn UI blocks and components. Filter by category, preview live demos, and copy code with one click.",
  alternates: {
    canonical: absoluteUrl("/blocks"),
  },
});

interface BlocksPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlocksPage({ searchParams }: BlocksPageProps) {
  const { category } = await searchParams;
  const blocks = getBlocks();
  const categories = getCategories();

  // Convert blocks to serializable format (remove component function)
  const serializableBlocks: SerializableRegistryBlock[] = blocks.map(
    ({ component, ...rest }) => rest
  );

  // Prepare blocks for JSON-LD
  const blocksForJsonLd = blocks.map((block) => ({
    name: block.name,
    title: block.title,
    description: block.description,
    image: block.image,
  }));

  return (
    <>
      <BlocksPageJsonLd blocks={blocksForJsonLd} />
      <div className="container mx-auto py-12 border-x px-4">
        {blocks.length === 0 ? (
          <BlocksEmpty />
        ) : (
          <BlocksGrid
            blocks={serializableBlocks}
            categories={categories}
            initialCategory={category}
          />
        )}
      </div>
    </>
  );
}

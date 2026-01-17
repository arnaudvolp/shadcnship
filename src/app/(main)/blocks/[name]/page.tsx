import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlock, getBlocks } from "@/lib/registry";
import { getBlockCode } from "@/lib/transform-code";
import { BlockProvider } from "@/providers/block-provider";
import { BlockPreview, BlockControls, BlockCode } from "@/components/blocks";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { constructMetadata, absoluteUrl } from "@/config/site";

export async function generateStaticParams() {
  const blocks = getBlocks();
  return blocks.map((block) => ({ name: block.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const block = getBlock(name);

  if (!block) {
    return constructMetadata({
      title: "Block Not Found",
      description: "The requested block could not be found.",
      noIndex: true,
    });
  }

  const primaryCategory = block.categories[0];
  const categoryTitle = primaryCategory?.title || "Component";

  return constructMetadata({
    title: `${block.title} - ${categoryTitle} Block`,
    description: `${block.description} A fully customizable and responsive ${categoryTitle.toLowerCase()} component built with Shadcn UI and Tailwind CSS. Preview and copy the code.`,
    image: block.image || "/og-image.png",
    alternates: {
      canonical: absoluteUrl(`/blocks/${block.name}`),
    },
    openGraph: {
      type: "article",
    },
  });
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const block = getBlock(name);

  if (!block) {
    notFound();
  }

  // Extract only serializable data (exclude component function)
  const { component, ...serializableBlock } = block;

  // Get code from main component file (path is already full path from registry.json)
  const mainFile = block.files?.[0];
  const code = mainFile ? await getBlockCode(mainFile.path) : "";

  const primaryCategory = block.categories[0];

  return (
    <BlockProvider block={serializableBlock}>
      <div className="container mx-auto py-6 border-x px-4">
        {/* Compact Header: Breadcrumb + Title inline */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/blocks" className="hover:text-foreground">
            Blocks
          </Link>
          <span>/</span>
          {primaryCategory && (
            <span className="hover:text-foreground">
              {primaryCategory.title}
            </span>
          )}
          <span>/</span>
          <span className="font-medium text-foreground">{block.title}</span>
        </div>

        {/* Preview & Code */}
        <Tabs defaultValue="preview">
          <div className="flex flex-col lg:flex-row lg:flex-nowrap items-start lg:items-center justify-between mb-2">
            {/* Line 1: Component name */}
            <h1 className="text-lg font-semibold mb-3md:mb-0">{block.title}</h1>

            {/* Line 2: Toolbar */}
            <div className="w-full md:w-fit">
              <BlockControls />
            </div>
          </div>
          <TabsContent value="preview" className="mt-0">
            <BlockPreview />
          </TabsContent>

          <TabsContent value="code" className="mt-0">
            <BlockCode code={code} />
          </TabsContent>
        </Tabs>
      </div>
    </BlockProvider>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlock, getBlocks } from "@/lib/registry";
import { getBlockCodeWithHighlight } from "@/lib/transform-code";
import { BlockProvider } from "@/providers/block-provider";
import { BlockPreview, BlockControls, BlockCode } from "@/components/blocks";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { constructMetadata, absoluteUrl } from "@/config/site";
import { ChevronRight } from "lucide-react";

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
  const { raw: code, highlighted: highlightedCode } = mainFile
    ? await getBlockCodeWithHighlight(mainFile.path)
    : { raw: "", highlighted: "" };

  // Extract file name for display (use target if available, otherwise derive from path)
  const fileName = mainFile?.target || mainFile?.path?.split("/").pop() || "component.tsx";

  const primaryCategory = block.categories[0];

  return (
    <BlockProvider block={serializableBlock}>
      <div className="container mx-auto border-x">
        {/* Compact Header: Breadcrumb + Title inline */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground border-b p-4">
          <Link href="/blocks" className="hover:text-foreground">
            Blocks
          </Link>
          <span><ChevronRight className="size-4" /></span>
          {primaryCategory && (
            <Link
              href={`/blocks?category=${primaryCategory.name}`}
              className="hover:text-foreground"
            >
              {primaryCategory.title}
            </Link>
          )}
          <span><ChevronRight className="size-4" /></span>
          <span className="font-medium text-foreground">{block.title}</span>
        </div>

        {/* Preview & Code */}
        <Tabs defaultValue="preview" className="gap-0">
          <div className="flex flex-col lg:flex-row lg:flex-nowrap items-start lg:items-center justify-between p-4">
            {/* Line 1: Component name */}
            <h1 className="text-lg font-semibold mb-3 md:mb-0">{block.title}</h1>

            {/* Line 2: Toolbar */}
            <div className="w-full md:w-fit">
              <BlockControls />
            </div>
          </div>
          <TabsContent value="preview">
            <BlockPreview />
          </TabsContent>

          <TabsContent value="code">
            <BlockCode code={code} highlightedCode={highlightedCode} fileName={fileName} />
          </TabsContent>
        </Tabs>
      </div>
    </BlockProvider>
  );
}

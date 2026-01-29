import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { readFile } from "fs/promises";
import { getBlock, getBlocks } from "@/lib/registry";
import { getBlockCodeWithHighlight } from "@/lib/transform-code";
import { BlockProvider, type FileCodeData } from "@/providers/block-provider";
import {
  BlockPreview,
  BlockControls,
  BlockCodeExplorer,
  BlockDocs,
} from "@/components/blocks";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  constructMetadata,
  absoluteUrl,
  generateBlockKeywords,
} from "@/config/site";
import { ChevronRight } from "lucide-react";
import { BlockDetailJsonLd } from "@/components/json-ld";
import { serialize } from "next-mdx-remote/serialize";

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

  // Generate block-specific keywords
  const keywords = generateBlockKeywords(block.title, categoryTitle);

  return constructMetadata({
    title: `${block.title} - ${categoryTitle} Block`,
    description: `${block.description} A fully customizable and responsive ${categoryTitle.toLowerCase()} component built with Shadcn UI and Tailwind CSS. Preview and copy the code.`,
    image: block.image || "/og-image.png",
    keywords,
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

  // Load code for ALL files at build time
  const filesCode: FileCodeData[] = await Promise.all(
    (block.files || []).map(async (file) => {
      const { raw, highlighted } = await getBlockCodeWithHighlight(file.path);
      return {
        path: file.path,
        code: raw,
        highlightedCode: highlighted,
        fileName: file.target || file.path.split("/").pop() || "file",
      };
    }),
  );

  // Load documentation if exists
  const docsPath = `docs/blocks/${block.name}.md`;
  let docs: string | null = null;
  let mdxSource = null;
  try {
    docs = await readFile(docsPath, "utf-8");

    mdxSource = await serialize(docs);
    console.log(mdxSource);
  } catch {
    // No docs file, that's ok
  }

  const primaryCategory = block.categories[0];

  // Prepare block data for JSON-LD
  const blockJsonLdData = {
    name: block.name,
    title: block.title,
    description: block.description,
    category: primaryCategory?.title || "Component",
    categorySlug: primaryCategory?.name || "component",
    image: block.image,
  };

  return (
    <BlockProvider block={serializableBlock} filesCode={filesCode} docs={docs}>
      <BlockDetailJsonLd block={blockJsonLdData} />
      <div className="container mx-auto border-x">
        {/* Compact Header: Breadcrumb + Title inline */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground border-b p-4">
          <Link href="/blocks" className="hover:text-foreground">
            Blocks
          </Link>
          <span>
            <ChevronRight className="size-4" />
          </span>
          {primaryCategory && (
            <Link
              href={`/blocks?category=${primaryCategory.name}`}
              className="hover:text-foreground"
            >
              {primaryCategory.title}
            </Link>
          )}
          <span>
            <ChevronRight className="size-4" />
          </span>
          <span className="font-medium text-foreground">{block.title}</span>
        </div>

        {/* Preview & Code & Docs */}
        <Tabs defaultValue="preview" className="gap-0">
          <div className="flex flex-col lg:flex-row lg:flex-nowrap items-start lg:items-center justify-between p-4">
            {/* Line 1: Component name */}
            <h1 className="text-lg font-semibold mb-3 md:mb-0">
              {block.title}
            </h1>

            {/* Line 2: Toolbar */}
            <div className="w-full md:w-fit">
              <BlockControls hasDocs={!!mdxSource} />
            </div>
          </div>
          <TabsContent value="preview">
            <BlockPreview />
          </TabsContent>

          <TabsContent value="code">
            <BlockCodeExplorer />
          </TabsContent>
          {mdxSource && (
            <TabsContent value="docs">
              <BlockDocs mdxSource={mdxSource} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </BlockProvider>
  );
}

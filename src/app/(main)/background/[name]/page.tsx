import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBackgroundBlock, getBackgroundBlocks } from "@/lib/registry";
import { getBlockCode } from "@/lib/transform-code";
import { BlockProvider } from "@/providers/block-provider";
import { BlockPreview, BlockControls, BlockCode } from "@/components/blocks";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { constructMetadata, absoluteUrl } from "@/config/site";
import { ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  const backgrounds = getBackgroundBlocks();
  return backgrounds.map((background) => ({ name: background.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const background = getBackgroundBlock(name);

  if (!background) {
    return constructMetadata({
      title: "Background Not Found",
      description: "The requested background could not be found.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${background.title} - Background Pattern`,
    description: `${background.description} A fully customizable background pattern built with Tailwind CSS. Preview and copy the code.`,
    image: background.image || "/og-image.png",
    alternates: {
      canonical: absoluteUrl(`/background/${background.name}`),
    },
    openGraph: {
      type: "article",
    },
  });
}

export default async function BackgroundPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const background = getBackgroundBlock(name);

  if (!background) {
    notFound();
  }

  // Extract only serializable data (exclude component function)
  const { component, ...serializableBackground } = background;

  // Get code from main component file (path is already full path from registry.json)
  const mainFile = background.files?.[0];
  const code = mainFile ? await getBlockCode(mainFile.path) : "";

  return (
    <BlockProvider block={serializableBackground} previewBasePath="/blocks">
      <div className="container mx-auto border-x">
        {/* Compact Header: Breadcrumb + Title inline */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground border-b p-4">
          <Link href="/background" className="hover:text-foreground">
            Backgrounds
          </Link>
          <span>
            <ChevronRight className="size-4" />
          </span>
          <span className="font-medium text-foreground">{background.title}</span>
        </div>

        {/* Preview & Code */}
        <Tabs defaultValue="preview" className="gap-0">
          <div className="flex flex-col lg:flex-row lg:flex-nowrap items-start lg:items-center justify-between p-4">
            {/* Line 1: Component name */}
            <h1 className="text-lg font-semibold mb-3 md:mb-0">
              {background.title}
            </h1>

            {/* Line 2: Toolbar */}
            <div className="w-full md:w-fit">
              <BlockControls />
            </div>
          </div>
          <TabsContent value="preview">
            <BlockPreview />
          </TabsContent>

          <TabsContent value="code">
            <BlockCode code={code} />
          </TabsContent>
        </Tabs>
      </div>
    </BlockProvider>
  );
}

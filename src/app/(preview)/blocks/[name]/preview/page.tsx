import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getBlock, getBlocks } from "@/lib/registry";
import { PreviewThemeHandler } from "@/components/blocks";
import { constructMetadata } from "@/config/site";

interface PreviewPageProps {
  params: Promise<{ name: string }>;
}

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

  return constructMetadata({
    title: block ? `${block.title} Preview` : "Preview",
    description: block?.description || "Block preview",
    noIndex: true, // Preview pages should not be indexed
  });
}

export default async function PreviewPage(props: PreviewPageProps) {
  const params = await props.params;
  const { name } = params;

  const blockDetails = getBlock(name);

  if (!blockDetails || !blockDetails.component) {
    notFound();
  }

  const Component = blockDetails.component;

  return (
    <>
      <PreviewThemeHandler />
      <div className="bg-background text-foreground min-h-screen">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          }
        >
          <Component />
        </Suspense>
      </div>
    </>
  );
}

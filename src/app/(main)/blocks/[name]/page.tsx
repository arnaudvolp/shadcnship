import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlock, getBlocks } from "@/lib/registry";
import { getBlockCode } from "@/lib/transform-code";
import { BlockProvider } from "@/components/blocks/block-provider";
import { BlockPreview } from "@/components/blocks/block-preview";
import { BlockControls } from "@/components/blocks/block-controls";
import { BlockCode } from "@/components/blocks/block-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export async function generateStaticParams() {
  const blocks = getBlocks();
  return blocks.map((block) => ({ name: block.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const block = getBlock(name);

  if (!block) {
    return {
      title: "Block Not Found",
      description: "The requested block could not be found.",
    };
  }

  const primaryCategory = block.categories[0];

  return {
    title: `${block.title} - ${primaryCategory?.title || "Block"}`,
    description: block.description || "",
  };
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

  // Extract only serializable data (exclude component and layout functions)
  const { component, layout, ...serializableBlock } = block;

  // Get code from main component file
  const mainFile = block.files?.[0]; // First file is the main component
  const code = mainFile
    ? await getBlockCode(`src/registry/blocks/${block.name}/${mainFile.path}`)
    : "";

  const primaryCategory = block.categories[0];

  return (
    <BlockProvider block={serializableBlock}>
      <div className="container mx-auto py-12 border-x px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/blocks" className="hover:text-foreground">
            Blocks
          </Link>
          <span>/</span>
          {primaryCategory && <span>{primaryCategory.title}</span>}
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{block.title}</h1>
          {block.description && (
            <p className="text-xl text-muted-foreground">{block.description}</p>
          )}

          {/* Categories */}
          {block.categories && block.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {block.categories.map((category) => (
                <span
                  key={category.name}
                  className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                >
                  {category.icon} {category.title}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Preview & Code */}
        <Tabs defaultValue="preview" className="mb-12">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <BlockControls />
          </div>

          <TabsContent value="preview" className="mt-6">
            <BlockPreview />
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            <BlockCode code={code} />
          </TabsContent>
        </Tabs>

        {/* Installation */}
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Install via CLI:
              </p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">
                  npx shadcn@latest add{" "}
                  {process.env.NEXT_PUBLIC_REGISTRY_URL ||
                    "https://your-registry.com"}
                  /r/{block.name}.json
                </code>
              </pre>
            </div>

            {block.dependencies && block.dependencies.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Dependencies:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  {block.dependencies.map((dep) => (
                    <li key={dep}>{dep}</li>
                  ))}
                </ul>
              </div>
            )}

            {block.registryDependencies &&
              block.registryDependencies.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Shadcn Components:</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    {block.registryDependencies.map((dep) => (
                      <li key={dep}>{dep}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </BlockProvider>
  );
}

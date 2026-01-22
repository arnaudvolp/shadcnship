import { getBackgroundBlocks } from "@/lib/registry";
import { BackgroundsGrid } from "@/components/backgrounds";
import { BlocksEmpty } from "@/components/blocks";
import type { SerializableRegistryBlock } from "@/types/blocks";
import { constructMetadata, absoluteUrl } from "@/config/site";

export const metadata = constructMetadata({
  title: "Browse All Backgrounds",
  description:
    "Explore our collection of beautiful, reusable background patterns and effects. Preview live demos and copy code with one click.",
  alternates: {
    canonical: absoluteUrl("/background"),
  },
});

export default function BackgroundsPage() {
  const backgrounds = getBackgroundBlocks();

  // Convert backgrounds to serializable format (remove component function)
  const serializableBackgrounds: SerializableRegistryBlock[] = backgrounds.map(
    ({ component, ...rest }) => rest
  );

  return (
    <div className="container mx-auto py-12 border-x px-4">
      {backgrounds.length === 0 ? (
        <BlocksEmpty />
      ) : (
        <BackgroundsGrid backgrounds={serializableBackgrounds} />
      )}
    </div>
  );
}

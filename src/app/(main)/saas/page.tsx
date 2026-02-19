import { getSaasBlocks } from "@/lib/registry";
import { SaasGrid } from "@/components/saas";
import { BlocksEmpty } from "@/components/blocks";
import type { SerializableRegistryBlock } from "@/types/blocks";
import { constructMetadata, absoluteUrl } from "@/config/site";

export const metadata = constructMetadata({
  title: "Browse SaaS Blocks",
  description:
    "Explore our collection of SaaS-ready blocks and components. Waitlist forms, authentication, and more. Preview live demos and copy code with one click.",
  alternates: {
    canonical: absoluteUrl("/saas"),
  },
});

export default function SaasPage() {
  const blocks = getSaasBlocks();

  // Convert blocks to serializable format (remove component function)
  const serializableBlocks: SerializableRegistryBlock[] = blocks.map(
    ({ component, ...rest }) => rest
  );

  return (
    <div className="container mx-auto py-12 border-x px-4">
      {blocks.length === 0 ? (
        <BlocksEmpty />
      ) : (
        <SaasGrid blocks={serializableBlocks} />
      )}
    </div>
  );
}

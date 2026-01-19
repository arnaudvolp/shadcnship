import { constructMetadata, absoluteUrl } from "@/config/site";
import { Hero04 } from "@/registry/blocks/hero-04/hero";
import { ArrowUpRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Beautiful Shadcn UI Blocks & Components",
  description:
    "Explore a curated collection of customized Shadcn UI blocks and components. Preview, customize, and copy ready-to-use code snippets to streamline your Next.js development workflow.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
});

export default function Home() {
  return <div className="container mx-auto">
    <Hero04
    badge={{
      text: "Copy, paste, ship 🚢",
    }}
    heading="Ship landing pages faster with Shadcn UI Blocks"
    description="25+ production-ready components. Hero sections, pricing tables, FAQ, testimonials. Copy, customize, ship fast."
    buttons={{
      primary: { text: "Browse Components", url: "/blocks",icon: <ArrowUpRight className="size-4" /> },
      secondary: { text: "View Documentation", url: "/blocks" },
    }}
    />
  </div>;
}

import { constructMetadata, absoluteUrl } from "@/config/site";
import { Landing } from "@/components/landing/landing";

export const metadata = constructMetadata({
  title: "Beautiful Shadcn UI Blocks & Components",
  description:
    "Explore a curated collection of customized Shadcn UI blocks and components. Preview, customize, and copy ready-to-use code snippets to streamline your Next.js development workflow.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
});

export default function Home() {
  return (
    <>
      <Landing />
    </>
  );
}

import { constructMetadata, absoluteUrl } from "@/config/site";
import { Landing } from "@/components/landing/landing";
import { HomePageJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata = constructMetadata({
  title: "Production Ready Shadcn UI & Tailwind Blocks",
  description:
    "Browse 30+ production-ready blocks built with Shadcn UI. Copy the code, start building your project, and ship in hours instead of weeks.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
});

// FAQ items for JSON-LD
const faqs = [
  {
    question: "What exactly is ShadcnShip?",
    answer:
      "ShadcnShip is a collection of production-ready UI blocks built with shadcn/ui, Tailwind CSS, and TypeScript. Think of it as a library of pre-built sections (heroes, pricing tables, CTAs, FAQs, etc.) that you can copy directly into your project and customize to your needs.",
  },
  {
    question: "Which React frameworks are compatible?",
    answer:
      "All of them! ShadcnShip works with Next.js, Remix, Vite, Astro, Gatsby, and any React-based framework. As long as you have Tailwind CSS configured, you can use these blocks. They're just React components—no vendor lock-in or special dependencies.",
  },
  {
    question: "How do I install a block?",
    answer:
      "Two ways: use our one-command npx installer to add blocks directly to your project, or simply copy and paste the code from our website. Either way, you own the code completely and can modify it however you like.",
  },
  {
    question: "Are these blocks accessible and production-ready?",
    answer:
      "Yes. All blocks are built on Radix UI primitives and follow WAI-ARIA accessibility standards. They're responsive, fully typed with TypeScript, and tested across browsers. Many developers already use them in production apps.",
  },
  {
    question: "Can I use these for commercial projects?",
    answer:
      "Absolutely. ShadcnShip is MIT licensed, so you can use it freely in personal, client, and commercial projects. No attribution required, no restrictions.",
  },
];

export default function Home() {
  return (
    <>
      <HomePageJsonLd />
      <FaqJsonLd faqs={faqs} />
      <Landing />
    </>
  );
}

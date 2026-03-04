"use client";

import { Hero04 } from "@/registry/blocks/hero-04/hero";
import { Faq01 } from "@/registry/blocks/faq-01/faq";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  Terminal,
  Paintbrush,
  Zap,
  Blocks,
  Users,
} from "lucide-react";
import { BentoLanding } from "@/components/landing/bento-landing";
import { HeroLanding } from "@/components/landing/hero-landing";
import { FeatureLanding } from "@/components/landing/feature-landing";
import { FaqLanding } from "@/components/landing/faq-landing";
import { CtaLanding } from "@/components/landing/cta-landing";

const faqs = [
  {
    question: "What exactly is ShadcnShip?",
    answer:
      "ShadcnShip is a collection of production-ready UI blocks built with shadcn/ui, Tailwind CSS, and TypeScript. Think of it as a library of pre-built sections — heroes, pricing tables, CTAs, FAQs, and more — that you can copy directly into your project and customize to your needs.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes, completely. Every block on ShadcnShip is free to use, copy, and modify — for personal and commercial projects. No login required, no subscription, no hidden fees.",
  },
  {
    question: "Which React frameworks are compatible?",
    answer:
      "All of them. ShadcnShip works with Next.js, Remix, Vite, Astro, Gatsby, and any React-based framework. As long as you have Tailwind CSS configured, you can use these blocks. They're just React components — no vendor lock-in.",
  },
  {
    question: "How do I install a block?",
    answer:
      "Two ways: use the one-command npx installer to add blocks directly to your project, or simply copy and paste the code from the website. Either way, you own the code completely and can modify it however you like.",
  },
  {
    question: "Are these blocks accessible and production-ready?",
    answer:
      "Yes. All blocks are built on Radix UI primitives and follow WAI-ARIA accessibility standards. They're responsive, fully typed with TypeScript, and tested across browsers. Many developers already use them in production apps.",
  },
];

export const Landing = () => {
  return (
    <div className="container mx-auto">
      {/* Hero */}
      <HeroLanding
        badge="50+ Free Blocks"
        heading={
          <>
            Ship your UI faster.
            <br />
            <span>
              Free & <span className="text-muted-foreground">open source.</span>
            </span>
          </>
        }
        description="Production-ready blocks built with Shadcn UI and Tailwind CSS. Copy the code, own it forever, use it on every project."
        buttons={{
          primary: {
            text: "Browse all blocks",
            url: "/blocks",
            icon: <ArrowUpRight className="size-4" />,
          },
          secondary: {
            text: "View on GitHub",
            url: "https://github.com/arnaudvolp/shadcn-ui-blocks",
            icon: <Blocks className="size-4" />,
            openInNewPage: true,
          },
        }}
        className="-mt-14 border-b md:border"
      />

      {/* Features */}
      <FeatureLanding
        label="What's included"
        heading={
          <>
            Everything you need to{" "}
            <span className="text-muted-foreground">build faster</span>
          </>
        }
        className="border-b md:border-x"
      />

      {/* Bento */}
      <BentoLanding
        label="Blocks"
        heading={
          <>
            Browse what&apos;s{" "}
            <span className="text-muted-foreground">available</span>
          </>
        }
        description="All blocks below are free to copy, adapt, and ship in your own projects. No attribution required."
        className="border-b md:border-x"
      />

      {/* FAQ */}
      <FaqLanding items={faqs} className="border-b md:border-x" />

      {/* CTA */}
      <CtaLanding
        label="Start building"
        heading={"Copy. Own. Ship."}
        description={
          "50+ free blocks. No login, no subscription.\nJust code you own."
        }
        primaryButton={{ text: "Browse all blocks", url: "/blocks" }}
        secondaryButton={{
          text: "View on GitHub",
          url: "https://github.com/arnaudvolp/shadcn-ui-blocks",
        }}
        className="md:border-x"
      />
    </div>
  );
};

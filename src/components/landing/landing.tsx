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
import { Separator } from "@/components/ui/separator";
import { Cta04 } from "@/registry/blocks/cta-04/cta";
import { GithubIcon, LogoIcon } from "@/registry/blocks/social-icons/icons";
import { Feature04 } from "@/registry/blocks/feature-04/feature";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export const Landing = () => {
  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Hero04
          badge={{
            text: "New: 30+ blocks available! 🚀",
          }}
          heading="Production-Ready \n Shadcn UI & Tailwind blocks"
          description="Browse 30+ production-ready blocks built with Shadcn UI. Copy the code, start building your project, and ship in hours instead of weeks."
          buttons={{
            primary: {
              text: "Browse Components",
              url: "/blocks",
              icon: <ArrowUpRight className="size-4" />,
            },
            secondary: {
              text: "Star on Github",
              url: "https://github.com/arnaudvolp/shadcn-ui-blocks",
              icon: <GithubIcon />,
              openInNewPage: true,
            },
          }}
          className="-mt-16"
        />
      </motion.div>

      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <Feature04
          className="border-t border-x py-64"
          heading="Ready to use components"
          description="Browse components and blocks you can install with one command. Copy, customize, and ship your project faster."
          features={[
            {
              title: "One-Command Install",
              description:
                "Add any block to your project with a single npx command. No complex setup required.",
              icon: Terminal,
            },
            {
              title: "Copy & Paste Ready",
              description:
                "Own 100% of the code. Copy any component directly into your project with zero dependencies.",
              icon: Copy,
            },
            {
              title: "30+ Ready Blocks",
              description:
                "Hero sections, pricing tables, CTAs, testimonials, FAQs, and more. New blocks added weekly.",
              icon: Blocks,
            },
            {
              title: "Fully Customizable",
              description:
                "Built with Tailwind CSS and Shadcn. Easily modify colors, spacing, and styles to match your brand.",
              icon: Paintbrush,
            },
            {
              title: "Production-Ready",
              description:
                "Responsive, accessible, and fully typed with TypeScript.",
              icon: Zap,
            },
            {
              title: "Open Source",
              description:
                "MIT licensed. Use freely in personal and commercial projects. Join our growing community.",
              icon: Users,
            },
          ]}
        />
      </motion.div>

      {/* Bento Section */}
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <BentoLanding />
      </motion.div>

      {/* FAQ Section */}
      <Separator className="absolute right-0 left-0" />
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        <Faq01
          heading="Still Have Questions?"
          items={[
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
          ]}
          className="border-x border-border"
        />
      </motion.div>

      {/* CTA Section */}
      <Separator className="absolute right-0 left-0" />
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Cta04
          heading="Start Building Your Project "
          description="Browse components and copy production-ready blocks. Customize to your brand and ship your project in hours—not weeks."
          buttons={{
            primary: {
              text: "Explore All Blocks",
              url: "/blocks",
              icon: <ArrowUpRight className="size-4" />,
            },
            secondary: {
              text: "Star on GitHub",
              url: "https://github.com/arnaudvolp/shadcn-ui-blocks",
              icon: <GithubIcon className="size-4" />,
            },
          }}
          icon={<LogoIcon className="size-6 invert dark:invert-0" />}
          className="border-x border-border"
        />
      </motion.div>
    </div>
  );
};

"use client";

import { Hero04 } from "@/registry/blocks/hero-04/hero";
import { Faq01 } from "@/registry/blocks/faq-01/faq";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, LayoutTemplate, Star } from "lucide-react";
import { BentoLanding } from "@/components/landing/bento-landing";
import { Separator } from "@/components/ui/separator";
import { Cta04 } from "@/registry/blocks/cta-04/cta";
import { GithubIcon } from "@/registry/blocks/social-icons/icons";

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
          heading="Free Production Ready Shadcn UI & Tailwind blocks"
          description="Production-ready React.js blocks built with Shadcn UI. Copy the code, customize to your brand, and launch in hours instead of weeks."
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
          heading="Still Have Questions? We've Got You Covered"
          items={[
            {
              question: "How quickly can I actually use these in my project?",
              answer:
                "Literally in minutes. Browse, preview, copy, paste—that's it. No complex setup, no package installations, no learning curve. Just pure, copy-paste code that works immediately. Most developers ship their first block in under 5 minutes.",
            },
            {
              question: "Do I need to be a React expert to use these?",
              answer:
                "Not at all. If you can copy and paste, you can use these blocks. They work with any React project (Next.js, Astro, etc.) that has Tailwind CSS configured. No advanced knowledge required—just paste and customize to match your brand.",
            },
            {
              question: "Can I really make these look like my brand?",
              answer:
                "Absolutely. You own 100% of the code, so you can change everything—colors, fonts, spacing, animations, layouts. These aren't locked templates. They're starting points you can transform into anything that matches your unique style.",
            },
            {
              question:
                "Will these work for production apps, or just prototypes?",
              answer:
                "These are production-ready, battle-tested components. Built on Radix UI and shadcn/ui, they follow accessibility standards, work across all devices, and perform beautifully. Thousands of developers are already using them in live products.",
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
          heading="Ready to Ship Your App Faster?"
          description="Start building with production-ready components. Copy, customize, and ship your next project."
          buttons={{
            primary: {
              text: "Browse Components",
              url: "/blocks",
              icon: <ArrowUpRight className="size-4" />,
            },
            secondary: {
              text: "Start on Github",
              url: "https://github.com/arnaudvolp/shadcn-ui-blocks",
              icon: <GithubIcon className="size-4" />,
            },
          }}
          icon={<LayoutTemplate className="size-6" />}
          className="border-x border-border"
        />
      </motion.div>
    </div>
  );
};

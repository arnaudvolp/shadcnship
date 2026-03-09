"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Animations
// ============================================================================

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

// ============================================================================
// Types & Data
// ============================================================================

interface BentoItem {
  href: string;
  src: string;
  srcDark?: string;
  label: string;
}

const row1 = {
  main: {
    href: "/blocks/hero-02",
    src: "/r/previews/hero-02.webp",
    srcDark: "/r/previews/hero-02-dark.webp",
    label: "Hero",
  },
  side: [
    {
      href: "/blocks/pricing-03",
      src: "/r/previews/pricing-03.webp",
      srcDark: "/r/previews/pricing-03-dark.webp",
      label: "Pricing",
    },
    {
      href: "/blocks/testimonial-02",
      src: "/r/previews/testimonial-02.webp",
      srcDark: "/r/previews/testimonial-02-dark.webp",
      label: "Testimonial",
    },
  ] as [BentoItem, BentoItem],
};

const row2 = {
  side: [
    {
      href: "/blocks/faq-01",
      src: "/r/previews/faq-01.webp",
      srcDark: "/r/previews/faq-01-dark.webp",
      label: "FAQ",
    },
    {
      href: "/blocks/waitlist-01",
      src: "/r/previews/waitlist-01.webp",
      srcDark: "/r/previews/waitlist-01-dark.webp",
      label: "Waitlist",
    },
  ] as [BentoItem, BentoItem],
  main: {
    href: "/blocks/feature-01",
    src: "/r/previews/feature-01.webp",
    srcDark: "/r/previews/feature-01-dark.webp",
    label: "Feature",
  },
};

// Ligne 3 : 3 items égaux
const row3: BentoItem[] = [
  {
    href: "/blocks/team-01",
    src: "/r/previews/team-01.webp",
    srcDark: "/r/previews/team-01-dark.webp",
    label: "Team",
  },
  {
    href: "/blocks/comparison-01",
    src: "/r/previews/comparison-01.webp",
    srcDark: "/r/previews/comparison-01dark.webp",
    label: "Comparison",
  },
  {
    href: "/blocks/login-01",
    src: "/r/previews/login-01.webp",
    srcDark: "/r/previews/login-01-dark.webp",
    label: "Login",
  },
];

// ============================================================================
// Sub-component
// ============================================================================

const BentoCard = ({
  item,
  delay,
  stretch = false,
  className,
}: {
  item: BentoItem;
  delay: number;
  stretch?: boolean;
  className?: string;
}) => (
  <motion.div
    {...fadeUp(delay)}
    className={cn(
      "group overflow-hidden bg-muted/30",
      stretch && "flex h-full flex-col",
      className,
    )}
  >
    <Link
      href={item.href}
      className={cn("block", stretch && "flex h-full flex-col")}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          stretch ? "min-h-0 flex-1" : "aspect-video",
        )}
      >
        <img
          src={item.src}
          alt={item.label}
          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/10" />
      </div>
      <div className="flex shrink-0 items-center justify-between border-t px-4 py-3">
        <span className="text-sm font-medium">{item.label}</span>
        <ArrowUpRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </Link>
  </motion.div>
);

// ============================================================================
// Component
// ============================================================================

interface BentoLandingProps {
  label?: string;
  heading?: React.ReactNode;
  description?: string;
  className?: string;
}

const BentoLanding = ({
  label = "Blocks",
  heading = (
    <>
      See what ships with your{" "}
      <span className="text-muted-foreground">license</span>
    </>
  ),
  description = "Every component you see below is in your codebase the day you purchase.",
  className,
}: BentoLandingProps) => {
  return (
    <section
      className={cn("container mx-auto py-16 md:py-24 lg:py-32", className)}
    >
      {/* Header */}
      <div className="mb-16 text-center">
        <motion.p
          {...fadeUp(0)}
          className="mb-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase"
        >
          {label}
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl"
        >
          {heading}
        </motion.h2>
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-4 max-w-xl text-muted-foreground"
        >
          {description}
        </motion.p>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col divide-y divide-border border border-border">
        <div className="grid grid-cols-1 divide-x divide-border lg:grid-cols-3 lg:items-stretch">
          <div className="flex lg:col-span-2">
            <BentoCard
              item={row1.main}
              delay={0.1}
              stretch
              className="flex-1"
            />
          </div>
          <div className="flex flex-col divide-y divide-border">
            {row1.side.map((item, i) => (
              <BentoCard key={item.href} item={item} delay={0.15 + i * 0.06} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 divide-x divide-border lg:grid-cols-3 lg:items-stretch">
          <div className="flex flex-col divide-y divide-border">
            {row2.side.map((item, i) => (
              <BentoCard key={item.href} item={item} delay={0.2 + i * 0.06} />
            ))}
          </div>
          <div className="flex lg:col-span-2">
            <BentoCard
              item={row2.main}
              delay={0.22}
              stretch
              className="flex-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 divide-x divide-border md:grid-cols-3">
          {row3.map((item, i) => (
            <BentoCard key={item.href} item={item} delay={0.3 + i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { BentoLanding };
export type { BentoLandingProps };

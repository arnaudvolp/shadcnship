"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Animations
// ============================================================================

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

// ============================================================================
// Types
// ============================================================================

interface Feature {
  id: string;
  title: string;
  description: string;
  badge?: string;
  href?: string;
  image: string;
  imageAlt?: string;
}

interface FeatureLandingProps {
  label?: string;
  heading?: React.ReactNode;
  features?: Feature[];
  className?: string;
}

// ============================================================================
// Default features
// ============================================================================

const defaultFeatures: Feature[] = [
  {
    id: "blocks",
    title: "Ready-to-use blocks",
    description:
      "50+ pre-built sections for hero, pricing, features, testimonials and more. Copy the code and ship in minutes.",
    href: "/blocks",
    image: "/images/landing/light.webp",
    imageAlt: "Ready-to-use blocks preview",
  },
  {
    id: "supabase",
    title: "Supabase connected",
    description:
      "Auth, database and storage already wired up. Drop in a connected block and your backend is done.",
    badge: "New",
    href: "/blocks?supabase=true",
    image: "/images/landing/supabase.webp",
    imageAlt: "Supabase connected preview",
  },
  {
    id: "darkmode",
    title: "Dark mode ready",
    description:
      "Every component supports light and dark mode out of the box. No extra configuration needed.",
    image: "/images/landing/dark.webp",
    imageAlt: "Dark mode preview",
  },
  {
    id: "customizable",
    title: "Fully customizable",
    description:
      "You own the code. Tweak colors, spacing, and layout to match your brand perfectly.",
    image: "/images/landing/custom.webp",
    imageAlt: "Customizable preview",
  },
];

// ============================================================================
// Component
// ============================================================================

const FeatureLanding = ({
  label = "Features",
  heading = (
    <>
      Everything you need to{" "}
      <span className="text-muted-foreground">ship faster</span>
    </>
  ),
  features = defaultFeatures,
  className,
}: FeatureLandingProps) => {
  const [activeId, setActiveId] = useState(features[0].id);
  const activeFeature = features.find((f) => f.id === activeId)!;

  return (
    <section
      className={cn("container mx-auto py-16 md:py-24 lg:py-32", className)}
    >
      {/* Header */}
      <div className="mb-16 text-center">
        <motion.p
          {...fadeUp(0)}
          className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
        >
          {label}
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl"
        >
          {heading}
        </motion.h2>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch max-w-5xl mx-auto border-x">
        {/* Left — feature list */}
        <div className="flex flex-col divide-y divide-border border-y">
          {features.map((feature, i) => {
            const isActive = feature.id === activeId;
            return (
              <motion.button
                key={feature.id}
                {...fadeUp(0.1 + i * 0.08)}
                onClick={() => setActiveId(feature.id)}
                className={cn(
                  "group p-6 text-left transition-all duration-300 min-h-36",
                  isActive
                    ? "opacity-100 bg-muted/40"
                    : "opacity-35 hover:opacity-60 hover:bg-muted/20",
                )}
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-lg font-medium">{feature.title}</span>
                  {feature.badge && (
                    <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                      {feature.badge}
                    </span>
                  )}
                  {feature.href && isActive && (
                    <a
                      href={feature.href}
                      onClick={(e) => e.stopPropagation()}
                      className="ml-auto flex items-center gap-1 text-sm underline underline-offset-4 hover:no-underline"
                    >
                      Learn more <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Right — image */}
        <motion.div
          {...fadeUp(0.2)}
          className="lg:sticky lg:top-24 lg:self-start h-full"
        >
          <div className="relative overflow-hidden border border-r-0 bg-muted/30 h-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeId}
                src={activeFeature.image}
                alt={activeFeature.imageAlt ?? activeFeature.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
                className="h-full w-full object-cover object-top"
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { FeatureLanding };
export type { FeatureLandingProps, Feature };

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const GRID = 80;

// ============================================================================
// Grid background
// ============================================================================

const GridBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0, cellW: 0, cellH: 0 });

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      const cols = Math.max(1, Math.round(width / GRID));
      const rows = Math.max(1, Math.round(height / GRID));
      setGrid({ cols, rows, cellW: width / cols, cellH: height / rows });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { cols, rows, cellW, cellH } = grid;
  const total = cols * rows;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {total > 0 && (
        <div
          className="h-full w-full"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${cellW}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellH}px)`,
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="border-r border-b border-white/6" />
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Types
// ============================================================================

interface CtaLandingProps {
  label?: string;
  heading?: string;
  description?: string;
  primaryButton?: { text: string; url: string };
  secondaryButton?: { text: string; url: string };
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

const CtaLanding = ({
  label = "Ready to ship?",
  heading = "Stop rebuilding.\nStart shipping.",
  description = "Already connected to Supabase, Stripe, and Resend. Copy the code, own it forever, use it on every project.",
  primaryButton = { text: "Get ShadcnShip Pro", url: "#pricing" },
  secondaryButton = { text: "Browse free blocks", url: "/blocks" },
  className,
}: CtaLandingProps) => (
  <section className={cn("w-full", className)}>
    <div className="relative bg-zinc-950 text-white overflow-hidden py-16 md:py-24 lg:py-32  flex items-center justify-center">
      <GridBackground />

      <div className="relative z-10 w-full flex flex-col items-center text-center gap-8 px-6 container mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-sm font-semibold uppercase tracking-widest text-white/40"
        >
          {label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl xl:text-7xl whitespace-pre-line max-w-3xl"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
          className="text-base text-white/50 leading-relaxed whitespace-pre-line max-w-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full px-8"
            asChild
          >
            <a href={primaryButton.url}>
              {primaryButton.text}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full px-8 text-white/60 hover:text-white hover:bg-white/10"
            asChild
          >
            <a href={secondaryButton.url}>{secondaryButton.text}</a>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

export { CtaLanding };
export type { CtaLandingProps };

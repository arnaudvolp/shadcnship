"use client";
import { motion } from "framer-motion";
// ============================================================================
// Animations
// ============================================================================

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

export default function TemplatePage() {
  return (
    <div className="container mx-auto flex min-h-[800px] w-full items-center justify-center border-x">
      <motion.h2
        {...fadeUp(0.1)}
        className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl"
      >
        Work in progress.{" "}
        <span className="text-muted-foreground">Coming soon</span>
      </motion.h2>
    </div>
  );
}

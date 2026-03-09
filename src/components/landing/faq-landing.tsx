"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
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

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqLandingProps {
  label?: string;
  heading?: React.ReactNode;
  items?: FaqItem[];
  className?: string;
}

// ============================================================================
// Default data
// ============================================================================

const defaultItems: FaqItem[] = [
  {
    question: "What is the difference between the free and Pro versions?",
    answer:
      "The free version offers static UI blocks that can be copied and pasted. The Pro version includes components directly connected to Supabase, Stripe, and Resend — ready to work with real data, without any additional configuration.",
  },
  {
    question: "How many projects can I use my license for?",
    answer:
      "Unlimited projects. With a single purchase, you can use ShadcnShip Pro on all your personal and commercial projects.",
  },
  {
    question: "Do I really own the code?",
    answer:
      "Yes, 100%. You copy the components into your project, and they become part of your codebase. No dependencies on ShadcnShip, no lock-in.",
  },
  {
    question: "What services are supported?",
    answer:
      "Supabase (auth + database), Stripe and Lemon Squeezy (billing), Resend (email). Other integrations are added regularly — you receive them automatically.",
  },
  {
    question: "What if I'm not satisfied?",
    answer:
      "30-day money-back guarantee, no questions asked. If you don't think ShadcnShip Pro is worth it, send us an email and you'll get a full refund.",
  },
];

// ============================================================================
// Component
// ============================================================================

const FaqLanding = ({
  label = "FAQ",
  heading = (
    <>
      Still have <span className="text-muted-foreground">questions?</span>
    </>
  ),
  items = defaultItems,
  className,
}: FaqLandingProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      className={cn(
        "container mx-auto py-16 md:py-24 px-6 md:px-12",
        className,
      )}
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

      {/* Accordion */}
      <div className="mx-auto max-w-3xl border-t border-border">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              {...fadeUp(0.05 + i * 0.06)}
              className="border-b border-border"
            >
              <button
                onClick={() => toggle(i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-base font-medium">{item.question}</span>
                <span className="shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                  {isOpen ? (
                    <Minus className="size-4" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" as const }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export { FaqLanding };
export type { FaqLandingProps, FaqItem };

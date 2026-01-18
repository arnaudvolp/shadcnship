"use client";

import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface Faq02Props {
  label?: string;
  heading?: string;
  description?: string;
  items?: FaqItem[];
  className?: string;
}

const defaultItems: FaqItem[] = [
  {
    question: "What is this component library?",
    answer: "A collection of production-ready UI blocks built with shadcn/ui and Tailwind CSS.",
  },
  {
    question: "Is it free to use?",
    answer: "Yes, all components are free and open source for personal and commercial use.",
  },
  {
    question: "Can I customize the components?",
    answer: "Absolutely! You own the code and can customize every aspect to match your brand.",
  },
  {
    question: "What dependencies are required?",
    answer: "Components are built on shadcn/ui and Tailwind CSS with some Radix UI primitives.",
  },
  {
    question: "How do I get started?",
    answer: "Browse the components, copy the code, and paste it into your project. No setup required.",
  },
  {
    question: "Is TypeScript supported?",
    answer: "Yes, all components are written in TypeScript with full type safety.",
  },
];

const Faq02 = ({
  label = "FAQ",
  heading = "Frequently Asked Questions",
  description,
  items = defaultItems,
  className,
}: Faq02Props) => (
  <section className={cn("py-12 md:py-24", className)}>
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <div className="mb-12 text-center">
        {label && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
        )}
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          {heading}
        </h2>
        {description && (
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      <Accordion type="multiple" className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="relative h-fit rounded-md border-0 bg-muted/50 px-6 data-[state=open]:bg-muted"
          >
            <AccordionTrigger className="group flex items-center justify-between gap-4 py-5 text-left text-lg font-medium hover:no-underline">
              {item.question}
              <span className="absolute right-4 flex size-8 shrink-0 items-center justify-center rounded-full bg-background shadow-sm z-10" >
                <Plus className="size-4 text-muted-foreground group-data-[state=open]:hidden" />
                <X className="hidden size-4 text-muted-foreground group-data-[state=open]:block" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-muted-foreground text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export { Faq02 };

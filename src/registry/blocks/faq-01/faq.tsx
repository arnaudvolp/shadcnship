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

interface Faq01Props {
  label?: string;
  heading?: string;
  description?: string;
  items?: FaqItem[];
  className?: string;
}

const defaultItems: FaqItem[] = [
  {
    question: "What is this component library?",
    answer: "A collection of production-ready UI blocks built with shadcn/ui and Tailwind CSS. Copy, paste, and customize to build faster.",
  },
  {
    question: "Is it free to use?",
    answer: "Yes, all components are free and open source. Use them in personal and commercial projects without restrictions.",
  },
  {
    question: "Can I customize the components?",
    answer: "Absolutely! Since you own the code, you can customize every aspect. Change colors, sizes, animations, and more to match your brand.",
  },
  {
    question: "What dependencies are required?",
    answer: "Components are built on shadcn/ui and Tailwind CSS. Some components may require additional dependencies like Radix UI primitives.",
  },
];

const Faq01 = ({
  label = "FAQ",
  heading = "Frequently Asked Questions",
  description,
  items = defaultItems,
  className,
}: Faq01Props) => (
  <section className={cn("container mx-auto py-12 md:py-24", className)}>
    <div className="px-6 md:px-12">
      <div className="text-center">
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
      <Accordion type="single" collapsible className="mt-12 space-y-4 max-w-5xl mx-auto">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="relative rounded-md border-0 bg-muted/50 px-6 data-[state=open]:bg-muted"
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

export { Faq01 };

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
  title: string;
  description: string;
}

interface Faq01Props {
  label?: string;
  title?: string;
  description?: string;
  items?: FaqItem[];
  className?: string;
}

const defaultItems: FaqItem[] = [
  {
    title: "What is this component library?",
    description:
      "A collection of production-ready UI blocks built with shadcn/ui and Tailwind CSS. Copy, paste, and customize to build faster.",
  },
  {
    title: "Is it free to use?",
    description:
      "Yes, all components are free and open source. Use them in personal and commercial projects without restrictions.",
  },
  {
    title: "Can I customize the components?",
    description:
      "Absolutely! Since you own the code, you can customize every aspect. Change colors, sizes, animations, and more to match your brand.",
  },
  {
    title: "What dependencies are required?",
    description:
      "Components are built on shadcn/ui and Tailwind CSS. Some components may require additional dependencies like Radix UI primitives.",
  },
];

const Faq01 = ({
  label = "FAQ",
  title = "Common Questions",
  description,
  items = defaultItems,
  className,
}: Faq01Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <div className="flex flex-col items-center gap-4 text-center">
      {label && (
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
      )}
      <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
    <Accordion
      type="single"
      collapsible
      className="mx-auto mt-12 flex max-w-5xl flex-col gap-4"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="relative rounded-md border-0 bg-muted/50 px-6 data-[state=open]:bg-muted"
        >
          <AccordionTrigger className="group flex items-center justify-between gap-4 py-5 text-left text-lg font-medium hover:no-underline">
            {item.title}
            <span className="absolute right-4 z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
              <Plus className="size-4 text-muted-foreground group-data-[state=open]:hidden" />
              <X className="hidden size-4 text-muted-foreground group-data-[state=open]:block" />
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-base text-muted-foreground">
            {item.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default Faq01;

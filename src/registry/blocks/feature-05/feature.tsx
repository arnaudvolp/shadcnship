"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LucideIcon,
  Copy,
  SquareDashedMousePointer,
  TypeOutline,
  Info,
} from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
}

interface Feature05Props {
  heading?: string;
  description?: string;
  features?: FeatureItem[];
  className?: string;
}

const Feature05 = ({
  heading = "Everything You Need to Build Faster",
  description = "Production-ready blocks built with shadcn/ui and Tailwind CSS. Copy, customize, and ship.",
  features = [
    {
      title: "Copy & Paste Ready",
      description:
        "Every component is ready to use. Just copy the code and paste it into your project.",
      icon: Copy,
      image: "https://www.shadcnship.com/images/image-preview.webp",
    },
    {
      title: "Fully Customizable",
      description:
        "Built with Tailwind CSS, every component can be easily modified to match your brand.",
      icon: SquareDashedMousePointer,
      image: "https://www.shadcnship.com/images/image-preview.webp",
    },
    {
      title: "TypeScript First",
      description:
        "All components are fully typed with TypeScript for better developer experience.",
      icon: TypeOutline,
      image: "https://www.shadcnship.com/images/image-preview.webp",
    },
    {
      title: "Accessible by Default",
      description:
        "Built on Radix UI primitives, all components follow WAI-ARIA guidelines.",
      icon: Info,
      image: "https://www.shadcnship.com/images/image-preview.webp",
    },
  ],
  className,
}: Feature05Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = features[activeIndex]?.image || features[0]?.image;

  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
              {heading}
            </h2>
            {description && (
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
            )}
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="mt-8"
              onValueChange={(value) => {
                const index = parseInt(value.replace("item-", ""), 10);
                if (!isNaN(index)) setActiveIndex(index);
              }}
            >
              {features.map((feature, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="gap-4 text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      {feature.icon && (
                        <feature.icon
                          className="size-5 shrink-0 text-muted-foreground"
                          strokeWidth={1.5}
                        />
                      )}
                      <span className="font-medium">{feature.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className={feature.icon ? "pl-8" : ""}>
                      {feature.description}
                    </p>
                    <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-accent lg:hidden">
                      {feature.image && (
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="size-full object-cover"
                        />
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative hidden lg:block">
            <div className="sticky top-24 aspect-square overflow-hidden rounded-lg h-full border bg-accent">
              {activeImage && (
                <img
                  src={activeImage}
                  alt="Feature illustration"
                  className="size-full object-cover "
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature05 };

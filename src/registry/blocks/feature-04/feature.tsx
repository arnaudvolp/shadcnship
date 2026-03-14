import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  MessageCircle,
  Copy,
  LayoutTemplate,
  SquareDashedMousePointer,
  Gauge,
} from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature04Props {
  title?: string;
  description?: string;
  features?: FeatureItem[];
  className?: string;
}

const Feature04 = ({
  title = "Everything You Need to Build Faster",
  description = "Production-ready blocks built with shadcn/ui and Tailwind CSS. Copy, customize, and ship.",
  features = [
    {
      title: "Copy & Paste Ready",
      description:
        "Copy any component directly into your project. No dependencies, just pure code you own.",
      icon: <Copy />,
    },
    {
      title: "Pre-built Templates",
      description:
        "Start with production-ready templates for common layouts and patterns.",
      icon: <LayoutTemplate />,
    },
    {
      title: "Developer Experience",
      description:
        "Built with TypeScript, fully typed, and optimized for modern frameworks.",
      icon: <Sparkles />,
    },
    {
      title: "Fully Customizable",
      description:
        "Every component is built with Tailwind CSS. Modify styles easily.",
      icon: <SquareDashedMousePointer />,
    },
    {
      title: "Performance Optimized",
      description:
        "Lightweight components with zero runtime overhead. Fast load times.",
      icon: <Gauge />,
    },
    {
      title: "Active Community",
      description:
        "Join thousands of developers sharing components and best practices.",
      icon: <MessageCircle />,
    },
  ],
  className,
}: Feature04Props) => {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="container mx-auto px-8">
        <div className="mx-auto flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl leading-tight font-medium tracking-tight text-pretty md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground md:text-lg">{description}</p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex flex-col gap-4 p-4 shadow-none"
            >
              <div className="flex size-12 items-center justify-center rounded-md border text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature04;

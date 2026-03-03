import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  LucideIcon,
  Copy,
  Sparkles,
  Code2,
  LayoutTemplate,
  Gauge,
} from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
}

interface Feature08Props {
  label?: string;
  heading?: string;
  description?: string;
  features?: FeatureItem[];
  className?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  featured,
}: FeatureItem) => (
  <Card
    className={cn(
      featured
        ? "border-0 bg-linear-to-br from-primary to-primary/70 text-primary-foreground md:col-span-2 lg:col-span-1 lg:row-span-2"
        : "bg-muted dark:bg-background",
      "shadow-none",
    )}
  >
    <CardContent
      className={cn("flex flex-col", featured ? "h-full gap-0" : "gap-4")}
    >
      <div
        className={cn(
          "flex size-12 items-center justify-center rounded-lg border backdrop-blur-sm",
          featured
            ? "border-white/20 bg-white/10"
            : "border-border/50 bg-background/50",
        )}
      >
        <Icon
          className={cn("size-5", !featured && "text-foreground")}
          strokeWidth={1.5}
        />
      </div>
      <div
        className={cn("flex flex-col gap-2", featured && "mt-auto gap-3 pt-8")}
      >
        <h3 className={cn("font-medium", featured && "text-xl")}>{title}</h3>
        <p className={cn("text-sm", !featured && "text-muted-foreground")}>
          {description}
        </p>
      </div>
    </CardContent>
  </Card>
);

const Feature08 = ({
  label = "Features",
  heading = "Everything You Need to Build Faster",
  description = "Production-ready blocks built with shadcn/ui and Tailwind CSS. Copy, customize, and ship.",
  features = [
    {
      icon: Copy,
      title: "Copy & Paste Ready",
      description:
        "All components are ready to use out of the box. Just copy the code and paste it into your project — no configuration needed.",
      featured: true,
    },
    {
      icon: Sparkles,
      title: "Fully Customizable",
      description:
        "Built with Tailwind CSS, every component is fully customizable to match your brand.",
    },
    {
      icon: Code2,
      title: "TypeScript First",
      description:
        "Written in TypeScript with full type safety and IntelliSense support for better DX.",
    },
    {
      icon: LayoutTemplate,
      title: "Pre-built Templates",
      description:
        "Start with production-ready templates for common layouts and patterns.",
    },
    {
      icon: Gauge,
      title: "Performance Optimized",
      description:
        "Lightweight components with zero runtime overhead and fast load times.",
    },
  ],
  className,
}: Feature08Props) => (
  <section className={cn("px-8 py-12 md:py-24", className)}>
    <div className="container mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
      {label && (
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
      )}
      <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {description && (
        <p className="text-muted-foreground md:text-lg">{description}</p>
      )}
    </div>
    <div className="mx-auto mt-12 grid max-w-5xl gap-2 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  </section>
);

export { Feature08 };

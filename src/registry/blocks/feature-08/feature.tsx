import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Sparkles, Code2, LayoutTemplate, Gauge } from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

interface Feature08Props {
  label?: string;
  title?: string;
  description?: string;
  features?: FeatureItem[];
  className?: string;
}

const FeatureCard = ({ icon, title, description, featured }: FeatureItem) => (
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
        <span
          className={cn(
            "flex items-center justify-center",
            !featured && "text-foreground",
          )}
        >
          {icon}
        </span>
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
  title = "Everything You Need to Build Faster",
  description = "Production-ready blocks built with shadcn/ui and Tailwind CSS. Copy, customize, and ship.",
  features = [
    {
      icon: <Copy className="size-5" />,
      title: "Copy & Paste Ready",
      description:
        "All components are ready to use out of the box. Just copy the code and paste it into your project — no configuration needed.",
      featured: true,
    },
    {
      icon: <Sparkles className="size-5" />,
      title: "Fully Customizable",
      description:
        "Built with Tailwind CSS, every component is fully customizable to match your brand.",
    },
    {
      icon: <Code2 className="size-5" />,
      title: "TypeScript First",
      description:
        "Written in TypeScript with full type safety and IntelliSense support for better DX.",
    },
    {
      icon: <LayoutTemplate className="size-5" />,
      title: "Pre-built Templates",
      description:
        "Start with production-ready templates for common layouts and patterns.",
    },
    {
      icon: <Gauge className="size-5" />,
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
        {title}
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

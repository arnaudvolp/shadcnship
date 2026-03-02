import { ArrowRight, Blocks, Paintbrush, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

interface Feature02Props {
  image?: string;
  heading?: string;
  features?: Feature[];
  className?: string;
}

const Feature02 = ({
  heading = "Everything You Need to Build Faster",
  image,
  features = [
    {
      icon: <Blocks className="size-5" />,
      title: "Copy & Paste Ready",
      description:
        "Copy and paste components into your project. No dependencies, just pure code you own.",
      link: "#",
    },
    {
      icon: <Paintbrush className="size-5" />,
      title: "Fully Customizable",
      description:
        "Every component is built with Tailwind CSS. Adapt colors, spacing, and styles to your brand.",
      link: "#",
    },
    {
      icon: <Zap className="size-5" />,
      title: "Developer Experience",
      description:
        "TypeScript support, dark mode ready, and responsive by default. Focus on your product.",
      link: "#",
    },
  ],
  className,
}: Feature02Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl bg-muted-foreground/30 md:h-80">
      <h2 className="relative z-10 px-4 text-center text-3xl leading-tight font-medium tracking-tight md:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {image && (
        <img
          src={image}
          alt={heading}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>

    <div className="mt-8 grid gap-8 md:grid-cols-3">
      {features.map((feature, i) => (
        <Card key={i} className="flex flex-col gap-4 p-4 shadow-none">
          <div className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
            {feature.icon}
          </div>
          <h3 className="text-xl font-medium">{feature.title}</h3>
          <p className="flex-1 text-sm text-muted-foreground">
            {feature.description}
          </p>
          {feature.link && (
            <a
              href={feature.link}
              className="inline-flex items-center gap-1 text-sm font-medium"
            >
              Learn more
              <ArrowRight className="size-4" />
            </a>
          )}
        </Card>
      ))}
    </div>
  </section>
);

export { Feature02 };

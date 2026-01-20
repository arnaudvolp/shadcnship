import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface Feature {
  badge: string;
  title: string;
  description: string;
  button?: {
    text: string;
    url: string;
  };
}

interface Feature03Props {
  label?: string;
  heading?: string;
  description?: string;
  features?: Feature[];
  className?: string;
}

const Feature03 = ({
  label = "Features",
  heading = "Everything You Need to Build Faster",
  description = "Production-ready blocks built with shadcn/ui and Tailwind CSS. Copy, customize, and ship.",
  features = [
    {
      badge: "Copy & Paste Ready",
      title: "Copy & Paste Ready Everything You Need to Build Faster",
      description: "All components are ready to use. Just copy the code and paste it into your project. All components are ready to use. Just copy the code and paste it into your project.",
      button: { text: "Browse Components", url: "#" },
    },
    {
      badge: "Fully Customizable",
      title: "Fully Customizable",
      description: "Built with Tailwind CSS, every component is fully customizable to match your brand. Built with Tailwind CSS, every component is fully customizable to match your brand.",
      button: { text: "View Docs", url: "#" },
    },
    {
      badge: "TypeScript First",
      title: "TypeScript First",
      description: "Written in TypeScript with full type safety and IntelliSense support for better DX. Written in TypeScript with full type safety and IntelliSense support for better DX.",
      button: { text: "Get Started", url: "#" },
    },
    {
      badge: "Accessible by Default",
      title: "Accessible by Default",
      description: "Built on Radix UI primitives, all components follow WAI-ARIA guidelines.",
      button: { text: "Learn More", url: "#" },
    },
  ],
  className,
}: Feature03Props) => {
  return (
    <section className={cn("container mx-auto py-12 md:py-24", className)}>
      <div className="px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          {label && (
            <p className="text-sm font-semibold uppercase text-muted-foreground">
              {label}
            </p>
          )}
          <h2 className="mt-2 text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-primary">
            {heading}
          </h2>
          {description && (
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="mt-8 md:mt-16 flex flex-col gap-20 mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "overflow-hidden flex flex-col md:flex-row items-center gap-12",
                index % 2 !== 0 && "md:flex-row-reverse"
              )}
            >
              <div className="w-full md:w-1/2 aspect-video border border-border bg-accent rounded-md" />
              <div className="w-full md:w-1/2 space-y-6">
                <p className="text-sm font-semibold uppercase text-muted-foreground">
                  {feature.badge}
                </p>
                <h3 className="text-2xl md:text-3xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">
                  {feature.description}
                </p>
                {feature.button && (
                  <Button className="w-fit py-6" size="lg" asChild>
                    <a href={feature.button.url}>
                      {feature.button.text}
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature03 };

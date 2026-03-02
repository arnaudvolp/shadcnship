import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface Feature {
  badge: string;
  title: string;
  description: string;
  image?: string;
  button?: { text: string; url: string };
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
      image: "https://www.shadcnship.com/images/image-preview.webp",
      badge: "Copy & Paste Ready",
      title: "Copy & Paste Ready Everything You Need to Build Faster",
      description:
        "All components are ready to use. Just copy the code and paste it into your project. All components are ready to use. Just copy the code and paste it into your project.",
      button: { text: "Browse Components", url: "#" },
    },
    {
      image: "https://www.shadcnship.com/images/image-preview.webp",
      badge: "Fully Customizable",
      title: "Fully Customizable",
      description:
        "Built with Tailwind CSS, every component is fully customizable to match your brand. Built with Tailwind CSS, every component is fully customizable to match your brand.",
      button: { text: "View Docs", url: "#" },
    },
    {
      image: "https://www.shadcnship.com/images/image-preview.webp",
      badge: "TypeScript First",
      title: "TypeScript First",
      description:
        "Written in TypeScript with full type safety and IntelliSense support for better DX. Written in TypeScript with full type safety and IntelliSense support for better DX.",
      button: { text: "Get Started", url: "#" },
    },
    {
      image: "https://www.shadcnship.com/images/image-preview.webp",
      badge: "Accessible by Default",
      title: "Accessible by Default",
      description:
        "Built on Radix UI primitives, all components follow WAI-ARIA guidelines.",
      button: { text: "Learn More", url: "#" },
    },
  ],
  className,
}: Feature03Props) => {
  return (
    <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        {label && (
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            {label}
          </p>
        )}
        <h2 className="text-3xl leading-tight font-medium tracking-tight md:text-4xl lg:text-5xl">
          {heading}
        </h2>
        {description && (
          <p className="text-muted-foreground md:text-lg">{description}</p>
        )}
      </div>

      <div className="mx-auto mt-16 flex flex-col gap-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center gap-12 overflow-hidden md:flex-row",
              index % 2 !== 0 && "md:flex-row-reverse",
            )}
          >
            <div className="aspect-video w-full overflow-hidden rounded-md border border-border bg-muted/30 md:w-1/2">
              {feature.image && (
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="size-full object-cover"
                />
              )}
            </div>
            <div className="flex w-full flex-col gap-4 md:w-1/2">
              <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                {feature.badge}
              </p>
              <h3 className="text-2xl font-medium md:text-3xl">
                {feature.title}
              </h3>
              <p className="text-muted-foreground md:text-lg">
                {feature.description}
              </p>
              {feature.button && (
                <Button className="w-fit" size="lg" asChild>
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
    </section>
  );
};

export { Feature03 };

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureItem {
  img?: string;
  title: string;
  description: string;
  link?: { text: string; url: string };
}

interface Feature01Props {
  title: string;
  description?: string;
  features?: FeatureItem[];
  className?: string;
}

const Feature01 = ({
  title = "Everything You Need to Build Faster",
  description = "Production-ready blocks built with shadcn/ui and Tailwind CSS. Copy, customize, and ship.",
  features = [
    {
      img: "/images/placeholders/hero-architecture-1.webp",
      title: "Copy & Paste Ready",
      description:
        "All components are ready to use. Just copy the code and paste it into your project.",
      link: { text: "View More", url: "#" },
    },
    {
      img: "/images/placeholders/hero-architecture-8.webp",
      title: "Fully Customizable",
      description:
        "Built with Tailwind CSS, every component is fully customizable to match your brand.",
      link: { text: "View More", url: "#" },
    },
    {
      img: "/images/placeholders/hero-architecture-3.webp",
      title: "TypeScript First",
      description:
        "Written in TypeScript with full type safety and IntelliSense support for better DX.",
      link: { text: "View More", url: "#" },
    },
  ],
  className,
}: Feature01Props) => {
  return (
    <section className={cn("container mx-auto px-4 py-12 md:py-24", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground md:text-lg">{description}</p>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col gap-0 rounded-2xl p-2 shadow-none"
          >
            <CardHeader className="gap-0 p-0">
              {feature.img && (
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="aspect-4/3 h-full w-auto rounded-lg border"
                />
              )}
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="flex-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
              {feature.link && (
                <Button variant="outline" className="mt-2 w-full">
                  <a href={feature.link.url}>{feature.link.text}</a>
                  <ArrowUpRight />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Feature01;

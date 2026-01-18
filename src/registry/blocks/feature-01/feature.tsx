import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureItem {
  title: string;
  description: string;
  link?: { text: string; url: string };
}

interface Feature01Props {
  heading?: string;
  description?: string;
  features?: FeatureItem[];
  className?: string;
}

const Feature01 = ({
  heading = "Everything You Need to Build Faster",
  description = "Production-ready blocks built with shadcn/ui and Tailwind CSS. Copy, customize, and ship. ",
  features = [
    {
      title: "Copy & Paste Ready",
      description: "All components are ready to use. Just copy the code and paste it into your project.",
      link: { text: "Browse Components", url: "#" },
    },
    {
      title: "Fully Customizable",
      description: "Built with Tailwind CSS, every component is fully customizable to match your brand.",
      link: { text: "View Docs", url: "#" },
    },
    {
      title: "TypeScript First",
      description: "Written in TypeScript with full type safety and IntelliSense support for better DX.",
      link: { text: "Get Started", url: "#" },
    },
  ],
  className,
}: Feature01Props) => {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight ">
            {heading}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col p-4 shadow-none gap-4">
              <div className="aspect-video rounded-lg bg-accent" />
              <h3 className="text-xl font-medium">{feature.title}</h3>
              <p className="flex-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
              {feature.link && (
                <Button variant="ghost" size="sm" className=" w-fit" asChild>
                  <a href={feature.link.url}>
                    {feature.link.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature01 };

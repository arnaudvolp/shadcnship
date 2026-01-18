import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
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
      title: "Copy & Paste Ready",
      description: "All components are ready to use. Just copy the code and paste it into your project.",
    },
    {
      title: "Fully Customizable",
      description: "Built with Tailwind CSS, every component is fully customizable to match your brand.",
    },
    {
      title: "TypeScript First",
      description: "Written in TypeScript with full type safety and IntelliSense support for better DX.",
    },
    {
      title: "Accessible by Default",
      description: "Built on Radix UI primitives, all components follow WAI-ARIA guidelines.",
    },
  ],
  className,
}: Feature03Props) => {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
        <div className="mt-8 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden pt-0 shadow-none">
              <div className="aspect-video bg-accent" />
              <CardContent>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature03 };

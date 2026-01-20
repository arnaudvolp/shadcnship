import { ArrowUpRight, Grid2x2Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  lineColor?: string;
  lineWidth?: number;
}

const GridBackground = ({
  className,
  gridSize = 64,
  lineColor = "var(--border)",
  lineWidth = 1,
}: GridBackgroundProps) => {
  const maskGradient = "radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)";

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0 h-full w-full", className)}>
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `linear-gradient(to right, ${lineColor} ${lineWidth}px, transparent ${lineWidth}px), linear-gradient(to bottom, ${lineColor} ${lineWidth}px, transparent ${lineWidth}px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
        }}
      />
    </div>
  );
};

interface Cta04Props {
  heading?: string;
  description?: string;
  button?: { text: string; url: string; icon?: React.ReactNode };
  className?: string;
}

const Cta04 = ({
  heading = "Ready to Build Faster?",
  description = "Join thousands of developers building with production-ready components.",
  button = {
    text: "Get Started",
    icon: <ArrowUpRight className="size-4" />,
    url: "#",
  },
  className,
}: Cta04Props) => (
  <section className={cn("container mx-auto py-12 md:py-24", className)}>
    <div className="px-6 md:px-12">
      <Card className="relative overflow-hidden flex flex-col items-center gap-4 px-8 py-16 text-center shadow-none">
        <GridBackground />
        <div className="relative z-10 grid size-12 place-items-center rounded-md bg-primary text-primary-foreground">
          <Grid2x2Check className="size-6" />
        </div>
        <h2 className="relative z-10 max-w-2xl text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          {heading}
        </h2>
        <p className="relative z-10 max-w-xl text-lg text-muted-foreground">{description}</p>
        <Button size="lg" className="relative z-10 py-4" asChild>
          <a href={button.url}>
            {button.text} {button.icon}
          </a>
        </Button>
      </Card>
    </div>
  </section>
);

export { Cta04 };

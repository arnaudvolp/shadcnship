import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  lineColor?: string;
  lineWidth?: number;
  mask?: boolean;
  maskFrom?: "top" | "bottom" | "center";
}

const GridBackground = ({
  className,
  gridSize = 64,
  lineColor = "var(--border)",
  lineWidth = 1,
  mask = true,
  maskFrom = "center",
}: GridBackgroundProps) => {
  const maskGradients = {
    top: "radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)",
    bottom:
      "radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_110%)",
    center:
      "radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_70%)",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full",
        className
      )}
    >
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `linear-gradient(to right, ${lineColor} ${lineWidth}px, transparent ${lineWidth}px), linear-gradient(to bottom, ${lineColor} ${lineWidth}px, transparent ${lineWidth}px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          ...(mask && {
            maskImage: maskGradients[maskFrom],
            WebkitMaskImage: maskGradients[maskFrom],
          }),
        }}
      />
    </div>
  );
};

interface Hero02Props {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string; icon?: React.ReactNode };
    secondary?: { text: string; url: string; icon?: React.ReactNode };
  };
  className?: string;
}

const Hero02 = ({
  badge = "100% Free & Open Source",
  heading = "Shadcn UI Blocks, Copy & Customize",
  description = "Pre-built landing page components for React. Just copy the code and focus on what matters — your product.",
  buttons = {
    primary: { text: "Browse Components", url: "#", icon: <ArrowUpRight className="size-4" /> },
    secondary: { text: "View Docs", url: "#" },
  },
  className,
}: Hero02Props) => {
  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden pb-12 pt-24",
        className
      )}
    >
      <GridBackground />

      <div className="relative z-10 max-w-7xl w-full mx-auto text-center px-6 md:px-12">
        <Badge
          variant="secondary"
          className="py-1 border border-border"
          asChild
        >
          <a href="#">{badge}</a>
        </Badge>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
          {heading}
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
        <div className="mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm md:max-w-none md:w-fit">
          {buttons?.primary && (
            <Button size="lg" className="w-full md:w-auto" asChild>
              <a href={buttons.primary.url}>
                {buttons.primary.text} {buttons.primary.icon}
              </a>
            </Button>
          )}
          {buttons?.secondary && (
            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto"
              asChild
            >
              <a href={buttons.secondary.url}>
                {buttons.secondary.text} {buttons.secondary.icon}
              </a>
            </Button>
          )}
        </div>
        <div className="mt-12 mx-auto w-full max-w-5xl aspect-video bg-accent rounded-md" />
      </div>
    </section>
  );
};

export { Hero02 };

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero05Props {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string; icon?: React.ReactNode };
    secondary?: { text: string; url: string; icon?: React.ReactNode };
  };
  className?: string;
}

const Hero05 = ({
  badge = "100% Free & Open Source",
  heading = "Shadcn UI Blocks, Copy & Customize",
  description = "Pre-built landing page components for React. Just copy the code and focus on what matters — your product.",
  buttons = {
    primary: {
      text: "Browse Components",
      url: "#",
      icon: <ArrowUpRight className="size-4" />,
    },
    secondary: { text: "View Docs", url: "#" },
  },
  className,
}: Hero05Props) => {
  return (
    <section
      className={cn(
        "relative h-full overflow-hidden py-12 md:py-24",
        className,
      )}
    >
      <div className="container mx-auto flex flex-col items-center gap-4 px-8 text-center">
        <Badge
          variant="secondary"
          className="border border-border py-1"
          asChild
        >
          <a href="#">{badge}</a>
        </Badge>

        <h1 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl lg:text-6xl">
          {heading}
        </h1>

        <p className="max-w-2xl text-muted-foreground md:text-lg">
          {description}
        </p>

        <div className="grid w-full grid-cols-1 gap-4 md:w-fit md:grid-cols-2">
          {buttons?.primary && (
            <Button size="lg" className="w-full" asChild>
              <a href={buttons.primary.url}>
                {buttons.primary.text} {buttons.primary.icon}
              </a>
            </Button>
          )}
          {buttons?.secondary && (
            <Button variant="outline" size="lg" className="w-full" asChild>
              <a href={buttons.secondary.url}>
                {buttons.secondary.text} {buttons.secondary.icon}
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero05 };

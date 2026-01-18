import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Cta02Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string; icon?: React.ReactNode };
    secondary?: { text: string; url: string };
  };
  className?: string;
}

const Cta02 = ({
  heading = "Ready to Build Faster?",
  description = "Start building with production-ready components. Copy, customize, and ship your next project.",
  buttons = {
    primary: { text: "Browse Components", url: "#", icon: <ArrowUpRight className="size-4" /> },
    secondary: { text: "View Docs", url: "#" },
  },
  className,
}: Cta02Props) => (
  <section className={cn("py-12 md:py-24", className)}>
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <Card className="grid items-center gap-8 p-8 md:grid-cols-3 md:pb-0 shadow-none">
        <div className="flex flex-col gap-4 md:col-span-2">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">{description}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            {buttons?.primary && (
              <Button size="lg" asChild >
                <a href={buttons.primary.url}>
                  {buttons.primary.text} {buttons.primary.icon}
                </a>
              </Button>
            )}
            {buttons?.secondary && (
              <Button variant="outline" size="lg" asChild >
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
          </div>
        </div>
        <div className="hidden md:block aspect-3/4 rounded-t-md bg-accent" />
      </Card>
    </div>
  </section>
);

export { Cta02 };

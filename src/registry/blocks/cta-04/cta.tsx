import { ArrowUpRight, Book, Grid2x2Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Cta04Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string; icon?: React.ReactNode };
    secondary?: { text: string; url: string; icon?: React.ReactNode };
  };
  className?: string;
  icon?: React.ReactNode;
}

const Cta04 = ({
  heading = "Ready to Build Faster?",
  description = "Join thousands of developers building with production-ready components.",
  icon = <Grid2x2Check className="size-6" />,
  buttons = {
    primary: {
      text: "Get Started",
      url: "#",
      icon: <ArrowUpRight className="size-4" />,
    },
    secondary: {
      text: "View Docs",
      url: "#",
      icon: <Book className="size-4" />,
    },
  },
  className,
}: Cta04Props) => (
  <section className={cn("container mx-auto py-12 md:py-24", className)}>
    <div className="px-6 md:px-12">
      <Card className="relative overflow-hidden flex flex-col items-center gap-4 px-8 py-16 text-center shadow-none">
        <div className="relative z-10 grid size-12 place-items-center rounded-md bg-primary text-primary-foreground">
          {icon}
        </div>
        <h2 className="relative z-10 max-w-2xl text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          {heading}
        </h2>
        <p className="relative z-10 max-w-xl text-lg text-muted-foreground">
          {description}
        </p>
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row">
          {buttons?.primary && (
            <Button size="lg" className="relative z-10 py-4" asChild>
              <a href={buttons.primary.url}>
                {buttons.primary.text} {buttons.primary.icon}
              </a>
            </Button>
          )}
          {buttons?.secondary && (
            <Button
              variant="outline"
              size="lg"
              className="relative z-10 py-4"
              asChild
            >
              <a href={buttons.secondary.url}>
                {buttons.secondary.text} {buttons.secondary.icon}
              </a>
            </Button>
          )}
        </div>
      </Card>
    </div>
  </section>
);

export { Cta04 };

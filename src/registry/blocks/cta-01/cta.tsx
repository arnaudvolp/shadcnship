import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Cta01Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string; icon?: React.ReactNode };
    secondary?: { text: string; url: string };
  };
  className?: string;
}

const Cta01 = ({
  heading = "Ready to Build Faster?",
  description = "Start building with production-ready components. Copy, customize, and ship your next project.",
  buttons = {
    primary: { text: "Browse Components", url: "#", icon: <ArrowUpRight className="size-4" /> },
  },
  className,
}: Cta01Props) => {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-8 overflow-hidden rounded-md border p-8 lg:flex-row lg:items-center lg:p-12">
          <div className="flex-1">
            <h3 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              {heading}
            </h3>
            <p className="mt-2 max-w-xl text-lg text-muted-foreground">{description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            {buttons?.secondary && (
              <Button variant="outline" size="lg" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
            {buttons?.primary && (
              <Button asChild size="lg" className="py-6">
                <a href={buttons.primary.url}>
                  {buttons.primary.text} {buttons.primary.icon}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta01 };

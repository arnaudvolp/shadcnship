import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Iphone } from "@/components/ui/iphone";

interface Cta02Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string; icon?: React.ReactNode };
    secondary?: { text: string; url: string };
  };
  image?: string;
  className?: string;
}

const Cta02 = ({
  heading = "Ready to Build Faster?",
  description = "Start building with production-ready components. Copy, customize, and ship your next project.",
  buttons = {
    primary: {
      text: "Browse Components",
      url: "#",
      icon: <ArrowUpRight className="size-4" />,
    },
    secondary: { text: "View Docs", url: "#" },
  },
  image,
  className,
}: Cta02Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <Card className="grid items-center gap-8 p-8 shadow-none md:grid-cols-3 md:pb-0">
      <div className="flex flex-col gap-4 md:col-span-2">
        <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
          {heading}
        </h2>
        <p className="max-w-md text-muted-foreground md:text-lg">
          {description}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          {buttons?.primary && (
            <Button size="lg" asChild>
              <a href={buttons.primary.url}>
                {buttons.primary.text} {buttons.primary.icon}
              </a>
            </Button>
          )}
          {buttons?.secondary && (
            <Button variant="outline" size="lg" asChild>
              <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
            </Button>
          )}
        </div>
      </div>
      <div className="hidden max-h-80 self-end overflow-hidden md:block">
        <Iphone src={image ?? undefined} />
      </div>
    </Card>
  </section>
);

export { Cta02 };

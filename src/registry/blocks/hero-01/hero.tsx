import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero01Props {
  badge?: { text: string; url?: string };
  title?: string;
  description?: string;
  buttons?: {
    text: string;
    url?: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  }[];
  img?: string;
  className?: string;
}

const Hero01 = ({
  badge = { text: "Production-ready components", url: "#" },
  title = "Shadcn UI Blocks, Copy & Customize",
  description = "Pre-built landing page components for React. Just copy the code and focus on what matters — your product.",
  buttons = [
    {
      text: "Browse Components",
      url: "#",
      icon: <ArrowUpRight className="size-4" />,
    },
    { text: "View Docs", url: "#", variant: "outline" },
  ],
  img = "/images/placeholders/hero-architecture-4.webp",
  className,
}: Hero01Props) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-16 md:py-24",
        className,
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            {badge && (
              <Badge
                variant="secondary"
                className="border border-border py-1"
                asChild
              >
                <a href={badge.url}>{badge.text}</a>
              </Badge>
            )}
            <h1 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-md text-muted-foreground md:text-lg">
              {description}
            </p>
            {buttons && buttons.length > 0 && (
              <div className="grid w-full grid-cols-1 gap-4 sm:w-fit sm:grid-cols-2">
                {buttons.map((btn) => (
                  <Button
                    key={btn.text}
                    size="lg"
                    variant={btn.variant ?? "default"}
                    className="w-full"
                    asChild
                  >
                    <a href={btn.url}>
                      {btn.text}
                      {btn.icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
          {img && (
            <div className="w-full overflow-hidden rounded-lg bg-muted lg:aspect-square lg:flex-1">
              <img
                src={img}
                alt={title}
                width={800}
                height={600}
                className="size-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero01 };

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero01Props {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string; icon?: React.ReactNode };
    secondary?: { text: string; url: string; icon?: React.ReactNode };
  };
  image?: string;
  className?: string;
}

const Hero01 = ({
  badge = "Production-ready components",
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
  image = "https://www.shadcnship.com/images/image-preview.webp",
  className,
}: Hero01Props) => {
  return (
    <section
      className={cn(
        "flex min-h-screen items-center justify-center overflow-hidden py-12 lg:py-24",
        className,
      )}
    >
      <div className="container mx-auto flex flex-col items-center gap-12 px-4 lg:flex-row">
        {/* Text */}
        <div className="flex flex-1 flex-col items-center gap-4 text-center lg:items-start lg:text-left">
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

          <p className="max-w-xl text-muted-foreground md:text-lg">
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

        {/* Image */}
        <div className="aspect-video w-full flex-1 overflow-hidden rounded-md bg-muted/30 lg:aspect-square">
          {image && (
            <img
              src={image}
              alt={heading}
              width={1000}
              height={1000}
              className="size-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero01 };

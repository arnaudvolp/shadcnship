import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Hero03Props {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string; icon?: React.ReactNode };
    secondary?: { text: string; url: string; icon?: React.ReactNode };
  };
  ratingText?: string;
  image?: string;
  className?: string;
}

const Hero03 = ({
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
  ratingText = "Loved by developers worldwide",
  image = "https://www.shadcnship.com/images/image-preview.webp",
  className,
}: Hero03Props) => {
  return (
    <section
      className={cn(
        "flex min-h-screen items-center overflow-hidden",
        className,
      )}
    >
      <div className="grid w-full lg:grid-cols-2">
        {/* Text */}
        <div className="container m-auto flex flex-col items-center gap-4 p-8 text-center md:p-20 lg:items-start lg:text-left">
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

          <p className="text-muted-foreground md:text-lg">{description}</p>

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

          <div className="mt-4 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={`star-${i}`}
                  className="size-4 fill-primary text-primary"
                />
              ))}
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-muted-foreground">{ratingText}</span>
          </div>
        </div>

        {/* Image */}
        <div className="aspect-video w-full bg-muted/30 lg:aspect-auto lg:h-screen">
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

export { Hero03 };

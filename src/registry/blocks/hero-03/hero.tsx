import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Hero03Props {
  badge?: string;
  title?: string;
  description?: string;
  buttons?: {
    text: string;
    url?: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  }[];
  ratingText?: string;
  img?: string;
  className?: string;
}

const Hero03 = ({
  badge = "100% Free & Open Source",
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
  ratingText = "Loved by developers worldwide",
  img = "https://www.shadcnship.com/images/placeholders/hero-architecture-1.webp",
  className,
}: Hero03Props) => {
  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <div className="flex min-h-screen flex-col gap-4 lg:flex-row lg:gap-0">
        {/* Text */}
        <div className="container m-auto flex flex-col items-center gap-4 px-6 py-16 text-center lg:items-start lg:p-20 lg:text-left">
          <Badge
            variant="secondary"
            className="border border-border py-1"
            asChild
          >
            <a href="#">{badge}</a>
          </Badge>

          <h1 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="max-w-3xl text-muted-foreground md:text-lg">
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
        {img && (
          <div className="aspect-video w-full bg-muted/30">
            <img
              src={img}
              alt={title}
              width={1000}
              height={200}
              className="aspect-video size-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero03;

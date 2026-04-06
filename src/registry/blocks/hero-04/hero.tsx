import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroCard {
  img: string;
  title: string;
  description: string;
}

interface Hero04Props {
  badge?: { text: string; url?: string };
  title?: string;
  description?: string;
  buttons?: {
    text: string;
    url?: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  }[];
  cards?: HeroCard[];
  className?: string;
}

const Hero04 = ({
  badge = { text: "Production-ready components", url: "#" },
  title = "Shadcn UI Blocks, Copy & Customize",
  description = "Pre-built landing page components for React. Just copy the code and focus on what matters — your product.",
  buttons = [],
  cards = [
    {
      img: "https://www.shadcnship.com/images/placeholders/hero-architecture-7.webp",
      title: "50+ Ready-to-use Blocks",
      description:
        "Hero sections, feature grids, pricing tables and more. Everything you need to ship fast.",
    },
    {
      img: "https://www.shadcnship.com/images/placeholders/hero-architecture-5.webp",
      title: "Built with shadcn/ui",
      description:
        "Every block uses shadcn/ui components and Tailwind CSS. Fully accessible and customizable.",
    },
    {
      img: "https://www.shadcnship.com/images/placeholders/hero-architecture-6.webp",
      title: "Copy & Customize",
      description:
        "No lock-in. Copy the code directly into your project and make it your own.",
    },
    {
      img: "https://www.shadcnship.com/images/placeholders/hero-architecture-3.webp",
      title: "Ship Faster",
      description:
        "Stop building from scratch. Go from idea to production-ready landing page in minutes.",
    },
  ],
  className,
}: Hero04Props) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-16 md:pt-42",
        className,
      )}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          {badge && (
            <Badge
              variant="secondary"
              className="border border-border py-1"
              asChild
            >
              <a href={badge.url}>{badge.text}</a>
            </Badge>
          )}

          <h1 className="max-w-5xl text-4xl leading-tight font-medium tracking-tight whitespace-pre-line md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="max-w-2xl text-muted-foreground md:text-lg">
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

        {/* Cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:flex">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative aspect-square flex-1 overflow-hidden rounded-xl bg-muted/30 md:aspect-9/16"
            >
              <img
                src={card.img}
                alt={card.title}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute right-0 bottom-0 left-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="font-medium text-white">{card.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-white/70">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero04;

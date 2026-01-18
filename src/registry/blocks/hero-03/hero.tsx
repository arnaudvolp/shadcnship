import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  stats?: { value: string; label: string }[];
  className?: string;
}

const Hero03 = ({
  badge = "100% Free & Open Source",
  heading = "Shadcn UI Blocks, Copy & Customize",
  description = "Pre-built landing page components for React. Just copy the code and focus on what matters — your product.",
  buttons = {
    primary: { text: "Browse Components", url: "#", icon: <ArrowUpRight className="size-4" /> },
    secondary: { text: "View Docs", url: "#" },
  },
  ratingText = "Loved by developers worldwide",
  stats = [
    { value: "50+", label: "Blocks" },
    { value: "100%", label: "Free" },
    { value: "Open", label: "Source" },
  ],
  className,
}: Hero03Props) => {
  return (
    <section
      className={cn(
        "min-h-screen flex items-center overflow-hidden",
        className
      )}
    >
      <div className="w-full grid lg:grid-cols-2">
        <div className="m-auto max-w-xl lg:max-w-none lg:ml-auto lg:mr-12 px-6 md:px-12 py-12 text-center lg:text-left space-y-4">
          <Badge
            variant="secondary"
            className="py-1 border border-border"
            asChild
          >
            <a href="#">{badge}</a>
          </Badge>
          <h1 className=" text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
            {heading}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
          <div className="mt-0 flex flex-col md:flex-row items-center gap-4 justify-center lg:justify-start">
            {buttons?.primary && (
              <Button size="lg" className="w-full md:w-auto" asChild>
                <a href={buttons.primary.url}>
                  {buttons.primary.text} {buttons.primary.icon}
                </a>
              </Button>
            )}
            {buttons?.secondary && (
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto"
                asChild
              >
                <a href={buttons.secondary.url}>
                  {buttons.secondary.text} {buttons.secondary.icon}
                </a>
              </Button>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2 justify-center lg:justify-start">
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
          <Card className="mt-12 w-full shadow-none">
            <div className="flex divide-x">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-1 flex-col items-center"
                >
                  <span className="text-xl lg:text-2xl font-semibold">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="w-full aspect-video lg:aspect-auto lg:h-screen bg-accent" />
      </div>
    </section>
  );
};

export { Hero03 };

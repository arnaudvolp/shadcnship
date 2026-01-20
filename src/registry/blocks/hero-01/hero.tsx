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
  className?: string;
}

const Hero01 = ({
  badge = "Production-ready components",
  heading = "Shadcn UI Blocks, Copy & Customize",
  description = "Pre-built landing page components for React. Just copy the code and focus on what matters — your product.",
  buttons = {
    primary: { text: "Browse Components", url: "#" ,icon: <ArrowUpRight className="size-4" /> },
    secondary: { text: "View Docs", url: "#" },
  },
  className,
}: Hero01Props) => {
  return (
    <section
      className={cn(
        "min-h-screen flex items-center justify-center overflow-hidden py-12 lg:py-24",
        className
      )}
    >
      <div className="container w-full mx-auto text-center lg:text-left grid lg:grid-cols-2 gap-12 p-4 ">
        <div className="my-auto">
          <Badge
            variant="secondary"
            className="py-1 border border-border"
            asChild
          >
            <a href="#">
              {badge} 
            </a>
          </Badge>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            {heading}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
          <div className="mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm md:max-w-none md:w-fit lg:ml-0">
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
                className=" w-full md:w-auto"
                asChild
              >
                <a href={buttons.secondary.url}>
                  {buttons.secondary.text} {buttons.secondary.icon}
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="w-full aspect-video lg:aspect-square bg-accent rounded-md" />
      </div>
    </section>
  );
};

export { Hero01 };

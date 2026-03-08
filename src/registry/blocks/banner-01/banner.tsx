import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Banner01Props {
  title?: string;
  description?: string;
  button?: {
    text: string;
    url?: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  };
  className?: string;
}

const Banner01 = ({
  title = "Shadcn 2026",
  description = "Join us in Paris from June 20 - 24 to see what's coming next.",
  button = {
    text: "Register now",
    url: "#",
    variant: "outline",
    icon: (
      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    ),
  },
  className,
}: Banner01Props) => {
  return (
    <div className={cn("fixed top-0 w-full border-b bg-background", className)}>
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <p className="text-sm">
          <span className="font-semibold">{title}</span>
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="text-muted-foreground">{description}</span>
        </p>
        {button && (
          <Button
            key={button.text}
            variant={button.variant ?? "default"}
            asChild
          >
            <a
              href={button.url}
              className="group flex shrink-0 items-center gap-1 text-sm font-medium"
            >
              {button.text}
              {button.icon}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export { Banner01 };

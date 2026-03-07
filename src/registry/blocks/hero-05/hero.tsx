import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Hero05Props {
  badge?: {
    text: string;
    avatars?: string[];
  };
  title?: string;
  description?: string;
  buttons?: {
    text: string;
    url?: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  }[];
  className?: string;
}

const Hero05 = ({
  badge = {
    text: "Trusted by developers",
    avatars: [
      "/images/avatars/avatar-1.webp",
      "/images/avatars/avatar-2.webp",
      "/images/avatars/avatar-3.webp",
    ],
  },
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
  className,
}: Hero05Props) => {
  return (
    <section
      className={cn(
        "relative h-full overflow-hidden py-12 md:py-24",
        className,
      )}
    >
      <div className="container mx-auto flex flex-col items-center gap-4 px-8 text-center">
        {badge && (
          <Badge
            variant="secondary"
            className="gap-2 border border-border px-4 py-1"
          >
            {badge.avatars && badge.avatars.length > 0 && (
              <div className="flex -space-x-2">
                {badge.avatars?.map((avatar, i) => (
                  <Avatar
                    key={`avatar-${i}`}
                    className="size-5 border-2 border-background"
                  >
                    <AvatarImage src={avatar} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            )}
            <span>{badge.text}</span>
          </Badge>
        )}

        <h1 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>

        <p className="max-w-2xl text-muted-foreground md:text-lg">
          {description}
        </p>

        {buttons && buttons.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-4 md:w-fit md:grid-cols-2">
            {buttons.map((btn, i) => (
              <Button
                key={i}
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
    </section>
  );
};

export { Hero05 };

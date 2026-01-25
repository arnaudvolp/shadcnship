import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Background04 } from "@/components/background-04";

interface Hero04Props {
  badge?: {
    text: string;
    avatars?: string[];
  };
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      icon?: React.ReactNode;
      openInNewPage?: boolean;
    };
    secondary?: {
      text: string;
      url: string;
      icon?: React.ReactNode;
      openInNewPage?: boolean;
    };
  };
  className?: string;
}

const Hero04 = ({
  badge = {
    text: "Trusted by developers",
    avatars: [
      "https://avatar.vercel.sh/1",
      "https://avatar.vercel.sh/2",
      "https://avatar.vercel.sh/3",
    ],
  },
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
  className,
}: Hero04Props) => {
  return (
    <section
      className={cn(
        "relative flex w-full min-h-screen items-center overflow-hidden py-12 md:py-24",
        className,
      )}
    >
      <Background04 lineCount={14} />
      <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_100%_60%_at_50%_50%,var(--background)_0%,var(--background)_40%,transparent_70%)] md:bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,var(--background)_0%,var(--background)_40%,transparent_70%)]" />

      <div className="relative z-10 container w-full mx-auto text-center px-6 md:px-12">
        {badge && (
          <Badge
            variant="secondary"
            className="py-1 px-3 border border-border gap-2"
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
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight max-w-3xl mx-auto">
          {heading}
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
        <div className="mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm md:max-w-none md:w-fit">
          {buttons?.primary && (
            <Button size="lg" className="w-full md:w-auto" asChild>
              <a
                href={buttons.primary.url}
                target={buttons.primary.openInNewPage ? "_blank" : ""}
              >
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
              <a
                href={buttons.secondary.url}
                target={buttons.secondary.openInNewPage ? "_blank" : ""}
              >
                {buttons.secondary.text} {buttons.secondary.icon}
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero04 };

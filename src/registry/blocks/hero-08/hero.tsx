"use client";

import { useId, useState } from "react";
import { ArrowUp, Award, Globe, Paperclip, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  GithubIcon,
  NextIcon,
  NotionIcon,
  SlackIcon,
  SupabaseIcon,
  TailwindIcon,
} from "@/registry/blocks/social-icons/icons";

interface Logo {
  name: string;
  icon: React.ReactNode;
}

interface Chip {
  label: string;
  icon?: React.ReactNode;
}

interface Hero08Props {
  title?: string;
  highlight?: string;
  description?: string;
  // Prompt card — set to null to show the buttons instead
  prompt?: {
    placeholder: string;
    label: string;
    chips?: Chip[];
  } | null;
  onSubmit?: (value: string, activeChips: string[]) => void;
  buttons?: {
    text: string;
    url: string;
    variant?: "default" | "outline";
  }[];
  badge?: string;
  logos?: Logo[];
  backgroundImage?: string;
  backgroundImageDark?: string;
  className?: string;
}

const Hero08 = ({
  title = "Build landing pages ",
  highlight = "that convert.",
  description = "Describe the page you want and get a first version in minutes, built from production-ready shadcn/ui blocks.",
  prompt = {
    placeholder: "Describe the page you want to build…",
    label: "Describe your page",
    chips: [
      { label: "Attach", icon: <Paperclip /> },
      { label: "Web search", icon: <Globe /> },
      { label: "Enhance", icon: <Sparkles /> },
    ],
  },
  onSubmit,
  buttons = [
    { text: "Browse Components", url: "#" },
    { text: "View Docs", url: "#", variant: "outline" },
  ],
  badge = "Production-ready components",
  logos = [
    { name: "Next.js", icon: <NextIcon className="size-5" /> },
    { name: "Tailwind", icon: <TailwindIcon className="size-5" /> },
    { name: "GitHub", icon: <GithubIcon className="size-5" /> },
    { name: "Supabase", icon: <SupabaseIcon className="size-5" /> },
    { name: "Slack", icon: <SlackIcon className="size-5" /> },
    { name: "Notion", icon: <NotionIcon className="size-5" /> },
  ],
  backgroundImage = "/images/backgrounds/background-1.webp",
  backgroundImageDark = "/images/backgrounds/background-1-dark.webp",
  className,
}: Hero08Props) => {
  const promptId = useId();
  const [value, setValue] = useState("");
  const [activeChips, setActiveChips] = useState<string[]>([]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed, activeChips);
    setValue("");
  };

  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center overflow-hidden py-16 md:py-24",
        className,
      )}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 size-full object-cover dark:hidden"
        />
      )}
      {backgroundImageDark && (
        <img
          src={backgroundImageDark}
          alt=""
          className="absolute inset-0 hidden size-full object-cover dark:block"
        />
      )}
      {(backgroundImage || backgroundImageDark) && (
        <div aria-hidden="true">
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent" />
        </div>
      )}

      <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 px-6 md:gap-16">
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <h1 className="max-w-3xl text-4xl leading-tight font-medium tracking-tight md:text-5xl lg:text-6xl">
            {title}
            <br />
            {highlight && (
              <em className="font-serif font-normal italic">{highlight}</em>
            )}
          </h1>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            {description}
          </p>

          {prompt ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="mt-4 flex w-full max-w-xl flex-col gap-3 rounded-lg border bg-card p-3 text-left shadow-sm"
            >
              <label htmlFor={promptId} className="sr-only">
                {prompt.label}
              </label>
              <Textarea
                id={promptId}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder={prompt.placeholder}
                rows={3}
                className="min-h-20 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent"
              />
              <div className="flex items-center justify-between gap-2">
                <div className="hidden items-center gap-1 md:flex">
                  {prompt.chips?.map((chip) => (
                    <Toggle
                      key={chip.label}
                      size="sm"
                      variant="outline"
                      pressed={activeChips.includes(chip.label)}
                      onPressedChange={(pressed) =>
                        setActiveChips((prev) =>
                          pressed
                            ? [...prev, chip.label]
                            : prev.filter((c) => c !== chip.label),
                        )
                      }
                    >
                      {chip.icon}
                      {chip.label}
                    </Toggle>
                  ))}
                </div>
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Submit"
                  disabled={!value.trim()}
                  className="ml-auto"
                >
                  <ArrowUp />
                </Button>
              </div>
            </form>
          ) : (
            buttons.length > 0 && (
              <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:w-fit sm:grid-cols-2">
                {buttons.map((btn) => (
                  <Button
                    key={btn.text}
                    size="lg"
                    variant={btn.variant ?? "default"}
                    className="w-full"
                    asChild
                  >
                    <a href={btn.url}>{btn.text}</a>
                  </Button>
                ))}
              </div>
            )
          )}

          {badge && (
            <Badge variant="outline" className="gap-1.5 bg-background/60 py-1">
              <Award aria-hidden="true" />
              {badge}
            </Badge>
          )}
        </div>

        {logos.length > 0 && (
          <ul
            aria-label="Trusted by"
            className="grid w-full max-w-4xl grid-cols-3 gap-x-6 gap-y-6 lg:grid-cols-6"
          >
            {logos.map((logo) => (
              <li
                key={logo.name}
                className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground opacity-80 grayscale"
              >
                <span aria-hidden="true">{logo.icon}</span>
                <span>{logo.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Hero08;

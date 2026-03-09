"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Book } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "../social-icons/icons";

const GRID = 80;

const GridBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0, cellW: 0, cellH: 0 });

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      const cols = Math.max(1, Math.round(width / GRID));
      const rows = Math.max(1, Math.round(height / GRID));
      setGrid({ cols, rows, cellW: width / cols, cellH: height / rows });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { cols, rows, cellW, cellH } = grid;
  const total = cols * rows;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {total > 0 && (
        <div
          className="h-full w-full"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${cellW}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellH}px)`,
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="border-r border-b border-white/6" />
          ))}
        </div>
      )}
    </div>
  );
};

interface Cta04Props {
  title?: string;
  description?: string;
  buttons?: {
    text: string;
    url?: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  }[];
  icon?: React.ReactNode;
  className?: string;
}

const Cta04 = ({
  title = "Ship faster. Build better.",
  description = "Production-ready shadcn/ui blocks for your next project.",
  icon = <LogoIcon className="size-6 invert" />,
  buttons = [
    {
      text: "Get Started now",
      url: "#",
      icon: <ArrowUpRight className="size-4" />,
      variant: "secondary",
    },
    {
      text: "View Docs",
      url: "#",
      icon: <Book className="size-4" />,
      variant: "outline",
    },
  ],
  className,
}: Cta04Props) => (
  <section className={cn("w-full", className)}>
    <div className="relative flex items-center justify-center overflow-hidden bg-zinc-950 py-16 text-white md:py-24 lg:py-32">
      <GridBackground />
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-4 px-8 text-center">
        <div className="grid size-12 place-items-center rounded-md border border-white/6 bg-primary text-primary-foreground dark:border dark:bg-background">
          {icon}
        </div>
        <h2 className="max-w-3xl text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-white/50 md:text-lg">
          {description}
        </p>
        {buttons && buttons.length > 0 && (
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            {buttons.map((btn, i) => (
              <Button
                key={i}
                size="lg"
                variant={btn.variant ?? "secondary"}
                className={cn(
                  "w-full sm:w-auto",
                  btn.variant === "outline" &&
                    "border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white",
                )}
                asChild
              >
                <a href={btn.url}>
                  {btn.text} {btn.icon}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);

export { Cta04 };

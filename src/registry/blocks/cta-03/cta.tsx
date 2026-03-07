"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

interface Cta03Props {
  title?: string;
  description?: string;
  placeholder?: string;
  submitText?: string;
  className?: string;
}

const Cta03 = ({
  title = "Stay Updated",
  description = "Subscribe to get the latest blocks, updates, and tips directly in your inbox.",
  placeholder = "Enter your email",
  submitText = "Subscribe",
  className,
}: Cta03Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <div className="relative overflow-hidden rounded-md bg-zinc-950 p-8 text-white md:p-12">
      <GridBackground />
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="text-white/50 md:text-lg">{description}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <Input
              type="email"
              placeholder={placeholder}
              className="min-h-10 flex-1 border-white/20 bg-white/10 placeholder:text-white/40 focus-visible:ring-white/30"
            />
            <Button variant="secondary" size="lg">
              {submitText}
            </Button>
          </div>
          <p className="text-sm text-white/40">
            By subscribing you agree to our{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export { Cta03 };

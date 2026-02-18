"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Sparkles } from "lucide-react";

interface StepCompleteProps {
  className?: string;
}

export function StepComplete({ className }: StepCompleteProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="size-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          You&apos;re all set!
          <Sparkles className="size-7 text-yellow-500" />
        </h1>
        <p className="text-muted-foreground">
          Your workspace is ready. We&apos;ve personalized your experience based on
          your preferences. Let&apos;s get started!
        </p>
      </div>
    </div>
  );
}

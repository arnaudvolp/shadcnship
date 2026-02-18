"use client";

import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepProgress({
  currentStep,
  totalSteps,
  className,
}: StepProgressProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors duration-300",
            index < currentStep ? "bg-foreground" : "bg-muted"
          )}
        />
      ))}
    </div>
  );
}

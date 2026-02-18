"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { OnboardingStep } from "../types/onboarding";

interface StepIndicatorProps {
  currentStep: OnboardingStep;
  className?: string;
}

const steps: { id: OnboardingStep; label: string }[] = [
  { id: "welcome", label: "Welcome" },
  { id: "profile", label: "Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "workspace", label: "Workspace" },
  { id: "complete", label: "Complete" },
];

const stepOrder: OnboardingStep[] = ["welcome", "profile", "preferences", "workspace", "complete"];

export function StepIndicator({ currentStep, className }: StepIndicatorProps) {
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop view */}
      <div className="hidden sm:flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="size-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isCurrent && "text-primary",
                    !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-12 h-0.5 mx-2 mb-6",
                    index < currentIndex ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile view - progress bar */}
      <div className="sm:hidden space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">
            Step {currentIndex + 1} of {steps.length}
          </span>
          <span className="text-muted-foreground">
            {steps[currentIndex].label}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

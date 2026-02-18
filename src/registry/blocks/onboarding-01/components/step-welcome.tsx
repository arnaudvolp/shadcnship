"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface StepWelcomeProps {
  onNext: () => void;
  className?: string;
}

export function StepWelcome({ onNext, className }: StepWelcomeProps) {
  return (
    <div className={cn("flex flex-col items-center text-center space-y-6", className)}>
      {/* Icon */}
      <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
        <Sparkles className="size-10 text-primary" />
      </div>

      {/* Content */}
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome to your new workspace!
        </h2>
        <p className="text-muted-foreground">
          Let's get you set up in just a few quick steps. This will only take about 2 minutes.
        </p>
      </div>

      {/* Features preview */}
      <div className="grid gap-3 text-left w-full max-w-sm">
        {[
          "Personalize your profile",
          "Set your preferences",
          "Create your workspace",
        ].map((feature, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
              {index + 1}
            </div>
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {/* Action */}
      <Button size="lg" onClick={onNext} className="w-full max-w-sm">
        Get started
      </Button>
    </div>
  );
}

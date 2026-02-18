"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  backLabel?: string;
  skipLabel?: string;
  isLoading?: boolean;
  className?: string;
}

export function NavigationButtons({
  onNext,
  onBack,
  onSkip,
  nextLabel = "Continue",
  backLabel = "Back",
  skipLabel = "Skip",
  isLoading,
  className,
}: NavigationButtonsProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-2">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1"
          >
            <ArrowLeft className="size-4 mr-2" />
            {backLabel}
          </Button>
        )}
        <Button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className={cn("flex-1", !onBack && "w-full")}
        >
          {isLoading ? (
            <Loader2 className="size-4 mr-2 animate-spin" />
          ) : (
            <ArrowRight className="size-4 mr-2" />
          )}
          {nextLabel}
        </Button>
      </div>
      {onSkip && (
        <Button
          type="button"
          variant="ghost"
          onClick={onSkip}
          disabled={isLoading}
          className="text-muted-foreground"
        >
          {skipLabel}
        </Button>
      )}
    </div>
  );
}

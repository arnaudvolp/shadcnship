"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingFeature } from "../types/pricing";

interface FeatureListProps {
  features: PricingFeature[];
  highlighted?: boolean;
  className?: string;
}

export function FeatureList({
  features,
  highlighted,
  className,
}: FeatureListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {features.map((feature) => (
        <li key={feature.text} className="flex items-start gap-3">
          {feature.included ? (
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                highlighted ? "text-primary-foreground" : "text-primary"
              )}
            />
          ) : (
            <X
              className={cn(
                "mt-0.5 size-4 shrink-0",
                highlighted
                  ? "text-primary-foreground/40"
                  : "text-muted-foreground/40"
              )}
            />
          )}
          <span
            className={cn(
              "text-sm",
              !feature.included &&
                (highlighted
                  ? "text-primary-foreground/50"
                  : "text-muted-foreground/50")
            )}
          >
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

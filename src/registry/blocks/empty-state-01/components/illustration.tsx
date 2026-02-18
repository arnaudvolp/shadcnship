"use client";

import { cn } from "@/lib/utils";
import type { EmptyStateVariant, EmptyStateSize } from "../types/empty-state";

interface EmptyStateIllustrationProps {
  variant: EmptyStateVariant;
  size: EmptyStateSize;
  className?: string;
}

const sizeClasses = {
  sm: "w-24 h-24",
  md: "w-32 h-32",
  lg: "w-48 h-48",
};

export function EmptyStateIllustration({
  variant,
  size,
  className,
}: EmptyStateIllustrationProps) {
  const sizeClass = sizeClasses[size];

  const illustrations: Record<EmptyStateVariant, React.ReactNode> = {
    "no-data": (
      <svg viewBox="0 0 200 200" fill="none" className={cn(sizeClass, className)}>
        <circle cx="100" cy="100" r="80" className="fill-muted" />
        <rect x="60" y="60" width="80" height="10" rx="2" className="fill-muted-foreground/20" />
        <rect x="60" y="80" width="60" height="10" rx="2" className="fill-muted-foreground/20" />
        <rect x="60" y="100" width="70" height="10" rx="2" className="fill-muted-foreground/20" />
        <rect x="60" y="120" width="50" height="10" rx="2" className="fill-muted-foreground/20" />
        <circle cx="140" cy="140" r="30" className="fill-background stroke-muted-foreground/30" strokeWidth="3" />
        <path d="M130 140L150 140M140 130V150" className="stroke-muted-foreground/50" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    "no-results": (
      <svg viewBox="0 0 200 200" fill="none" className={cn(sizeClass, className)}>
        <circle cx="100" cy="100" r="80" className="fill-muted" />
        <circle cx="90" cy="90" r="35" className="stroke-muted-foreground/30" strokeWidth="6" fill="none" />
        <path d="M115 115L145 145" className="stroke-muted-foreground/30" strokeWidth="6" strokeLinecap="round" />
        <path d="M75 90H105" className="stroke-muted-foreground/50" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
    error: (
      <svg viewBox="0 0 200 200" fill="none" className={cn(sizeClass, className)}>
        <circle cx="100" cy="100" r="80" className="fill-destructive/10" />
        <circle cx="100" cy="100" r="50" className="stroke-destructive/30" strokeWidth="4" fill="none" />
        <path d="M85 85L115 115M115 85L85 115" className="stroke-destructive/60" strokeWidth="6" strokeLinecap="round" />
      </svg>
    ),
    "not-found": (
      <svg viewBox="0 0 200 200" fill="none" className={cn(sizeClass, className)}>
        <circle cx="100" cy="100" r="80" className="fill-muted" />
        <rect x="50" y="70" width="100" height="70" rx="8" className="fill-background stroke-muted-foreground/20" strokeWidth="3" />
        <path d="M65 100H135M65 115H115" className="stroke-muted-foreground/30" strokeWidth="3" strokeLinecap="round" />
        <circle cx="145" cy="60" r="20" className="fill-warning/20" />
        <path d="M145 50V60M145 67V68" className="stroke-warning" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
    "no-access": (
      <svg viewBox="0 0 200 200" fill="none" className={cn(sizeClass, className)}>
        <circle cx="100" cy="100" r="80" className="fill-muted" />
        <rect x="70" y="85" width="60" height="50" rx="4" className="fill-muted-foreground/10 stroke-muted-foreground/30" strokeWidth="3" />
        <circle cx="100" cy="75" r="20" className="fill-muted-foreground/10 stroke-muted-foreground/30" strokeWidth="3" />
        <circle cx="100" cy="105" r="8" className="fill-muted-foreground/40" />
        <rect x="97" y="108" width="6" height="15" rx="2" className="fill-muted-foreground/40" />
      </svg>
    ),
    "empty-inbox": (
      <svg viewBox="0 0 200 200" fill="none" className={cn(sizeClass, className)}>
        <circle cx="100" cy="100" r="80" className="fill-muted" />
        <path d="M50 90L100 60L150 90V140H50V90Z" className="fill-background stroke-muted-foreground/30" strokeWidth="3" />
        <path d="M50 90L100 115L150 90" className="stroke-muted-foreground/30" strokeWidth="3" />
        <circle cx="100" cy="105" r="15" className="fill-muted stroke-muted-foreground/20" strokeWidth="2" />
        <path d="M95 105L100 110L110 100" className="stroke-muted-foreground/40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    offline: (
      <svg viewBox="0 0 200 200" fill="none" className={cn(sizeClass, className)}>
        <circle cx="100" cy="100" r="80" className="fill-muted" />
        <path d="M60 120C60 100 80 80 100 80C120 80 140 100 140 120" className="stroke-muted-foreground/30" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="130" r="10" className="fill-muted-foreground/30" />
        <path d="M70 85L130 145" className="stroke-destructive/50" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
    maintenance: (
      <svg viewBox="0 0 200 200" fill="none" className={cn(sizeClass, className)}>
        <circle cx="100" cy="100" r="80" className="fill-muted" />
        <rect x="75" y="70" width="50" height="60" rx="4" className="fill-background stroke-muted-foreground/30" strokeWidth="3" />
        <circle cx="100" cy="140" r="15" className="fill-muted-foreground/20 stroke-muted-foreground/30" strokeWidth="3" />
        <path d="M95 140L105 140M100 135V145" className="stroke-muted-foreground/40" strokeWidth="2" strokeLinecap="round" />
        <path d="M85 85H115M85 95H105M85 105H110" className="stroke-muted-foreground/30" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  };

  return illustrations[variant] || illustrations["no-data"];
}

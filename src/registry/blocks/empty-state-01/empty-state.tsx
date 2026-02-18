"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EmptyStateIllustration } from "./components";
import type { EmptyStateProps, EmptyStatePreset, EmptyStateVariant } from "./types/empty-state";
import {
  Database,
  Search,
  AlertCircle,
  FileQuestion,
  Lock,
  Inbox,
  WifiOff,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// =============================================================================
// Preset Configurations
// =============================================================================

const presets: Record<EmptyStateVariant, EmptyStatePreset> = {
  "no-data": {
    icon: Database,
    title: "No data yet",
    description: "Get started by adding your first item. Your data will appear here once created.",
  },
  "no-results": {
    icon: Search,
    title: "No results found",
    description: "We couldn't find anything matching your search. Try adjusting your filters or search terms.",
  },
  error: {
    icon: AlertCircle,
    title: "Something went wrong",
    description: "We encountered an error while loading this content. Please try again or contact support if the issue persists.",
  },
  "not-found": {
    icon: FileQuestion,
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved. Check the URL or navigate back home.",
  },
  "no-access": {
    icon: Lock,
    title: "Access denied",
    description: "You don't have permission to view this content. Contact your administrator for access.",
  },
  "empty-inbox": {
    icon: Inbox,
    title: "Inbox zero!",
    description: "You're all caught up. New messages will appear here when they arrive.",
  },
  offline: {
    icon: WifiOff,
    title: "You're offline",
    description: "Please check your internet connection and try again.",
  },
  maintenance: {
    icon: Wrench,
    title: "Under maintenance",
    description: "We're making some improvements. Please check back in a few minutes.",
  },
};

// =============================================================================
// Size Configuration
// =============================================================================

const sizeConfig = {
  sm: {
    container: "max-w-xs py-8",
    icon: "size-10",
    title: "text-base font-medium",
    description: "text-xs",
    button: "h-8 text-xs",
  },
  md: {
    container: "max-w-sm py-12",
    icon: "size-12",
    title: "text-lg font-semibold",
    description: "text-sm",
    button: "h-9 text-sm",
  },
  lg: {
    container: "max-w-md py-16",
    icon: "size-16",
    title: "text-xl font-semibold",
    description: "text-base",
    button: "h-10",
  },
};

// =============================================================================
// Main Component
// =============================================================================

export default function EmptyState01({
  variant = "no-data",
  size = "md",
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  children,
}: EmptyStateProps) {
  const preset = presets[variant];
  const config = sizeConfig[size];
  const Icon: LucideIcon = icon || preset.icon;

  const displayTitle = title ?? preset.title;
  const displayDescription = description ?? preset.description;

  const renderAction = (
    actionConfig: NonNullable<EmptyStateProps["action"]>,
    isSecondary = false
  ) => {
    const buttonVariant = actionConfig.variant || (isSecondary ? "outline" : "default");

    if (actionConfig.href) {
      return (
        <Button asChild variant={buttonVariant} className={config.button}>
          <a href={actionConfig.href}>{actionConfig.label}</a>
        </Button>
      );
    }

    return (
      <Button
        variant={buttonVariant}
        onClick={actionConfig.onClick}
        className={config.button}
      >
        {actionConfig.label}
      </Button>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center mx-auto",
        config.container,
        className
      )}
    >
      {/* Illustration */}
      <EmptyStateIllustration variant={variant} size={size} className="mb-4" />

      {/* Icon (optional, shown if no illustration is desired) */}
      <div className="mb-4 rounded-full bg-muted p-3 hidden">
        <Icon className={cn("text-muted-foreground", config.icon)} />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className={cn("text-foreground", config.title)}>{displayTitle}</h3>
        <p className={cn("text-muted-foreground", config.description)}>
          {displayDescription}
        </p>
      </div>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          {action && renderAction(action)}
          {secondaryAction && renderAction(secondaryAction, true)}
        </div>
      )}

      {/* Custom content */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

// =============================================================================
// Named Exports for convenience
// =============================================================================

export { EmptyState01 };

// Re-export types
export type { EmptyStateProps, EmptyStateVariant, EmptyStateSize, EmptyStateAction } from "./types/empty-state";

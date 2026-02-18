// =============================================================================
// Empty State Types
// =============================================================================

import type { LucideIcon } from "lucide-react";

export type EmptyStateVariant =
  | "no-data"
  | "no-results"
  | "error"
  | "not-found"
  | "no-access"
  | "empty-inbox"
  | "offline"
  | "maintenance";

export type EmptyStateSize = "sm" | "md" | "lg";

export interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "outline" | "ghost" | "link";
}

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  size?: EmptyStateSize;
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  className?: string;
  children?: React.ReactNode;
}

export interface EmptyStatePreset {
  icon: LucideIcon;
  title: string;
  description: string;
}

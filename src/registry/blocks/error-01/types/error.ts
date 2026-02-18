// =============================================================================
// Error Page Types
// =============================================================================

export type ErrorVariant =
  | "not-found"      // 404
  | "server-error"   // 500
  | "forbidden"      // 403
  | "maintenance"    // Scheduled maintenance
  | "offline"        // No connection
  | "custom";        // Custom error

export interface ErrorAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost" | "link";
}

export interface ErrorPageProps {
  /** Error variant preset */
  variant?: ErrorVariant;
  /** Custom error code (e.g., "404", "500") */
  code?: string;
  /** Error title */
  title?: string;
  /** Error description */
  description?: string;
  /** Custom illustration element */
  illustration?: React.ReactNode;
  /** Primary action button */
  primaryAction?: ErrorAction;
  /** Secondary action button */
  secondaryAction?: ErrorAction;
  /** Show search bar (useful for 404) */
  showSearch?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Search submit handler */
  onSearch?: (query: string) => void;
  /** Show helpful links */
  helpfulLinks?: { label: string; href: string }[];
  /** Estimated time for maintenance */
  estimatedTime?: string;
  /** Whether to show retry button (for server errors) */
  showRetry?: boolean;
  /** Retry handler */
  onRetry?: () => void;
  /** Additional class names */
  className?: string;
}

export interface ErrorIllustrationProps {
  variant: ErrorVariant;
  className?: string;
}

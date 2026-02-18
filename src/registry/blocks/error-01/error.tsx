"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorIllustration } from "./components";
import { Search, ArrowLeft, RefreshCw, Home } from "lucide-react";
import type { ErrorPageProps, ErrorVariant, ErrorAction } from "./types/error";

// =============================================================================
// Preset Configurations
// =============================================================================

const presets: Record<
  Exclude<ErrorVariant, "custom">,
  {
    code: string;
    title: string;
    description: string;
    primaryAction: ErrorAction;
    secondaryAction?: ErrorAction;
  }
> = {
  "not-found": {
    code: "404",
    title: "Page not found",
    description:
      "Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.",
    primaryAction: {
      label: "Go back home",
      href: "/",
      variant: "default",
    },
    secondaryAction: {
      label: "Go back",
      variant: "outline",
    },
  },
  "server-error": {
    code: "500",
    title: "Something went wrong",
    description:
      "We're experiencing technical difficulties. Our team has been notified and is working to fix the issue.",
    primaryAction: {
      label: "Try again",
      variant: "default",
    },
    secondaryAction: {
      label: "Go back home",
      href: "/",
      variant: "outline",
    },
  },
  forbidden: {
    code: "403",
    title: "Access denied",
    description:
      "You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.",
    primaryAction: {
      label: "Go back home",
      href: "/",
      variant: "default",
    },
    secondaryAction: {
      label: "Contact support",
      href: "/support",
      variant: "outline",
    },
  },
  maintenance: {
    code: "",
    title: "We'll be back soon",
    description:
      "We're currently performing scheduled maintenance to improve your experience. Thank you for your patience.",
    primaryAction: {
      label: "Check status",
      href: "/status",
      variant: "default",
    },
  },
  offline: {
    code: "",
    title: "You're offline",
    description:
      "It looks like you've lost your internet connection. Please check your network settings and try again.",
    primaryAction: {
      label: "Try again",
      variant: "default",
    },
  },
};

// =============================================================================
// Error Page Component
// =============================================================================

export function ErrorPage({
  variant = "not-found",
  code: customCode,
  title: customTitle,
  description: customDescription,
  illustration,
  primaryAction: customPrimaryAction,
  secondaryAction: customSecondaryAction,
  showSearch,
  searchPlaceholder = "Search for pages...",
  onSearch,
  helpfulLinks,
  estimatedTime,
  showRetry,
  onRetry,
  className,
}: ErrorPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get preset or use custom
  const preset = variant !== "custom" ? presets[variant] : null;

  const code = customCode ?? preset?.code;
  const title = customTitle ?? preset?.title ?? "Error";
  const description = customDescription ?? preset?.description ?? "An error occurred.";
  const primaryAction = customPrimaryAction ?? preset?.primaryAction;
  const secondaryAction = customSecondaryAction ?? preset?.secondaryAction;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handlePrimaryAction = () => {
    if (primaryAction?.onClick) {
      primaryAction.onClick();
    } else if (primaryAction?.label === "Try again" && onRetry) {
      onRetry();
    } else if (primaryAction?.href) {
      window.location.href = primaryAction.href;
    }
  };

  const handleSecondaryAction = () => {
    if (secondaryAction?.onClick) {
      secondaryAction.onClick();
    } else if (secondaryAction?.label === "Go back") {
      window.history.back();
    } else if (secondaryAction?.href) {
      window.location.href = secondaryAction.href;
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-4 py-16 bg-background",
        className
      )}
    >
      <div className="w-full max-w-lg text-center">
        {/* Illustration */}
        <div className="mb-8">
          {illustration || <ErrorIllustration variant={variant} />}
        </div>

        {/* Error Code */}
        {code && (
          <p className="text-sm font-medium text-primary mb-2">{code} Error</p>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight mb-4">{title}</h1>

        {/* Description */}
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {description}
        </p>

        {/* Estimated Time (for maintenance) */}
        {estimatedTime && variant === "maintenance" && (
          <div className="mb-8 p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm text-muted-foreground">
              Estimated completion time
            </p>
            <p className="font-semibold">{estimatedTime}</p>
          </div>
        )}

        {/* Search (for 404) */}
        {showSearch && (
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-sm mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          {primaryAction && (
            <Button
              variant={primaryAction.variant || "default"}
              size="lg"
              onClick={handlePrimaryAction}
              className="min-w-[140px]"
            >
              {primaryAction.label === "Go back home" && (
                <Home className="size-4 mr-2" />
              )}
              {primaryAction.label === "Try again" && (
                <RefreshCw className="size-4 mr-2" />
              )}
              {primaryAction.label}
            </Button>
          )}

          {secondaryAction && (
            <Button
              variant={secondaryAction.variant || "outline"}
              size="lg"
              onClick={handleSecondaryAction}
              className="min-w-[140px]"
            >
              {secondaryAction.label === "Go back" && (
                <ArrowLeft className="size-4 mr-2" />
              )}
              {secondaryAction.label}
            </Button>
          )}
        </div>

        {/* Helpful Links */}
        {helpfulLinks && helpfulLinks.length > 0 && (
          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Here are some helpful links:
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {helpfulLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Demo Component (shows all variants)
// =============================================================================

export default function ErrorDemo() {
  const [activeVariant, setActiveVariant] = useState<ErrorVariant>("not-found");

  const variants: { id: ErrorVariant; label: string }[] = [
    { id: "not-found", label: "404" },
    { id: "server-error", label: "500" },
    { id: "forbidden", label: "403" },
    { id: "maintenance", label: "Maintenance" },
    { id: "offline", label: "Offline" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Variant Selector */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {variants.map((v) => (
              <Button
                key={v.id}
                variant={activeVariant === v.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveVariant(v.id)}
              >
                {v.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Page */}
      <ErrorPage
        variant={activeVariant}
        showSearch={activeVariant === "not-found"}
        onSearch={(query) => console.log("Search:", query)}
        estimatedTime={activeVariant === "maintenance" ? "30 minutes" : undefined}
        onRetry={() => console.log("Retry clicked")}
        helpfulLinks={
          activeVariant === "not-found"
            ? [
                { label: "Documentation", href: "/docs" },
                { label: "API Reference", href: "/api" },
                { label: "Support", href: "/support" },
                { label: "Blog", href: "/blog" },
              ]
            : undefined
        }
      />
    </div>
  );
}


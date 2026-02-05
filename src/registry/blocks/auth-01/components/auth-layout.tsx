"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// =============================================================================
// Auth Layout Component
// =============================================================================

interface AuthLayoutProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  heading: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  variant?: "card" | "split";
  splitImage?: string;
  splitContent?: React.ReactNode;
}

export function AuthLayout({
  children,
  logo,
  heading,
  description,
  footer,
  className,
  variant = "card",
  splitImage,
  splitContent,
}: AuthLayoutProps) {
  if (variant === "split") {
    return (
      <section className={cn("min-h-screen w-full", className)}>
        <div className="grid min-h-screen lg:grid-cols-2">
          {/* Left Side - Image/Content */}
          <div
            className={cn(
              "relative hidden lg:flex flex-col justify-between p-10 overflow-hidden",
              "bg-accent text-white"
            )}
          >
            {splitImage && (
              <img
                src={splitImage}
                alt="Authentication"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover h-full w-full"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            {logo && <div className="relative z-10">{logo}</div>}
            {splitContent && <div className="relative z-10">{splitContent}</div>}
          </div>

          {/* Right Side - Form */}
          <div className="flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
            <div className="mx-auto w-full max-w-md">
              {logo && (
                <div className="mb-4 flex items-center gap-2 justify-center lg:hidden">
                  {logo}
                </div>
              )}

              <div className="mb-6 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
                {description && (
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                )}
              </div>

              {children}

              {footer && <div className="mt-6">{footer}</div>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Card variant (default)
  return (
    <section
      className={cn(
        "min-h-screen w-full flex items-center justify-center bg-muted/30 p-4",
        className
      )}
    >
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader className="text-center">
          {logo && <div className="flex justify-center mb-2">{logo}</div>}
          <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>

        <CardContent>{children}</CardContent>

        {footer && <CardFooter className="flex flex-col gap-4">{footer}</CardFooter>}
      </Card>
    </section>
  );
}

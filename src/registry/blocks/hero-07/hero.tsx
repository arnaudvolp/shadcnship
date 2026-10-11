"use client";

import { useId, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface Hero07Props {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  helperText?: string;
  image?: {
    src: string;
    alt: string;
  } | null;
  // Submit handler — wire it to your email provider or database
  onSubmit?: (email: string) => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Hero07 = ({
  badge = "Now in private beta",
  title = "Get early access before",
  highlight = "launch day",
  description = "Leave your email and we'll let you know the moment the doors open. One message, no noise.",
  inputPlaceholder = "you@company.com",
  buttonText = "Get early access",
  helperText = "No spam. Unsubscribe at any time.",
  image = {
    src: "https://www.shadcnship.com/images/placeholders/hero-architecture-1.webp",
    alt: "Product preview",
  },
  onSubmit,
  successMessage = "You're on the list. We'll email you when we launch.",
  errorMessage = "Something went wrong. Please try again.",
  className,
}: Hero07Props) => {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setStatus("success");
      setMessage(successMessage);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(errorMessage);
    }
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-16 md:py-24",
        className,
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {badge && (
            <Badge
              variant="secondary"
              className="gap-2 border border-border px-4 py-1"
            >
              <span
                className="size-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span>{badge}</span>
            </Badge>
          )}

          <h1 className="max-w-2xl text-4xl leading-tight font-medium tracking-tight md:text-5xl lg:text-6xl">
            {title}{" "}
            {highlight && (
              <em className="font-serif font-normal italic">{highlight}</em>
            )}
          </h1>

          <p className="max-w-md text-muted-foreground md:text-lg">
            {description}
          </p>

          <div className="mt-2 flex w-full max-w-md flex-col items-center gap-2">
            {status !== "success" && (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex w-full flex-col gap-2 sm:flex-row"
              >
                <label htmlFor={emailId} className="sr-only">
                  Email address
                </label>
                <Input
                  id={emailId}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={inputPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  aria-invalid={status === "error"}
                  disabled={status === "loading"}
                  className="h-10 sm:flex-1"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto"
                >
                  {status === "loading" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      {buttonText}
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <p
              role="status"
              aria-live="polite"
              className={cn(
                "text-xs text-muted-foreground",
                status === "error" && "text-destructive",
                status === "success" && "py-2 text-sm font-medium text-foreground",
              )}
            >
              {status === "error" || status === "success"
                ? message
                : helperText}
            </p>
          </div>

          {image && (
            <div className="relative mt-8 w-2/3 max-w-xs sm:w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-3/4 w-full rounded-lg bg-muted object-cover"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero07;

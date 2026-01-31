"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============================================================================
// Types
// ============================================================================

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface Waitlist01Props {
  badge?: string;
  heading?: string;
  description?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  // Submit handler - injected by stack-specific hooks
  onSubmit?: (email: string) => Promise<void>;
  // Messages
  successMessage?: string;
  errorMessage?: string;
  // Social proof
  socialProof?: {
    avatars: string[];
    text: string;
  };
  className?: string;
}

// ============================================================================
// Email Validation
// ============================================================================

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ============================================================================
// Main Component
// ============================================================================

const Waitlist01 = ({
  badge = "Coming Soon",
  heading = "Join the Waiting List",
  description = "Be amongst the first to experience our product. Sign up to be notified when we launch!",
  inputPlaceholder = "Enter your email",
  buttonText = "Join waitlist",
  onSubmit,
  successMessage = "You're on the list! We'll notify you when we launch.",
  errorMessage = "Something went wrong. Please try again.",
  socialProof = {
    avatars: [
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png",
    ],
    text: "Join 2,500+ others on the waitlist",
  },
  className,
}: Waitlist01Props) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Demo mode - simulate success
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setStatus("success");
      setMessage(successMessage);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : errorMessage);
    }
  };

  const isDisabled = status === "loading" || status === "success";

  return (
    <section className={cn("container mx-auto px-6 py-12 md:py-24", className)}>
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        {/* Badge */}
        <Badge variant="outline" className="gap-1.5 uppercase">
          <div className="size-1.5 rounded-full bg-primary" />
          {badge}
        </Badge>

        {/* Heading */}
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {heading}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground">{description}</p>

        {/* Email Form */}
        <form onSubmit={handleSubmit}>
          <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border bg-background p-1.5 shadow-sm">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={inputPlaceholder}
              disabled={isDisabled}
              className="flex-1 rounded-full border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button
              type="submit"
              disabled={isDisabled}
              className="rounded-full px-6"
            >
              {status === "loading" && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              {buttonText}
            </Button>
          </div>
        </form>

        {/* Status Message */}
        {message && (
          <div
            className={cn(
              "flex items-center justify-center gap-2 text-sm",
              status === "success" && "text-green-600 dark:text-green-400",
              status === "error" && "text-red-600 dark:text-red-400"
            )}
          >
            {status === "success" && <CheckCircle2 className="size-4" />}
            {status === "error" && <XCircle className="size-4" />}
            {message}
          </div>
        )}

        {/* Social Proof */}
        {socialProof && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {socialProof.avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`User ${index + 1}`}
                  className="size-8 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{socialProof.text}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export { Waitlist01 };
export type { Waitlist01Props };

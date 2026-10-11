"use client";

import { useId, useState } from "react";
import { ArrowRight, Hexagon, Loader2, MailCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface ForgotPassword01Props {
  logo?: React.ReactNode;
  image?: string;
  tagline?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  backLink?: { text: string; href: string };
  // Send the reset email (Supabase, Auth.js, your API…). Throw to show an error.
  onSubmit?: (email: string) => Promise<void>;
  successTitle?: string;
  errorMessage?: string;
  className?: string;
}

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const ForgotPassword01 = ({
  logo = (
    <div className="flex items-center gap-2">
      <Hexagon className="size-5" aria-hidden="true" />
      <span className="font-semibold tracking-tight">Acme</span>
    </div>
  ),
  image = "https://www.shadcnship.com/images/placeholders/hero-architecture-5.webp",
  tagline = "Simplify the process. Ship the results.",
  subtitle = "Focus on the big picture while we handle the details.",
  title = "Forgot your password?",
  description = "Enter the email linked to your account and we'll send you a reset link.",
  buttonText = "Send reset link",
  backLink = { text: "Back to log in", href: "#" },
  onSubmit,
  successTitle = "Check your inbox",
  errorMessage = "Something went wrong. Please try again.",
  className,
}: ForgotPassword01Props) => {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const send = async (address: string) => {
    setStatus("loading");
    setMessage("");
    try {
      if (onSubmit) {
        await onSubmit(address);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setSentTo(address);
      setStatus("success");
      setMessage(`We sent a reset link to ${address}.`);
    } catch {
      setStatus("error");
      setMessage(errorMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    send(email);
  };

  return (
    <section
      className={cn(
        "flex min-h-screen w-full items-center justify-center px-4 py-12",
        className,
      )}
    >
      <Card className="grid w-full max-w-4xl gap-0 overflow-hidden p-3 md:grid-cols-5">
        {/* Visual panel — hidden on mobile */}
        <div className="relative hidden overflow-hidden rounded-md md:col-span-2 md:block">
          {image && (
            <img
              src={image}
              alt=""
              className="absolute inset-0 size-full bg-muted object-cover"
            />
          )}
          <div
            className="absolute inset-0 bg-linear-to-b from-background/90 via-background/30 to-transparent"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-2 p-6">
            <p className="text-2xl leading-tight font-medium tracking-tight">
              {tagline}
            </p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex flex-col items-center justify-center px-4 py-12 md:col-span-3 md:px-12 md:py-20">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
              {logo}
              <h1 className="text-2xl font-semibold tracking-tight">
                {status === "success" ? successTitle : title}
              </h1>
              {status !== "success" && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-muted">
                  <MailCheck className="size-5" aria-hidden="true" />
                </span>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => send(sentTo)}
                >
                  Resend email
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor={emailId}>Email</Label>
                  <Input
                    id={emailId}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    aria-invalid={status === "error"}
                    aria-describedby={`${emailId}-status`}
                    disabled={status === "loading"}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={status === "loading"}
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
              id={`${emailId}-status`}
              role="status"
              aria-live="polite"
              className={cn(
                "text-center text-sm",
                status === "error"
                  ? "text-destructive"
                  : "text-muted-foreground",
                (status === "idle" || status === "loading") && "sr-only",
              )}
            >
              {message}
            </p>

            <p className="text-center text-sm text-muted-foreground">
              Remembered it?{" "}
              <a
                href={backLink.href}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {backLink.text}
              </a>
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ForgotPassword01;

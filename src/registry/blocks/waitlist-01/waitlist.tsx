"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import type { SubmitStatus, TimeLeft, Waitlist01Props } from "./types";
import { isValidEmail, submitToProvider } from "./providers";

// ============================================================================
// Helper Components
// ============================================================================

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl font-semibold tabular-nums md:text-2xl">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-xs uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
  </div>
);

const CountdownSeparator = () => (
  <span className="text-2xl font-light text-muted-foreground/50">:</span>
);

// ============================================================================
// Main Component
// ============================================================================

const Waitlist01 = ({
  badge = "Available in early 2026",
  heading = "Join the Waiting List",
  description = "Be amongst the first to experience our product. Sign up to be notified when we launch!",
  inputPlaceholder = "Enter your email",
  buttonText = "Join waitlist",
  provider,
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
  countdown,
  className,
}: Waitlist01Props) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Default countdown: 30 days from now
  const defaultTargetTime = useMemo(
    () => Date.now() + 30 * 24 * 60 * 60 * 1000,
    [],
  );

  const targetTimestamp = useMemo(() => {
    if (!countdown?.targetDate) return defaultTargetTime;
    return typeof countdown.targetDate === "number"
      ? countdown.targetDate
      : countdown.targetDate.getTime();
  }, [countdown?.targetDate, defaultTargetTime]);

  const countdownLabel = countdown?.label ?? "Left until launch";

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetTimestamp - Date.now();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  // Form submission
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
      await submitToProvider(email, provider, onSubmit);
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
              status === "error" && "text-red-600 dark:text-red-400",
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

        {/* Countdown Timer */}
        <div className="mt-6">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownSeparator />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownSeparator />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownSeparator />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
          {countdownLabel && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <Calendar className="size-4 text-muted-foreground" />
              <span className="text-xs font-medium uppercase">
                {countdownLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Waitlist01 };
export type { Waitlist01Props, WaitlistProvider } from "./types";

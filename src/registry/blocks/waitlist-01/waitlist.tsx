"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Waitlist01Props {
  badge?: string;
  heading?: string;
  description?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  socialProof?: {
    avatars: string[];
    text: string;
  };
  countdown?: {
    targetDate: Date | number;
    label?: string;
  };
  className?: string;
}

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

const Waitlist01 = ({
  badge = "Avaible in early 2026",
  heading = "Join the Waiting list",
  description = "Be amongst the first to experience our product. Sign up to be notified when we launch!",
  inputPlaceholder = "Enter your email",
  buttonText = "Join waitlist",
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

  return (
    <section className={cn("container mx-auto px-6 py-12 md:py-24", className)}>
      <div className="mx-auto max-w-2xl text-center space-y-4">
        {/* Badge */}
        <Badge variant="outline" className="gap-1.5 uppercase">
          <div className="rounded-full bg-primary w-1.5 h-1.5"></div>
          {badge}
        </Badge>

        {/* Heading */}
        <h2 className=" text-4xl font-semibold tracking-tight md:text-5xl">
          {heading}
        </h2>

        {/* Description */}
        <p className=" text-muted-foreground">{description}</p>

        {/* Email Form */}
        <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border bg-background p-1.5 shadow-sm">
          <Input
            type="email"
            placeholder={inputPlaceholder}
            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 rounded-full"
          />
          <Button className="rounded-full px-6">{buttonText}</Button>
        </div>

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
              <span className="uppercase text-xs font-medium">
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

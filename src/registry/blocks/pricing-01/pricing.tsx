"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface Plan {
  name: string;
  prices: {
    monthly: string;
    yearly: string;
  };
  features: string[];
  popular?: boolean;
  cta: { text: string; url: string };
}

interface Pricing01Props {
  title?: string;
  description?: string;
  plans?: Plan[];
  className?: string;
}

const Pricing01 = ({
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that fits your needs. No hidden fees.",
  plans = [
    {
      name: "Starter",
      prices: { monthly: "$0", yearly: "$0" },
      features: [
        "All core components",
        "Community support",
        "Free updates",
        "Free support",
      ],
      cta: { text: "Get Started", url: "#" },
    },
    {
      name: "Pro",
      prices: { monthly: "$49", yearly: "$490" },
      popular: true,
      features: [
        "Everything in Starter",
        "Premium components",
        "Priority support",
        "Early access",
        "Pro support",
        "Free updates",
        "Community support",
      ],
      cta: { text: "Start Free Trial", url: "#" },
    },
    {
      name: "Enterprise",
      prices: { monthly: "$99", yearly: "$790" },
      features: [
        "Everything in Pro",
        "Custom components",
        "Dedicated support",
        "SLA guarantee",
        "Early access",
        "Pro support",
        "Free updates",
        "Community support",
      ],
      cta: { text: "Contact Sales", url: "#" },
    },
  ],
  className,
}: Pricing01Props) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-16 md:py-24",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground">{description}</p>
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "text-sm",
                !isAnnual ? "font-semibold" : "text-muted-foreground",
              )}
            >
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span
              className={cn(
                "text-sm",
                isAnnual ? "font-semibold" : "text-muted-foreground",
              )}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="lg: mt-12 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex w-full max-w-md flex-col",
                plan.popular ? "border-2 border-foreground" : "",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium whitespace-nowrap text-background">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader>
                <h3 className="text-2xl font-medium">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-semibold">
                    {isAnnual ? plan.prices.yearly : plan.prices.monthly}
                  </span>
                  <span className="text-muted-foreground">
                    {isAnnual ? "/year" : "/month"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                <Separator />
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4">
                      <CircleCheck className="size-4 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <a href={plan.cta.url}>{plan.cta.text}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing01;

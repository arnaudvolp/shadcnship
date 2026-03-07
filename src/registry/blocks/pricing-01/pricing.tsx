"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface PricingPlan {
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
  plans?: PricingPlan[];
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
      prices: { monthly: "$99", yearly: "$990" },
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
    <section className={cn("w-full py-12 md:py-24", className)}>
      <div className="container mx-auto px-8">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground md:text-lg">{description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span
              className={cn(
                !isAnnual ? "font-medium" : "text-muted-foreground",
              )}
            >
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span
              className={cn(isAnnual ? "font-medium" : "text-muted-foreground")}
            >
              Yearly
            </span>
          </div>
        </div>
        <div className="mx-auto grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="relative">
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most Popular</Badge>
                </div>
              )}
              <Card
                className={cn(
                  "flex h-full flex-col gap-4",
                  plan.popular && "border-2 border-primary",
                )}
              >
                <CardHeader className="flex flex-col gap-4">
                  <CardTitle className="text-3xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-medium">
                      {isAnnual ? plan.prices.yearly : plan.prices.monthly}
                    </span>
                    <span className="text-muted-foreground">
                      {isAnnual ? "/year" : "/month"}
                    </span>
                  </div>
                </CardHeader>
                <div className="px-4">
                  <Separator />
                </div>
                <CardContent className="flex-1">
                  <ul className="flex flex-col gap-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CircleCheck className="size-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    <a href={plan.cta.url}>{plan.cta.text}</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Pricing01 };

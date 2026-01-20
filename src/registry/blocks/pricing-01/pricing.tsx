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
import { CircleCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  popular?: boolean;
  button: { text: string; url: string };
}

interface Pricing01Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
  className?: string;
}

const Pricing01 = ({
  heading = "Simple, Transparent Pricing",
  description = "Choose the plan that fits your needs. No hidden fees.",
  plans = [
    {
      id: "starter",
      name: "Starter",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      features: [
        { text: "All core components" },
        { text: "Community support" },
        { text: "Free updates" },
        { text: "Free support" },
      ],
      button: { text: "Get Started", url: "#" },
    },
    {
      id: "pro",
      name: "Pro",
      monthlyPrice: "$49",
      yearlyPrice: "$490",
      popular: true,
      features: [
        { text: "Everything in Starter" },
        { text: "Premium components" },
        { text: "Priority support" },
        { text: "Early access" },
        { text: "Pro support" },
        { text: "Free updates" },
        { text: "Community support" },
      ],
      button: { text: "Start Free Trial", url: "#" },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: "$99",
      yearlyPrice: "$990",
      features: [
        { text: "Everything in Pro" },
        { text: "Custom components" },
        { text: "Dedicated support" },
        { text: "SLA guarantee" },
        { text: "Early access" },
        { text: "Pro support" },
        { text: "Free updates" },
        { text: "Community support" },
        ],
      button: { text: "Contact Sales", url: "#" },
    },
  ],
  className,
}: Pricing01Props) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className={cn("w-full py-12 md:py-24", className)}>
      <div className="container mx-auto px-6 ">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm">
            <span className={cn(!isYearly ? "font-medium" : "text-muted-foreground")}>
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={cn(isYearly ? "font-medium" : "text-muted-foreground")}>
              Yearly
            </span>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3  mx-auto">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most Popular</Badge>
                </div>
              )}
              <Card className={cn("flex h-full flex-col max-w-md mx-auto gap-4", plan.popular && "border-primary border-2")}>
                <CardHeader>
                  <CardTitle className="mt-4 text-3xl">{plan.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>
                </CardHeader>
                <div className="px-4 my-2">
                  <Separator />
                </div>
                <CardContent className="flex-1 ">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-center gap-2">
                        <CircleCheck className="size-4 shrink-0 text-primary" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                    <a href={plan.button.url}>{plan.button.text}</a>
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

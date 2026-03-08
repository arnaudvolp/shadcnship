"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Plan {
  name: string;
  prices: {
    monthly: string;
    yearly: string;
  };
  description: string;
  features: string[];
  popular?: boolean;
  cta: { text: string; url: string };
}

interface Pricing03Props {
  title?: string;
  description?: string;
  plans?: Plan[];
  className?: string;
}

const Pricing03 = ({
  title = "Flexible Plans for Every Budget",
  description = "Choose the plan that fits your needs. No hidden fees.",
  plans = [
    {
      name: "Free",
      prices: { monthly: "$0", yearly: "$0" },
      description: "Great for personal projects and exploration.",
      features: ["50+ components", "Community support", "Free updates"],
      cta: { text: "Get Started", url: "#" },
    },
    {
      name: "Pro",
      prices: { monthly: "$12", yearly: "$99" },
      description: "Perfect for professionals and small teams.",
      features: [
        "200+ components",
        "Priority support",
        "Premium templates",
        "API access",
      ],
      popular: true,
      cta: { text: "Start Free Trial", url: "#" },
    },
    {
      name: "Enterprise",
      prices: { monthly: "$49", yearly: "$399" },
      description: "For large teams with custom needs.",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "Custom components",
        "SLA guarantee",
      ],
      cta: { text: "Contact Sales", url: "#" },
    },
  ],
  className,
}: Pricing03Props) => {
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

          <Tabs
            value={isAnnual ? "yearly" : "monthly"}
            onValueChange={(value) => setIsAnnual(value === "yearly")}
          >
            <TabsList className="border">
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="data-[state=active]:rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Annual
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 lg:flex-row lg:items-stretch">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex w-full max-w-sm flex-col gap-4 rounded-sm p-6 shadow-none lg:min-h-[450px]",
                plan.popular &&
                  "bg-primary text-primary-foreground dark:bg-foreground",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">{plan.name}</h3>
                {plan.popular && (
                  <Badge variant="secondary">Most Popular</Badge>
                )}
              </div>

              <p className="text-4xl font-medium">
                {isAnnual ? plan.prices.yearly : plan.prices.monthly}
                <span className="text-base font-normal opacity-80">
                  /{isAnnual ? "year" : "month"}
                </span>
              </p>

              <p
                className={cn(
                  "line-clamp-2 min-h-10 text-sm",
                  plan.popular ? "opacity-80" : "text-muted-foreground",
                )}
              >
                {plan.description}
              </p>

              <Button
                variant={plan.popular ? "secondary" : "outline"}
                className="w-full"
                asChild
              >
                <a href={plan.cta.url}>{plan.cta.text}</a>
              </Button>

              <Separator
                className={cn(plan.popular && "bg-primary-foreground/20")}
              />

              <p className="text-sm font-medium">What&apos;s included:</p>

              <ul className="flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Pricing03 };

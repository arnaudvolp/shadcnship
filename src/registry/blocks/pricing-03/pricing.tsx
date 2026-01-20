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
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface Pricing03Props {
  heading?: string;
  description?: string;
  plans?: Plan[];
  className?: string;
}

const Pricing03 = ({
  heading = "Flexible Plans for Every Budget",
  description = "Choose the plan that fits your needs. No hidden fees.",
  plans = [
    {
      name: "Free",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      description: "Great for personal projects and exploration.",
      features: ["50+ components", "Community support", "Free updates"],
    },
    {
      name: "Pro",
      monthlyPrice: "$12",
      yearlyPrice: "$99",
      description: "Perfect for professionals and small teams.",
      features: ["200+ components", "Priority support", "Premium templates", "API access"],
      popular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: "$49",
      yearlyPrice: "$399",
      description: "For large teams with custom needs.",
      features: ["Everything in Pro", "Dedicated support", "Custom components", "SLA guarantee"],
    },
  ],
  className,
}: Pricing03Props) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className={cn("container mx-auto py-12 md:py-24", className)}>
      <div className="px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        </div>
        <Card className="mb-8 w-fit mx-auto p-0 overflow-hidden mt-4">
          <Tabs
            value={isYearly ? "yearly" : "monthly"}
            onValueChange={(value) => setIsYearly(value === "yearly")}
          >
            <TabsList>
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Annual
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>
        <div className="grid items-center gap-6 md:grid-cols-3">
          {plans.map((plan, i) => {
            const pop = plan.popular;
            return (
              <Card
                key={i}
                className={cn(
                  "flex flex-col p-6",
                  pop && "z-10 scale-105 bg-primary dark:bg-foreground text-primary-foreground shadow-xl md:-my-4"
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-medium">{plan.name}</h3>
                  {pop && <Badge variant="secondary">Most Popular</Badge>}
                </div>
                <p className="mb-2 text-4xl font-bold">
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  <span className="text-base font-normal opacity-80">
                    /{isYearly ? "year" : "month"}
                  </span>
                </p>
                <p className={cn("text-sm mb-4", pop ? "opacity-80" : "text-muted-foreground")}>
                  {plan.description}
                </p>
                <Button variant={pop ? "secondary" : "outline"} className="w-full mb-4">
                  Get Started
                </Button>
                <Separator className={cn(pop && "bg-primary-foreground/20")} />
                <p className="mb-4 mt-4 text-sm font-medium">What&apos;s included:</p>
                <ul className="space-y-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Pricing03 };

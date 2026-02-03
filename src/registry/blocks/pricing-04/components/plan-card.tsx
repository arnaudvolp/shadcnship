"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PriceDisplay } from "./price-display";
import { FeatureList } from "./feature-list";
import type { PricingPlan, BillingInterval } from "../types/pricing";

interface PlanCardProps {
  plan: PricingPlan;
  interval: BillingInterval;
  onCheckout?: (priceId: string, mode: "payment" | "subscription") => Promise<void>;
  className?: string;
}

export function PlanCard({
  plan,
  interval,
  onCheckout,
  className,
}: PlanCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isFree = plan.monthlyPrice === 0 && plan.yearlyPrice === 0;

  const handleClick = async () => {
    // If no Stripe integration or free plan, use regular href
    if (!onCheckout || isFree || !plan.stripePriceId) {
      if (plan.cta.href) {
        window.location.href = plan.cta.href;
      }
      return;
    }

    // Stripe checkout
    setIsLoading(true);
    try {
      const priceId =
        interval === "yearly"
          ? plan.stripePriceId.yearly
          : plan.stripePriceId.monthly;
      await onCheckout(priceId, "subscription");
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "relative flex flex-col p-6",
        plan.highlighted &&
          "z-10 scale-105 border-primary bg-primary text-primary-foreground shadow-xl md:-my-4",
        className
      )}
    >
      {/* Badge */}
      {plan.badge && (
        <Badge
          variant={plan.highlighted ? "secondary" : "default"}
          className="absolute -top-3 left-1/2 -translate-x-1/2"
        >
          {plan.badge}
        </Badge>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <p
          className={cn(
            "mt-1 text-sm",
            plan.highlighted
              ? "text-primary-foreground/80"
              : "text-muted-foreground"
          )}
        >
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <PriceDisplay
        monthlyPrice={plan.monthlyPrice}
        yearlyPrice={plan.yearlyPrice}
        currency={plan.currency}
        interval={interval}
        highlighted={plan.highlighted}
        className="mb-4"
      />

      {/* CTA Button */}
      <Button
        variant={plan.highlighted ? "secondary" : "outline"}
        className="w-full"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
        {plan.cta.text}
      </Button>

      {/* Separator */}
      <Separator
        className={cn("my-6", plan.highlighted && "bg-primary-foreground/20")}
      />

      {/* Features */}
      <div className="flex-1">
        <p
          className={cn(
            "mb-4 text-sm font-medium",
            plan.highlighted
              ? "text-primary-foreground"
              : "text-foreground"
          )}
        >
          What&apos;s included:
        </p>
        <FeatureList features={plan.features} highlighted={plan.highlighted} />
      </div>
    </Card>
  );
}

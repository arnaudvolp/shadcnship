"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BillingToggle } from "./components/billing-toggle";
import { PlanCard } from "./components/plan-card";
import type { Pricing04Props, BillingInterval, PricingPlan, PricingFeature } from "./types/pricing";

// ============================================================================
// Default Plans Data
// ============================================================================

const defaultPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for side projects and small teams getting started.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: "USD",
    features: [
      { text: "Up to 5 projects", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: true },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
      { text: "Priority support", included: false },
    ],
    cta: { text: "Get Started", href: "#" },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams that need more power and flexibility.",
    monthlyPrice: 29,
    yearlyPrice: 290,
    currency: "USD",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority email support", included: true },
      { text: "API access", included: true },
      { text: "Custom integrations", included: true },
      { text: "Priority support", included: false },
    ],
    highlighted: true,
    badge: "Most Popular",
    cta: { text: "Start Free Trial" },
    stripePriceId: {
      monthly: "price_pro_monthly",
      yearly: "price_pro_yearly",
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs and SLA requirements.",
    monthlyPrice: 99,
    yearlyPrice: 990,
    currency: "USD",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Custom analytics", included: true },
      { text: "Dedicated support", included: true },
      { text: "Advanced API access", included: true },
      { text: "Custom integrations", included: true },
      { text: "SLA guarantee", included: true },
    ],
    cta: { text: "Contact Sales", href: "#" },
    stripePriceId: {
      monthly: "price_enterprise_monthly",
      yearly: "price_enterprise_yearly",
    },
  },
];

// ============================================================================
// Main Component
// ============================================================================

const Pricing04 = ({
  heading = "Simple, Transparent Pricing",
  description = "Choose the plan that fits your needs. No hidden fees, cancel anytime.",
  plans = defaultPlans,
  className,
  onCheckout,
}: Pricing04Props) => {
  const [interval, setInterval] = useState<BillingInterval>("monthly");

  // Calculate yearly discount percentage
  const yearlyDiscount = plans[1]
    ? Math.round(
        ((plans[1].monthlyPrice * 12 - plans[1].yearlyPrice) /
          (plans[1].monthlyPrice * 12)) *
          100
      )
    : 17;

  return (
    <section className={cn("w-full py-12 md:py-24", className)}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>

          {/* Billing Toggle */}
          <BillingToggle
            value={interval}
            onChange={setInterval}
            yearlyDiscount={yearlyDiscount}
            className="mt-8"
          />
        </div>

        {/* Plans Grid */}
        <div className="mx-auto grid max-w-5xl items-center gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              interval={interval}
              onCheckout={onCheckout}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Pricing04 };
export type { Pricing04Props, PricingPlan, PricingFeature, BillingInterval };

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Zap, Building2, Check } from "lucide-react";
import type { BillingInfo } from "../types/settings";

interface BillingSettingsProps {
  billing: BillingInfo;
  onManageBilling?: () => void;
  onChangePlan?: () => void;
  className?: string;
}

const planDetails = {
  free: {
    name: "Free",
    price: "$0",
    icon: Zap,
    features: ["5 projects", "1GB storage", "Community support"],
  },
  pro: {
    name: "Pro",
    price: "$19",
    icon: Zap,
    features: ["Unlimited projects", "100GB storage", "Priority support", "Advanced analytics"],
  },
  enterprise: {
    name: "Enterprise",
    price: "Custom",
    icon: Building2,
    features: ["Everything in Pro", "Dedicated support", "Custom integrations", "SLA guarantee"],
  },
};

export function BillingSettings({
  billing,
  onManageBilling,
  onChangePlan,
  className,
}: BillingSettingsProps) {
  const currentPlan = planDetails[billing.plan];
  const Icon = currentPlan.icon;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the {currentPlan.name} plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="size-6 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{currentPlan.name}</h3>
                  <Badge variant="secondary">Current</Badge>
                </div>
                <p className="text-2xl font-bold">
                  {currentPlan.price}
                  {billing.plan !== "enterprise" && (
                    <span className="text-sm font-normal text-muted-foreground">
                      /{billing.billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onChangePlan}>
              Change plan
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <p className="text-sm font-medium">Plan features</p>
            <ul className="grid gap-1.5">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {billing.nextBillingDate && (
            <>
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground">
                Your next billing date is{" "}
                <span className="font-medium text-foreground">
                  {new Date(billing.nextBillingDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Manage your payment methods and billing information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {billing.paymentMethod ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                  <CreditCard className="size-5 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">
                    {billing.paymentMethod.brand} •••• {billing.paymentMethod.last4}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expires {billing.paymentMethod.expiresAt}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onManageBilling}>
                Update
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                No payment method on file
              </p>
              <Button variant="outline" size="sm" onClick={onManageBilling}>
                Add payment method
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View and download your past invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-4">
              No billing history available
            </p>
            <Button variant="outline" size="sm" onClick={onManageBilling}>
              View all invoices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

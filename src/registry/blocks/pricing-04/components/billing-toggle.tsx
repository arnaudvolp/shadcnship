"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BillingInterval } from "../types/pricing";

interface BillingToggleProps {
  value: BillingInterval;
  onChange: (value: BillingInterval) => void;
  yearlyDiscount?: number;
  className?: string;
}

export function BillingToggle({
  value,
  onChange,
  yearlyDiscount = 17,
  className,
}: BillingToggleProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <Tabs
        value={value}
        onValueChange={(v) => onChange(v as BillingInterval)}
      >
        <TabsList className="h-10">
          <TabsTrigger
            value="monthly"
            className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger
            value="yearly"
            className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Yearly
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {yearlyDiscount > 0 && (
        <p className="text-sm text-muted-foreground">
          Save {yearlyDiscount}% with yearly billing
        </p>
      )}
    </div>
  );
}

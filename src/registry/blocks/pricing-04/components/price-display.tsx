"use client";

import { cn } from "@/lib/utils";
import type { BillingInterval } from "../types/pricing";

interface PriceDisplayProps {
  monthlyPrice: number;
  yearlyPrice: number;
  currency: "EUR" | "USD";
  interval: BillingInterval;
  highlighted?: boolean;
  className?: string;
}

const currencySymbols = {
  EUR: "\u20AC",
  USD: "$",
};

export function PriceDisplay({
  monthlyPrice,
  yearlyPrice,
  currency,
  interval,
  highlighted,
  className,
}: PriceDisplayProps) {
  const price = interval === "yearly" ? yearlyPrice : monthlyPrice;
  const displayPrice = interval === "yearly" ? Math.round(price / 12) : price;
  const symbol = currencySymbols[currency];

  return (
    <div className={cn("flex items-baseline gap-1", className)}>
      <span
        className={cn(
          "text-4xl font-bold tracking-tight",
          highlighted && "text-primary-foreground"
        )}
      >
        {symbol}
        {displayPrice}
      </span>
      <span
        className={cn(
          "text-sm",
          highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        /month
      </span>
      {interval === "yearly" && (
        <span
          className={cn(
            "ml-2 text-xs",
            highlighted ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          (billed {symbol}
          {yearlyPrice}/year)
        </span>
      )}
    </div>
  );
}

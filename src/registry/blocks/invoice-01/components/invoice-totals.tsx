"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import type { Invoice } from "../types/invoice";

interface InvoiceTotalsProps {
  invoice: Invoice;
  className?: string;
}

export function InvoiceTotals({ invoice, className }: InvoiceTotalsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: invoice.currency,
    }).format(amount);
  };

  return (
    <div className={cn("flex justify-end", className)}>
      <div className="w-full max-w-xs space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(invoice.subtotal)}</span>
        </div>

        {invoice.discount !== undefined && invoice.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-green-600">-{formatCurrency(invoice.discount)}</span>
          </div>
        )}

        {invoice.taxRate !== undefined && invoice.taxAmount !== undefined && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
            <span>{formatCurrency(invoice.taxAmount)}</span>
          </div>
        )}

        <Separator className="my-2" />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatCurrency(invoice.total)}</span>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Amount Due ({invoice.currency})</span>
          <span className="font-medium text-foreground text-base">
            {formatCurrency(invoice.status === "paid" ? 0 : invoice.total)}
          </span>
        </div>
      </div>
    </div>
  );
}

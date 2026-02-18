"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import type { Invoice } from "../types/invoice";

interface InvoiceFooterProps {
  invoice: Invoice;
  className?: string;
}

export function InvoiceFooter({ invoice, className }: InvoiceFooterProps) {
  if (!invoice.notes && !invoice.paymentTerms) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <Separator />

      {invoice.paymentTerms && (
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Payment Terms</h4>
          <p className="text-sm text-muted-foreground">{invoice.paymentTerms}</p>
        </div>
      )}

      {invoice.notes && (
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Notes</h4>
          <p className="text-sm text-muted-foreground">{invoice.notes}</p>
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground pt-4">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
}

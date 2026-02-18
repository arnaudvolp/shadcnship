"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Invoice, InvoiceStatus } from "../types/invoice";

interface InvoiceHeaderProps {
  invoice: Invoice;
  className?: string;
}

const statusConfig: Record<InvoiceStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Draft", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
  paid: { label: "Paid", variant: "default" },
  overdue: { label: "Overdue", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "secondary" },
};

export function InvoiceHeader({ invoice, className }: InvoiceHeaderProps) {
  const status = statusConfig[invoice.status];

  return (
    <div className={cn("flex flex-col sm:flex-row justify-between gap-6", className)}>
      {/* Company Logo & Info */}
      <div className="space-y-1">
        {invoice.company.logo ? (
          <img
            src={invoice.company.logo}
            alt={invoice.company.name}
            className="h-10 w-auto object-contain"
          />
        ) : (
          <h2 className="text-2xl font-bold">{invoice.company.name}</h2>
        )}
        {invoice.company.website && (
          <p className="text-sm text-muted-foreground">{invoice.company.website}</p>
        )}
        {invoice.company.taxId && (
          <p className="text-sm text-muted-foreground">Tax ID: {invoice.company.taxId}</p>
        )}
      </div>

      {/* Invoice Info */}
      <div className="text-left sm:text-right space-y-1">
        <div className="flex items-center gap-3 sm:justify-end">
          <h1 className="text-2xl font-bold">Invoice</h1>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        <p className="text-lg font-mono text-muted-foreground">#{invoice.number}</p>
        <div className="text-sm text-muted-foreground space-y-0.5">
          <p>Issue Date: {formatDate(invoice.issueDate)}</p>
          <p>Due Date: {formatDate(invoice.dueDate)}</p>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

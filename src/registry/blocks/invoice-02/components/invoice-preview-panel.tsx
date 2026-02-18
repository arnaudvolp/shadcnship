"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import type { InvoicePreview } from "../types/invoice";

interface InvoicePreviewPanelProps {
  preview: InvoicePreview;
  companyName: string;
  companyAddress: string;
  companyLogo?: React.ReactNode;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  currency?: string;
}

export function InvoicePreviewPanel({
  preview,
  companyName,
  companyAddress,
  companyLogo,
  bankName,
  accountName,
  accountNumber,
  currency = "USD",
}: InvoicePreviewPanelProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy");
    } catch {
      return dateString;
    }
  };

  const paymentTermsLabels: Record<string, string> = {
    due_on_receipt: "Due on Receipt",
    net_7: "Net 7",
    net_14: "Net 14",
    net_30: "Net 30",
    net_60: "Net 60",
  };

  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Invoice Preview Card */}
        <div className="bg-background rounded-lg border shadow-sm p-6 space-y-6">
          {/* Header with logo */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {companyLogo ? (
                companyLogo
              ) : (
                <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {companyName.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <p className="font-medium text-foreground">{preview.invoiceNumber}</p>
            </div>
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-muted-foreground mb-1">Issue Date</p>
              <p className="font-medium">{formatDate(preview.issueDate)}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Due Date</p>
              <p className="font-medium">{formatDate(preview.dueDate)}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Payment Terms</p>
              <p className="font-medium">
                {paymentTermsLabels[preview.paymentTerms] || preview.paymentTerms}
              </p>
            </div>
          </div>

          {/* Billed By / To */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <p className="text-muted-foreground">Billed by</p>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-medium">{companyName}</p>
                <p className="text-muted-foreground whitespace-pre-line">
                  {companyAddress}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Billed to</p>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-medium">
                  {preview.customer?.name || "No customer selected"}
                </p>
                <p className="text-muted-foreground whitespace-pre-line">
                  {preview.billingAddress || "No address"}
                </p>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[1fr,80px,100px,100px] bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground">
              <div>Item</div>
              <div className="text-center">QTY</div>
              <div className="text-right">Cost</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="divide-y">
              {preview.lineItems.length > 0 ? (
                preview.lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr,80px,100px,100px] px-3 py-2 text-xs"
                  >
                    <div>{item.description || "Untitled"}</div>
                    <div className="text-center">
                      {item.quantity} {item.unit}
                    </div>
                    <div className="text-right">{formatCurrency(item.unitPrice)}</div>
                    <div className="text-right font-medium">
                      {formatCurrency(item.amount)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-3 py-4 text-xs text-muted-foreground text-center">
                  No items added
                </div>
              )}
            </div>
          </div>

          {/* Bank Info and Totals */}
          <div className="grid grid-cols-2 gap-4">
            {/* Bank Info */}
            {(bankName || accountName || accountNumber) && (
              <div className="space-y-2 text-xs">
                {bankName && (
                  <div>
                    <p className="text-muted-foreground">Bank Name</p>
                    <p className="font-medium">{bankName}</p>
                  </div>
                )}
                {accountName && (
                  <div>
                    <p className="text-muted-foreground">Account Name</p>
                    <p className="font-medium">{accountName}</p>
                  </div>
                )}
                {accountNumber && (
                  <div>
                    <p className="text-muted-foreground">Account Number</p>
                    <p className="font-medium">{accountNumber}</p>
                  </div>
                )}
              </div>
            )}

            {/* Totals */}
            <div className="space-y-2 text-xs ml-auto w-[200px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(preview.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span>{formatCurrency(preview.discountAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (11%)</span>
                <span>{formatCurrency(preview.taxAmount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-sm">
                <span>Total</span>
                <span>{formatCurrency(preview.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {preview.notes && (
            <div className="text-xs">
              <p className="text-muted-foreground mb-1">Notes</p>
              <p className="text-muted-foreground whitespace-pre-line">
                {preview.notes}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

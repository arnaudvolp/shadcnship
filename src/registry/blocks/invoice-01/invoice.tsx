"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  InvoiceHeader,
  InvoiceAddresses,
  InvoiceLineItems,
  InvoiceTotals,
  InvoiceFooter,
  InvoiceActions,
} from "./components";
import type { Invoice, InvoiceProps } from "./types/invoice";

// =============================================================================
// Demo Invoice Data
// =============================================================================

const demoInvoice: Invoice = {
  id: "inv-001",
  number: "INV-2024-001",
  status: "pending",
  issueDate: "2024-01-15",
  dueDate: "2024-02-15",
  currency: "USD",
  company: {
    name: "Acme Inc.",
    logo: undefined,
    website: "www.acme.com",
    taxId: "US123456789",
    address: {
      name: "Acme Inc.",
      address: "123 Business Ave, Suite 100",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "United States",
      email: "billing@acme.com",
      phone: "+1 (555) 123-4567",
    },
  },
  billTo: {
    name: "John Doe",
    company: "Tech Startup LLC",
    address: "456 Innovation Way",
    city: "Austin",
    state: "TX",
    postalCode: "78701",
    country: "United States",
    email: "john@techstartup.com",
  },
  lineItems: [
    {
      id: "1",
      description: "Website Design & Development",
      quantity: 1,
      unitPrice: 5000,
      total: 5000,
    },
    {
      id: "2",
      description: "Logo Design Package",
      quantity: 1,
      unitPrice: 1500,
      total: 1500,
    },
    {
      id: "3",
      description: "Monthly Hosting (12 months)",
      quantity: 12,
      unitPrice: 29,
      total: 348,
    },
    {
      id: "4",
      description: "SEO Optimization",
      quantity: 1,
      unitPrice: 800,
      total: 800,
    },
  ],
  subtotal: 7648,
  taxRate: 8.25,
  taxAmount: 630.96,
  discount: 500,
  total: 7778.96,
  paymentTerms: "Payment is due within 30 days of invoice date. Please include the invoice number with your payment.",
  notes: "Thank you for choosing Acme Inc. We appreciate your business and look forward to working with you again!",
};

// =============================================================================
// Print Styles (injected into document)
// =============================================================================

const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    .invoice-container, .invoice-container * {
      visibility: visible;
    }
    .invoice-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px;
    }
    .print\\:hidden {
      display: none !important;
    }
  }
`;

// =============================================================================
// Main Component
// =============================================================================

export default function Invoice01({
  invoice = demoInvoice,
  onPrint,
  onDownload,
  className,
}: InvoiceProps) {
  return (
    <>
      {/* Print styles */}
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className={cn("w-full max-w-4xl mx-auto", className)}>
        {/* Actions Bar */}
        <div className="flex justify-end mb-4">
          <InvoiceActions onPrint={onPrint} onDownload={onDownload} />
        </div>

        {/* Invoice Card */}
        <Card className="invoice-container">
          <CardContent className="p-8 space-y-8">
            {/* Header */}
            <InvoiceHeader invoice={invoice} />

            <Separator />

            {/* Addresses */}
            <InvoiceAddresses company={invoice.company} billTo={invoice.billTo} />

            {/* Line Items */}
            <InvoiceLineItems items={invoice.lineItems} currency={invoice.currency} />

            {/* Totals */}
            <InvoiceTotals invoice={invoice} />

            {/* Footer */}
            <InvoiceFooter invoice={invoice} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// =============================================================================
// Named Exports
// =============================================================================

export { Invoice01 };

// Re-export types
export type {
  Invoice,
  InvoiceProps,
  InvoiceStatus,
  InvoiceAddress,
  InvoiceLineItem,
  InvoiceCompany,
} from "./types/invoice";

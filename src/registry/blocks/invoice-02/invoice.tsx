"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, Send } from "lucide-react";
import { InvoiceForm, InvoicePreviewPanel } from "./components";
import { LogoIcon } from "@/registry/blocks/social-icons/icons";
import type {
  InvoiceFormData,
  InvoiceLineItem,
  InvoicePreview,
  InvoiceCreateProps,
  Customer,
} from "./types/invoice";

// =============================================================================
// Demo Data
// =============================================================================

const demoCustomers: Customer[] = [
  {
    id: "cust_1",
    name: "PT Nusantara Digital Solusi",
    email: "finance@nusantara.co.id",
    address:
      "Jl. Jendral Sudirman No. 45, Jakarta Selatan, DKI Jakarta 12190 Indonesia",
  },
  {
    id: "cust_2",
    name: "Studio Aria Digital",
    email: "billing@studioaria.com",
    address:
      "Jl. Jatiwu No. 5, Sawahan 9, Sambireho, Kec. Dau, Kabupaten Malang, Jawa Timur 65151",
  },
  {
    id: "cust_3",
    name: "Acme Corporation",
    email: "accounts@acme.com",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94102, USA",
  },
];

const initialFormData: InvoiceFormData = {
  customer: demoCustomers[0],
  billingAddress: demoCustomers[0].address,
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  paymentTerms: "net_14",
  lineItems: [
    {
      id: "item_1",
      description: "Dashboard UI Design",
      quantity: 10,
      unit: "page",
      unitPrice: 750000,
      amount: 7500000,
    },
    {
      id: "item_2",
      description: "Mobile App",
      quantity: 100,
      unit: "page",
      unitPrice: 50000,
      amount: 5000000,
    },
  ],
  discount: 500000,
  taxRate: 11,
  notes:
    "Thank you for your trust. Please complete the payment before the due date.\nFor any questions, feel free to contact us.",
};

// =============================================================================
// Invoice Create Component
// =============================================================================

export default function InvoiceCreate({
  customers = demoCustomers,
  defaultCustomer,
  companyName = "Shadcnship",
  companyAddress = "123 Design Street, Suite 456\nSan Francisco, CA 94102\nUnited States",
  companyLogo,
  bankName = "Bank Central Asia (BCA)",
  accountName = "Shadcnship LLC",
  accountNumber = "123 456 7890",
  onSaveDraft,
  onSendInvoice,
  className,
}: InvoiceCreateProps) {
  const [formData, setFormData] = useState<InvoiceFormData>(() => ({
    ...initialFormData,
    customer: defaultCustomer || initialFormData.customer,
    billingAddress:
      defaultCustomer?.address || initialFormData.billingAddress,
  }));
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Generate invoice number (stable per session using timestamp)
  const [invoiceNumber] = useState(() => {
    const date = new Date();
    const seq = String(date.getTime()).slice(-3);
    return `INV-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${seq}`;
  });

  // Calculate preview data
  const preview: InvoicePreview = useMemo(() => {
    const subtotal = formData.lineItems.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const discountAmount = formData.discount;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * formData.taxRate) / 100;
    const total = taxableAmount + taxAmount;

    return {
      ...formData,
      invoiceNumber,
      subtotal,
      discountAmount,
      taxAmount,
      total,
    };
  }, [formData, invoiceNumber]);

  // Form handlers
  const handleFormChange = (updates: Partial<InvoiceFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleAddLineItem = () => {
    const newItem: InvoiceLineItem = {
      id: `item_${Date.now()}`,
      description: "",
      quantity: 1,
      unit: "item",
      unitPrice: 0,
      amount: 0,
    };
    setFormData((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem],
    }));
  };

  const handleUpdateLineItem = (
    id: string,
    updates: Partial<InvoiceLineItem>
  ) => {
    setFormData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const handleRemoveLineItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((item) => item.id !== id),
    }));
  };

  // Action handlers
  const handleSaveDraft = async () => {
    if (onSaveDraft) {
      setIsSaving(true);
      try {
        await onSaveDraft(formData);
      } finally {
        setIsSaving(false);
      }
    } else {
      // Demo: just log
      console.log("Saving draft:", formData);
    }
  };

  const handleSendInvoice = async () => {
    if (onSendInvoice) {
      setIsSending(true);
      try {
        await onSendInvoice(formData);
      } finally {
        setIsSending(false);
      }
    } else {
      // Demo: just log
      console.log("Sending invoice:", formData);
    }
  };

  // Default logo
  const logo = companyLogo || (
    <LogoIcon className="size-10" />
  );

  return (
    <div className={cn("w-full max-w-7xl mx-auto", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Button variant="ghost" size="sm" className="mb-2 -ml-3">
            <ChevronLeft className="size-4 mr-1" />
            Back to home
          </Button>
          <h1 className="text-2xl font-bold">Create New Invoice</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            <Save className="size-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={handleSendInvoice} disabled={isSending}>
            <Send className="size-4 mr-2" />
            Send Invoice
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <InvoiceForm
          formData={formData}
          customers={customers}
          onFormChange={handleFormChange}
          onAddLineItem={handleAddLineItem}
          onUpdateLineItem={handleUpdateLineItem}
          onRemoveLineItem={handleRemoveLineItem}
          currency="IDR"
        />

        {/* Preview */}
        <InvoicePreviewPanel
          preview={preview}
          companyName={companyName}
          companyAddress={companyAddress}
          companyLogo={logo}
          bankName={bankName}
          accountName={accountName}
          accountNumber={accountNumber}
          currency="IDR"
        />
      </div>
    </div>
  );
}

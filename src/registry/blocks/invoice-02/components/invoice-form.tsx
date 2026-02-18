"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineItemRow } from "./line-item-row";
import { Plus, Calendar } from "lucide-react";
import type {
  InvoiceFormData,
  InvoiceLineItem,
  Customer,
  PaymentTerms,
} from "../types/invoice";

interface InvoiceFormProps {
  formData: InvoiceFormData;
  customers: Customer[];
  onFormChange: (data: Partial<InvoiceFormData>) => void;
  onAddLineItem: () => void;
  onUpdateLineItem: (id: string, updates: Partial<InvoiceLineItem>) => void;
  onRemoveLineItem: (id: string) => void;
  currency?: string;
}

const paymentTermsOptions: { value: PaymentTerms; label: string }[] = [
  { value: "due_on_receipt", label: "Due on Receipt" },
  { value: "net_7", label: "Net 7" },
  { value: "net_14", label: "Net 14" },
  { value: "net_30", label: "Net 30" },
  { value: "net_60", label: "Net 60" },
];

export function InvoiceForm({
  formData,
  customers,
  onFormChange,
  onAddLineItem,
  onUpdateLineItem,
  onRemoveLineItem,
  currency = "USD",
}: InvoiceFormProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      onFormChange({
        customer,
        billingAddress: customer.address,
      });
    }
  };

  const handlePaymentTermsChange = (terms: PaymentTerms) => {
    onFormChange({ paymentTerms: terms });
    // Auto-calculate due date based on terms
    const issueDate = new Date(formData.issueDate);
    let daysToAdd = 0;
    switch (terms) {
      case "net_7":
        daysToAdd = 7;
        break;
      case "net_14":
        daysToAdd = 14;
        break;
      case "net_30":
        daysToAdd = 30;
        break;
      case "net_60":
        daysToAdd = 60;
        break;
      default:
        daysToAdd = 0;
    }
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + daysToAdd);
    onFormChange({ dueDate: dueDate.toISOString().split("T")[0] });
  };

  // Calculate totals
  const subtotal = formData.lineItems.reduce((sum, item) => sum + item.amount, 0);
  const discountAmount = formData.discount;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * formData.taxRate) / 100;
  const total = taxableAmount + taxAmount;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer */}
        <div className="space-y-2">
          <Label htmlFor="customer">
            Customer <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.customer?.id || ""}
            onValueChange={handleCustomerChange}
          >
            <SelectTrigger id="customer">
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Billing Address */}
        <div className="space-y-2">
          <Label htmlFor="address">
            Billing Address <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="address"
            value={formData.billingAddress}
            onChange={(e) => onFormChange({ billingAddress: e.target.value })}
            placeholder="Enter billing address"
            rows={2}
          />
        </div>

        {/* Dates and Payment Terms */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="issueDate">
              Issue Date <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => onFormChange({ issueDate: e.target.value })}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">
              Due Date <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => onFormChange({ dueDate: e.target.value })}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentTerms">
              Payment Terms <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.paymentTerms}
              onValueChange={(v) => handlePaymentTermsChange(v as PaymentTerms)}
            >
              <SelectTrigger id="paymentTerms">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentTermsOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Line Items */}
        <div className="space-y-2">
          <Label>
            Items Details <span className="text-destructive">*</span>
          </Label>
          <div className="border rounded-lg">
            {/* Header */}
            <div className="grid grid-cols-[1fr,80px,100px,120px,120px,40px] gap-2 px-3 py-2 bg-muted/50 text-sm font-medium text-muted-foreground border-b">
              <div>Item</div>
              <div className="text-center">QTY</div>
              <div>Unit</div>
              <div className="text-right">Cost</div>
              <div className="text-right">Amount</div>
              <div></div>
            </div>
            {/* Items */}
            <div className="px-3 divide-y">
              {formData.lineItems.map((item) => (
                <LineItemRow
                  key={item.id}
                  item={item}
                  onUpdate={onUpdateLineItem}
                  onRemove={onRemoveLineItem}
                  currency={currency}
                />
              ))}
            </div>
            {/* Add Item */}
            <div className="px-3 py-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddLineItem}
                className="text-muted-foreground"
              >
                <Plus className="size-4 mr-1" />
                Add item
              </Button>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="discount">
              Discount <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{currency}</span>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) =>
                  onFormChange({ discount: parseFloat(e.target.value) || 0 })
                }
                min={0}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax">
              Tax (PPN 11%) <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{currency}</span>
              <Input
                id="tax"
                value={formatCurrency(taxAmount).replace(/[^0-9.,]/g, "")}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="total">
              Total <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{currency}</span>
              <Input
                id="total"
                value={formatCurrency(total).replace(/[^0-9.,]/g, "")}
                readOnly
                className="bg-muted font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">
            Notes to Customer <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => onFormChange({ notes: e.target.value })}
            placeholder="Thank you for your trust. Please complete the payment before the due date. For any questions, feel free to contact us."
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}

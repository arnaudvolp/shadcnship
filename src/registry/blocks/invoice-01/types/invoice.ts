// =============================================================================
// Invoice Types
// =============================================================================

export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled";

export interface InvoiceAddress {
  name: string;
  company?: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceCompany {
  name: string;
  logo?: string;
  address: InvoiceAddress;
  taxId?: string;
  website?: string;
}

export interface Invoice {
  id: string;
  number: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  company: InvoiceCompany;
  billTo: InvoiceAddress;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxRate?: number;
  taxAmount?: number;
  discount?: number;
  total: number;
  currency: string;
  notes?: string;
  paymentTerms?: string;
}

export interface InvoiceProps {
  invoice?: Invoice;
  onPrint?: () => void;
  onDownload?: () => void;
  className?: string;
}

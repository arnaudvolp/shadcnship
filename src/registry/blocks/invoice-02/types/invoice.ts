// =============================================================================
// Invoice Creation Types
// =============================================================================

export type PaymentTerms = "net_7" | "net_14" | "net_30" | "net_60" | "due_on_receipt";

export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface InvoiceFormData {
  customer: Customer | null;
  billingAddress: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: PaymentTerms;
  lineItems: InvoiceLineItem[];
  discount: number;
  taxRate: number;
  notes: string;
}

export interface InvoicePreview extends InvoiceFormData {
  invoiceNumber: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
}

export interface InvoiceCreateProps {
  customers?: Customer[];
  defaultCustomer?: Customer;
  companyName?: string;
  companyAddress?: string;
  companyLogo?: React.ReactNode;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  onSaveDraft?: (data: InvoiceFormData) => Promise<void>;
  onSendInvoice?: (data: InvoiceFormData) => Promise<void>;
  className?: string;
}

export interface InvoiceFormProps {
  formData: InvoiceFormData;
  customers: Customer[];
  onFormChange: (data: Partial<InvoiceFormData>) => void;
  onAddLineItem: () => void;
  onUpdateLineItem: (id: string, updates: Partial<InvoiceLineItem>) => void;
  onRemoveLineItem: (id: string) => void;
}

export interface InvoicePreviewPanelProps {
  preview: InvoicePreview;
  companyName: string;
  companyAddress: string;
  companyLogo?: React.ReactNode;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
}

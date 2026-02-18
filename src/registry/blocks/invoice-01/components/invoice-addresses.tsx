"use client";

import { cn } from "@/lib/utils";
import type { InvoiceAddress, InvoiceCompany } from "../types/invoice";

interface InvoiceAddressesProps {
  company: InvoiceCompany;
  billTo: InvoiceAddress;
  className?: string;
}

function AddressBlock({ title, address }: { title: string; address: InvoiceAddress }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="text-sm space-y-0.5">
        <p className="font-medium">{address.name}</p>
        {address.company && <p>{address.company}</p>}
        <p>{address.address}</p>
        <p>
          {address.city}
          {address.state && `, ${address.state}`} {address.postalCode}
        </p>
        <p>{address.country}</p>
        {address.email && (
          <p className="text-muted-foreground">{address.email}</p>
        )}
        {address.phone && (
          <p className="text-muted-foreground">{address.phone}</p>
        )}
      </div>
    </div>
  );
}

export function InvoiceAddresses({ company, billTo, className }: InvoiceAddressesProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-8", className)}>
      <AddressBlock title="From" address={company.address} />
      <AddressBlock title="Bill To" address={billTo} />
    </div>
  );
}

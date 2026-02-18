"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import type { InvoiceLineItem } from "../types/invoice";

interface LineItemRowProps {
  item: InvoiceLineItem;
  onUpdate: (id: string, updates: Partial<InvoiceLineItem>) => void;
  onRemove: (id: string) => void;
  currency?: string;
}

const units = [
  { value: "page", label: "page" },
  { value: "hour", label: "hour" },
  { value: "item", label: "item" },
  { value: "unit", label: "unit" },
  { value: "day", label: "day" },
  { value: "month", label: "month" },
];

export function LineItemRow({
  item,
  onUpdate,
  onRemove,
  currency = "USD",
}: LineItemRowProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleQuantityChange = (value: string) => {
    const qty = parseInt(value) || 0;
    onUpdate(item.id, {
      quantity: qty,
      amount: qty * item.unitPrice,
    });
  };

  const handleUnitPriceChange = (value: string) => {
    const price = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    onUpdate(item.id, {
      unitPrice: price,
      amount: item.quantity * price,
    });
  };

  return (
    <div className="grid grid-cols-[1fr,80px,100px,120px,120px,40px] gap-2 items-center py-2">
      <Input
        value={item.description}
        onChange={(e) => onUpdate(item.id, { description: e.target.value })}
        placeholder="Item description"
        className="h-9"
      />
      <Input
        type="number"
        value={item.quantity}
        onChange={(e) => handleQuantityChange(e.target.value)}
        min={0}
        className="h-9 text-center"
      />
      <Select
        value={item.unit}
        onValueChange={(v) => onUpdate(item.id, { unit: v })}
      >
        <SelectTrigger className="h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {units.map((u) => (
            <SelectItem key={u.value} value={u.value}>
              {u.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={item.unitPrice}
        onChange={(e) => handleUnitPriceChange(e.target.value)}
        className="h-9 text-right"
      />
      <div className="text-right font-medium text-sm pr-2">
        {formatCurrency(item.amount)}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

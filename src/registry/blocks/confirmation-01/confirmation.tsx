"use client";

import { X, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LogoIcon } from "../social-icons/icons";

// =============================================================================
// TYPES
// =============================================================================

interface OrderItem {
  name: string;
  description?: string;
  price: number;
}

interface PaymentConfirmationProps {
  customerEmail?: string;
  orderId?: string;
  productName?: string;
  items?: OrderItem[];
  subtotal?: number;
  discount?: { label: string; amount: number; percentage?: number };
  total?: number;
  onClose?: () => void;
  onContinue?: () => void;
  className?: string;
}

// =============================================================================
// DEFAULT DATA
// =============================================================================

const defaultItems: OrderItem[] = [
  { name: "Pro Plan - Lifetime", description: "One-time payment", price: 149 },
  { name: "Priority Support", description: "12 months included", price: 0 },
];

const defaultDiscount = {
  label: "Early Bird Discount",
  amount: 30,
  percentage: 20,
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function PaymentConfirmation({
  customerEmail = "hello@shadcnship.com",
  orderId = "ORD-2026-0847",
  productName = "ShadcnShip Pro",
  items = defaultItems,
  subtotal = 149,
  discount = defaultDiscount,
  total = 119,
  onClose,
  onContinue,
  className,
}: PaymentConfirmationProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center bg-muted p-4",
        className,
      )}
    >
      <Card className="flex w-full max-w-4xl flex-col md:flex-row overflow-hidden shadow-xl p-2">
        {/* Left Panel - Success Message */}
        <div className="flex flex-1 flex-col items-center justify-center p-8 md:p-12">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/20" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-primary shadow-lg">
              <LogoIcon className="size-10 invert dark:invert-0" />
            </div>
          </div>

          {/* Message */}
          <h2 className="mb-3 text-center text-2xl font-semibold tracking-tight">
            Payment Successful!
          </h2>
          <p className="mb-8 max-w-sm text-center text-muted-foreground">
            Thank you for your purchase. A confirmation email has been sent to{" "}
            <span className="font-medium text-foreground">{customerEmail}</span>
          </p>

          {/* Actions */}
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Button size="lg" className="w-full" onClick={onContinue}>
              Go to Dashboard
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Download className="mr-2 size-4" />
              Download Invoice
            </Button>
          </div>
        </div>

        {/* Right Panel - Order Summary */}
        <div className="relative flex flex-1 flex-col bg-muted rounded-lg p-6 md:p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className=" rounded-full  absolute top-4 right-4 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
          {/* Header */}
          <h3 className=" text-lg font-semibold my-6">Order Summary</h3>

          {/* Order Info */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Order ID
              </p>
              <p className="font-mono text-sm">{orderId}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Product
              </p>
              <p className="font-medium">{productName}</p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Items */}
          <div className="rounded-lg border bg-background p-4">
            {items.map((item, index) => (
              <div key={index}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-medium">
                    {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}
                  </p>
                </div>
                {index < items.length - 1 && <Separator className="my-3" />}
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{discount.label}</span>
                <span className="text-primary">
                  - ${discount.amount.toFixed(2)}
                  {discount.percentage && (
                    <span className="ml-1 text-xs">
                      ({discount.percentage}%)
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="mt-6 text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Total Paid
            </p>
            <p className="text-3xl font-bold text-primary">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

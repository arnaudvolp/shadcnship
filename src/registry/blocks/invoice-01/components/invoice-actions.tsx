"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

interface InvoiceActionsProps {
  onPrint?: () => void;
  onDownload?: () => void;
  className?: string;
}

export function InvoiceActions({ onPrint, onDownload, className }: InvoiceActionsProps) {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className={cn("flex gap-2 print:hidden", className)}>
      <Button variant="outline" size="sm" onClick={handlePrint}>
        <Printer className="size-4 mr-2" />
        Print
      </Button>
      {onDownload && (
        <Button variant="outline" size="sm" onClick={onDownload}>
          <Download className="size-4 mr-2" />
          Download PDF
        </Button>
      )}
    </div>
  );
}

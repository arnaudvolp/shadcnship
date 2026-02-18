"use client";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function CommandDialog({
  open,
  onOpenChange,
  children,
  className,
}: CommandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "overflow-hidden p-0 shadow-lg max-w-[640px]",
          className
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

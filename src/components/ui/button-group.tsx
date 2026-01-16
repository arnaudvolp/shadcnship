import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse",
        "[&>*:first-child]:rounded-l-md [&>*:first-child]:rounded-r-none",
        "[&>*:last-child]:rounded-l-none [&>*:last-child]:rounded-r-md",
        "[&>*:not(:first-child):not(:last-child)]:rounded-none",
        "[&>*]:shadow-none",
        className
      )}
    >
      {children}
    </div>
  );
}

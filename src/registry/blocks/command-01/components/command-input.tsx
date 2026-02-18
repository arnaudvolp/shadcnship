"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ value, onValueChange, placeholder = "Type a command or search...", className, ...props }, ref) => {
    return (
      <div className={cn("flex items-center border-b px-3", className)}>
        <Search className="mr-2 size-4 shrink-0 text-muted-foreground" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">esc</span>
        </kbd>
      </div>
    );
  }
);

CommandInput.displayName = "CommandInput";

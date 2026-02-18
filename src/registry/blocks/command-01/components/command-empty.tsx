"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface CommandEmptyProps {
  message?: string;
  className?: string;
}

export function CommandEmpty({
  message = "No results found.",
  className,
}: CommandEmptyProps) {
  return (
    <div className={cn("py-6 text-center", className)}>
      <Search className="mx-auto size-8 text-muted-foreground/50 mb-2" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

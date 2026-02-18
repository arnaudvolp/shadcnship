"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CommandListProps {
  children: React.ReactNode;
  className?: string;
}

export function CommandList({ children, className }: CommandListProps) {
  return (
    <ScrollArea className={cn("max-h-[400px] overflow-y-auto", className)}>
      <div className="p-2">{children}</div>
    </ScrollArea>
  );
}

interface CommandGroupProps {
  heading: string;
  children: React.ReactNode;
  className?: string;
}

export function CommandGroup({ heading, children, className }: CommandGroupProps) {
  return (
    <div className={cn("mb-2", className)}>
      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
        {heading}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

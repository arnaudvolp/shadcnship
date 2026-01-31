"use client";

import { useState } from "react";
import { Check, ChevronDown, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBlockContext } from "@/providers/block-provider";
import { stackConfigs, type StackConfig } from "@/config/stacks";

// Default icon when stack doesn't have one
const DefaultIcon = () => <Database className="size-4 text-muted-foreground" />;

export function StackSelector() {
  const { selectedStack, setSelectedStack, availableStacks } = useBlockContext();
  const [open, setOpen] = useState(false);

  // Filter stack configs to only show available stacks
  const filteredStacks = stackConfigs.filter((stack) =>
    availableStacks.includes(stack.id)
  );

  // Don't render if no stacks are available
  if (availableStacks.length === 0) {
    return null;
  }

  const currentStack = stackConfigs.find((s) => s.id === selectedStack);

  const handleSelect = (stack: StackConfig) => {
    setSelectedStack(stack.id);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 md:min-w-[140px] justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="size-3.5 [&>svg]:size-3.5">
              {currentStack?.icon || <DefaultIcon />}
            </span>
            <span className="font-normal hidden md:inline">
              {currentStack?.label || "Select stack"}
            </span>
          </div>
          <ChevronDown className="size-3.5 text-muted-foreground hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <div className="p-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Stack Examples
          </p>
        </div>
        {filteredStacks.map((stack) => (
          <DropdownMenuItem
            key={stack.id}
            onClick={() => handleSelect(stack)}
            className="cursor-pointer gap-2 py-2"
          >
            <span className="size-4 [&>svg]:size-4">
              {stack.icon || <DefaultIcon />}
            </span>
            <div className="flex-1">
              <span className="font-medium">{stack.label}</span>
              <p className="text-xs text-muted-foreground">{stack.description}</p>
            </div>
            {selectedStack === stack.id && (
              <Check className="size-4 text-green-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

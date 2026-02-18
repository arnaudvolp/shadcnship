"use client";

import { cn } from "@/lib/utils";

interface ChipSelectProps {
  options: { value: string; label: string }[];
  value?: string | null;
  onChange?: (value: string) => void;
  multiSelect?: boolean;
  selectedValues?: string[];
  onMultiChange?: (values: string[]) => void;
  className?: string;
}

export function ChipSelect({
  options,
  value,
  onChange,
  multiSelect = false,
  selectedValues = [],
  onMultiChange,
  className,
}: ChipSelectProps) {
  const handleClick = (optionValue: string) => {
    if (multiSelect && onMultiChange) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onMultiChange(newValues);
    } else if (onChange) {
      onChange(optionValue);
    }
  };

  const isSelected = (optionValue: string) => {
    if (multiSelect) {
      return selectedValues.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleClick(option.value)}
          className={cn(
            "px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            "border hover:border-foreground/50",
            isSelected(option.value)
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-foreground border-border hover:bg-muted/50"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

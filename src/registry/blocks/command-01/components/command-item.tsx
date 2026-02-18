"use client";

import { cn } from "@/lib/utils";

interface CommandItemProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  shortcut?: string[];
  selected?: boolean;
  disabled?: boolean;
  onSelect: () => void;
  className?: string;
}

export function CommandItem({
  icon,
  label,
  description,
  shortcut,
  selected,
  disabled,
  onSelect,
  className,
}: CommandItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none transition-colors",
        selected && "bg-accent text-accent-foreground",
        !selected && "hover:bg-accent/50",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {icon && <span className="mr-3 size-4 shrink-0">{icon}</span>}
      <div className="flex-1 text-left">
        <span className="font-medium">{label}</span>
        {description && (
          <span className="ml-2 text-muted-foreground">{description}</span>
        )}
      </div>
      {shortcut && shortcut.length > 0 && (
        <div className="ml-auto flex gap-1">
          {shortcut.map((key, index) => (
            <kbd
              key={index}
              className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
            >
              {key}
            </kbd>
          ))}
        </div>
      )}
    </button>
  );
}

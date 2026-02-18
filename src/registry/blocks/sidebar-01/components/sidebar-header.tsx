"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import type { SidebarHeaderProps } from "../types/sidebar";

export function SidebarHeader({
  logo,
  logoText = "Acme Inc",
  collapsed,
  onCollapsedChange,
}: SidebarHeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between px-4 border-b">
      <div className={cn("flex items-center gap-3 overflow-hidden", collapsed && "justify-center w-full")}>
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
          {logo || (
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5Z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          )}
        </div>
        {!collapsed && (
          <span className="font-semibold text-lg truncate">{logoText}</span>
        )}
      </div>
      {!collapsed && onCollapsedChange && (
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          onClick={() => onCollapsedChange(true)}
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose className="size-4" />
        </Button>
      )}
      {collapsed && onCollapsedChange && (
        <Button
          variant="ghost"
          size="icon"
          className="size-8 absolute -right-3 top-6 bg-background border shadow-sm rounded-full z-10"
          onClick={() => onCollapsedChange(false)}
          aria-label="Expand sidebar"
        >
          <PanelLeft className="size-4" />
        </Button>
      )}
    </div>
  );
}

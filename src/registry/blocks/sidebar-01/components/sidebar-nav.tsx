"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import type { SidebarNavProps, NavGroup, NavItem } from "../types/sidebar";

interface NavItemButtonProps {
  item: NavItem;
  collapsed?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItemButton({ item, collapsed, isActive, onClick }: NavItemButtonProps) {
  const content = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 h-10 px-3 font-normal",
        collapsed && "justify-center px-0",
        isActive && "bg-accent text-accent-foreground font-medium"
      )}
      onClick={onClick}
    >
      {item.icon && (
        <span className={cn("size-5 shrink-0", isActive && "text-primary")}>
          {item.icon}
        </span>
      )}
      {!collapsed && (
        <>
          <span className="truncate flex-1 text-left">{item.label}</span>
          {item.badge !== undefined && (
            <Badge
              variant={item.badgeVariant || "secondary"}
              className="ml-auto h-5 px-1.5 text-xs"
            >
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </Button>
  );

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {item.label}
          {item.badge !== undefined && (
            <Badge variant={item.badgeVariant || "secondary"} className="h-5 px-1.5 text-xs">
              {item.badge}
            </Badge>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

interface NavGroupSectionProps {
  group: NavGroup;
  collapsed?: boolean;
  activeItemId?: string;
  onNavigate?: (item: NavItem) => void;
}

function NavGroupSection({ group, collapsed, activeItemId, onNavigate }: NavGroupSectionProps) {
  const [isOpen, setIsOpen] = useState(group.defaultOpen !== false);

  // Non-collapsible group
  if (!group.collapsible || collapsed) {
    return (
      <div className="space-y-1">
        {group.label && !collapsed && (
          <div className="px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {group.label}
            </span>
          </div>
        )}
        {group.items.map((item) => (
          <NavItemButton
            key={item.id}
            item={item}
            collapsed={collapsed}
            isActive={item.id === activeItemId || item.isActive}
            onClick={() => {
              item.onClick?.();
              onNavigate?.(item);
            }}
          />
        ))}
      </div>
    );
  }

  // Collapsible group
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between h-9 px-3 font-normal text-muted-foreground hover:text-foreground"
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            {group.label}
          </span>
          <ChevronRight
            className={cn(
              "size-4 transition-transform duration-200",
              isOpen && "rotate-90"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pt-1">
        {group.items.map((item) => (
          <NavItemButton
            key={item.id}
            item={item}
            collapsed={collapsed}
            isActive={item.id === activeItemId || item.isActive}
            onClick={() => {
              item.onClick?.();
              onNavigate?.(item);
            }}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function SidebarNav({ groups, collapsed, activeItemId, onNavigate }: SidebarNavProps) {
  return (
    <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
      {groups.map((group) => (
        <NavGroupSection
          key={group.id}
          group={group}
          collapsed={collapsed}
          activeItemId={activeItemId}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

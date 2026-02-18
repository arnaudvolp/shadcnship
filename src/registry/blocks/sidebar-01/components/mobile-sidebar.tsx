"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarNav } from "./sidebar-nav";
import { SidebarUserMenu } from "./sidebar-user-menu";
import type { MobileSidebarProps } from "../types/sidebar";

export function MobileSidebar({
  open,
  onOpenChange,
  navigation = [],
  user,
  logo,
  logoText = "Acme Inc",
  activeItemId,
  onNavigate,
  onLogout,
  onSettings,
  onProfile,
}: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 flex flex-col">
        <SheetHeader className="h-16 flex flex-row items-center gap-3 px-4 border-b">
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
          <SheetTitle className="font-semibold text-lg">{logoText}</SheetTitle>
        </SheetHeader>

        <SidebarNav
          groups={navigation}
          collapsed={false}
          activeItemId={activeItemId}
          onNavigate={(item) => {
            onNavigate?.(item);
            onOpenChange?.(false);
          }}
        />

        {user && (
          <SidebarUserMenu
            user={user}
            collapsed={false}
            onLogout={onLogout}
            onSettings={onSettings}
            onProfile={onProfile}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

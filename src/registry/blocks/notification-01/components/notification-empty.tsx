"use client";

import { cn } from "@/lib/utils";
import { Bell, Inbox, AtSign } from "lucide-react";
import type { NotificationCategory } from "../types/notification";

interface NotificationEmptyProps {
  category: NotificationCategory;
  className?: string;
}

const emptyStates: Record<NotificationCategory, { icon: typeof Bell; title: string; description: string }> = {
  all: {
    icon: Bell,
    title: "No notifications",
    description: "You're all caught up! Check back later for updates.",
  },
  unread: {
    icon: Inbox,
    title: "All read",
    description: "You've read all your notifications.",
  },
  mentions: {
    icon: AtSign,
    title: "No mentions",
    description: "No one has mentioned you yet.",
  },
};

export function NotificationEmpty({ category, className }: NotificationEmptyProps) {
  const state = emptyStates[category];
  const Icon = state.icon;

  return (
    <div className={cn("flex flex-col items-center justify-center py-8 text-center", className)}>
      <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-medium">{state.title}</h3>
      <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
        {state.description}
      </p>
    </div>
  );
}

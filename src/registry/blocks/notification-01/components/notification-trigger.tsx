"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface NotificationTriggerProps {
  unreadCount: number;
  onClick?: () => void;
  className?: string;
}

export const NotificationTrigger = forwardRef<HTMLButtonElement, NotificationTriggerProps>(
  ({ unreadCount, onClick, className }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={cn("relative", className)}
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
        <span className="sr-only">
          {unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"}
        </span>
      </Button>
    );
  }
);

NotificationTrigger.displayName = "NotificationTrigger";

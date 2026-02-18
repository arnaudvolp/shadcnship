"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./notification-item";
import { NotificationEmpty } from "./notification-empty";
import type { Notification, NotificationCategory } from "../types/notification";

interface NotificationListProps {
  notifications: Notification[];
  category: NotificationCategory;
  onMarkAsRead?: (id: string) => void;
  onMarkAsUnread?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export function NotificationList({
  notifications,
  category,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  className,
}: NotificationListProps) {
  // Filter notifications based on category
  const filteredNotifications = notifications.filter((notification) => {
    if (category === "all") return true;
    if (category === "unread") return !notification.read;
    if (category === "mentions") return notification.type === "mention";
    return true;
  });

  if (filteredNotifications.length === 0) {
    return <NotificationEmpty category={category} />;
  }

  return (
    <ScrollArea className={cn("h-[350px]", className)}>
      <div className="space-y-1 p-1">
        {filteredNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onMarkAsUnread={onMarkAsUnread}
            onDelete={onDelete}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

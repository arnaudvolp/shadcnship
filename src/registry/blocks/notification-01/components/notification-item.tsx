"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Check,
  Circle,
  Trash2,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  AtSign,
  Settings,
} from "lucide-react";
import type { Notification, NotificationType } from "../types/notification";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onMarkAsUnread?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const typeIcons: Record<NotificationType, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  mention: AtSign,
  system: Settings,
};

const typeColors: Record<NotificationType, string> = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
  mention: "text-purple-500",
  system: "text-muted-foreground",
};

export function NotificationItem({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  className,
}: NotificationItemProps) {
  const Icon = typeIcons[notification.type];
  const iconColor = typeColors[notification.type];

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className={cn(
        "flex gap-3 p-3 hover:bg-muted/50 transition-colors rounded-lg",
        !notification.read && "bg-muted/30",
        className
      )}
    >
      {/* Avatar or Icon */}
      {notification.sender ? (
        <Avatar className="size-9 shrink-0">
          <AvatarImage src={notification.sender.avatar} />
          <AvatarFallback>{notification.sender.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ) : (
        <div className={cn("size-9 shrink-0 rounded-full bg-muted flex items-center justify-center", iconColor)}>
          <Icon className="size-4" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm font-medium", !notification.read && "text-foreground")}>
            {notification.title}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            {!notification.read && (
              <Circle className="size-2 fill-primary text-primary" />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-6">
                  <MoreHorizontal className="size-3.5" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {notification.read ? (
                  <DropdownMenuItem onClick={() => onMarkAsUnread?.(notification.id)}>
                    <Circle className="size-4 mr-2" />
                    Mark as unread
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => onMarkAsRead?.(notification.id)}>
                    <Check className="size-4 mr-2" />
                    Mark as read
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => onDelete?.(notification.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatTime(notification.createdAt)}
        </p>
        {notification.action && (
          <a
            href={notification.action.href}
            className="text-xs font-medium text-primary hover:underline inline-block mt-1"
          >
            {notification.action.label}
          </a>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCheck } from "lucide-react";
import {
  NotificationTrigger,
  NotificationList,
} from "./components";
import type { Notification, NotificationCategory, NotificationProps } from "./types/notification";

// =============================================================================
// Demo Notifications Data
// =============================================================================

const demoNotifications: Notification[] = [
  {
    id: "1",
    type: "mention",
    title: "New mention",
    message: "Sarah mentioned you in a comment: \"@you Can you review this PR?\"",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    sender: { name: "Sarah Connor", avatar: "https://avatar.vercel.sh/sarah" },
    action: { label: "View comment", href: "#" },
  },
  {
    id: "2",
    type: "success",
    title: "Deployment successful",
    message: "Your project was deployed to production successfully.",
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    action: { label: "View deployment", href: "#" },
  },
  {
    id: "3",
    type: "info",
    title: "New team member",
    message: "John Doe has joined your team as a developer.",
    read: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    sender: { name: "John Doe", avatar: "https://avatar.vercel.sh/john" },
  },
  {
    id: "4",
    type: "warning",
    title: "API rate limit warning",
    message: "You've used 80% of your API quota. Consider upgrading your plan.",
    read: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    action: { label: "Upgrade plan", href: "#" },
  },
  {
    id: "5",
    type: "error",
    title: "Build failed",
    message: "The latest build for project-x failed. Check the logs for details.",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    action: { label: "View logs", href: "#" },
  },
  {
    id: "6",
    type: "system",
    title: "Scheduled maintenance",
    message: "We'll perform scheduled maintenance on Sunday at 2:00 AM UTC.",
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// =============================================================================
// Demo Actions
// =============================================================================

const createDemoActions = (
  notifications: Notification[],
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
) => ({
  onMarkAsRead: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  },
  onMarkAsUnread: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
  },
  onMarkAllAsRead: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  },
  onDelete: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  },
});

// =============================================================================
// Loading Skeleton
// =============================================================================

function NotificationSkeleton() {
  return (
    <div className="space-y-3 p-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="size-9 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export default function Notification01({
  notifications: propNotifications,
  unreadCount: propUnreadCount,
  isLoading = false,
  onMarkAsRead,
  onMarkAsUnread,
  onMarkAllAsRead,
  onDelete,
  className,
}: NotificationProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");
  const [internalNotifications, setInternalNotifications] = useState(demoNotifications);

  // Use props if provided, otherwise use internal state
  const notifications = propNotifications ?? internalNotifications;
  const unreadCount = propUnreadCount ?? notifications.filter((n) => !n.read).length;

  // Create demo actions if not provided
  const demoActions = createDemoActions(internalNotifications, setInternalNotifications);
  const handleMarkAsRead = onMarkAsRead ?? demoActions.onMarkAsRead;
  const handleMarkAsUnread = onMarkAsUnread ?? demoActions.onMarkAsUnread;
  const handleMarkAllAsRead = onMarkAllAsRead ?? demoActions.onMarkAllAsRead;
  const handleDelete = onDelete ?? demoActions.onDelete;

  return (
    <div className={cn("inline-flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <NotificationTrigger unreadCount={unreadCount} />
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0" align="end">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto py-1 px-2 text-xs"
                onClick={handleMarkAllAsRead}
              >
                <CheckCheck className="size-3.5 mr-1" />
                Mark all read
              </Button>
            )}
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as NotificationCategory)}
          >
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Unread
                {unreadCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="mentions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Mentions
              </TabsTrigger>
            </TabsList>

            {isLoading ? (
              <NotificationSkeleton />
            ) : (
              <>
                <TabsContent value="all" className="m-0">
                  <NotificationList
                    notifications={notifications}
                    category="all"
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAsUnread={handleMarkAsUnread}
                    onDelete={handleDelete}
                  />
                </TabsContent>
                <TabsContent value="unread" className="m-0">
                  <NotificationList
                    notifications={notifications}
                    category="unread"
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAsUnread={handleMarkAsUnread}
                    onDelete={handleDelete}
                  />
                </TabsContent>
                <TabsContent value="mentions" className="m-0">
                  <NotificationList
                    notifications={notifications}
                    category="mentions"
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAsUnread={handleMarkAsUnread}
                    onDelete={handleDelete}
                  />
                </TabsContent>
              </>
            )}
          </Tabs>

          {/* Footer */}
          <div className="border-t p-2">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View all notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// =============================================================================
// Named Exports
// =============================================================================

export { Notification01 };

// Re-export types
export type {
  Notification,
  NotificationType,
  NotificationCategory,
  NotificationProps,
} from "./types/notification";

// =============================================================================
// Notification Types
// =============================================================================

export type NotificationType = "info" | "success" | "warning" | "error" | "mention" | "system";

export type NotificationCategory = "all" | "unread" | "mentions";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  avatar?: string;
  sender?: {
    name: string;
    avatar?: string;
  };
  action?: {
    label: string;
    href: string;
  };
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

export interface NotificationActions {
  markAsRead: (id: string) => Promise<void>;
  markAsUnread: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  fetchNotifications: () => Promise<Notification[]>;
}

export interface NotificationProps {
  notifications?: Notification[];
  unreadCount?: number;
  isLoading?: boolean;
  onMarkAsRead?: (id: string) => Promise<void>;
  onMarkAsUnread?: (id: string) => Promise<void>;
  onMarkAllAsRead?: () => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onFetch?: () => Promise<Notification[]>;
  className?: string;
}

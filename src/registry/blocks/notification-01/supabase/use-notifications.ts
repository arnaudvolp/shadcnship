"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Notification } from "../types/notification";

interface UseNotificationsOptions {
  userId?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  tableName?: string;
}

/**
 * Real-time notifications hook with Supabase
 *
 * @example
 * // page.tsx
 * import { Notification01 } from "@/components/notification-01/notification"
 * import { useNotifications } from "@/components/notification-01/supabase/use-notifications"
 *
 * export default function Page() {
 *   const { notifications, unreadCount, isLoading, ...actions } = useNotifications({
 *     userId: "user-123"
 *   });
 *
 *   return (
 *     <Notification01
 *       notifications={notifications}
 *       unreadCount={unreadCount}
 *       isLoading={isLoading}
 *       {...actions}
 *     />
 *   );
 * }
 *
 * // Required env vars:
 * // NEXT_PUBLIC_SUPABASE_URL=your-project-url
 * // NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
 */
export function useNotifications({
  userId,
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  tableName = "notifications",
}: UseNotificationsOptions = {}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(
    () => createClient(supabaseUrl, supabaseAnonKey),
    [supabaseUrl, supabaseAnonKey]
  );

  const transformRow = (row: Record<string, unknown>): Notification => ({
    id: row.id as string,
    type: row.type as Notification["type"],
    title: row.title as string,
    message: row.message as string,
    read: row.read as boolean,
    createdAt: row.created_at as string,
    sender: row.sender_name
      ? { name: row.sender_name as string, avatar: row.sender_avatar as string | undefined }
      : undefined,
    action: row.action_label
      ? { label: row.action_label as string, href: row.action_href as string }
      : undefined,
  });

  const fetchNotifications = useCallback(async () => {
    if (!userId) return [];

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from(tableName)
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (fetchError) throw new Error(fetchError.message);

      const transformed = (data || []).map(transformRow);
      setNotifications(transformed);
      return transformed;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch notifications");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [supabase, userId, tableName]);

  const markAsRead = useCallback(
    async (id: string) => {
      if (!userId) return;

      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );

      const { error: updateError } = await supabase
        .from(tableName)
        .update({ read: true })
        .eq("id", id)
        .eq("user_id", userId);

      if (updateError) {
        // Revert on error
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: false } : n))
        );
        throw new Error(updateError.message);
      }
    },
    [supabase, userId, tableName]
  );

  const markAsUnread = useCallback(
    async (id: string) => {
      if (!userId) return;

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: false } : n))
      );

      const { error: updateError } = await supabase
        .from(tableName)
        .update({ read: false })
        .eq("id", id)
        .eq("user_id", userId);

      if (updateError) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
        throw new Error(updateError.message);
      }
    },
    [supabase, userId, tableName]
  );

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;

    const previousNotifications = notifications;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    const { error: updateError } = await supabase
      .from(tableName)
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false);

    if (updateError) {
      setNotifications(previousNotifications);
      throw new Error(updateError.message);
    }
  }, [supabase, userId, tableName, notifications]);

  const deleteNotification = useCallback(
    async (id: string) => {
      if (!userId) return;

      const previousNotifications = notifications;
      setNotifications((prev) => prev.filter((n) => n.id !== id));

      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (deleteError) {
        setNotifications(previousNotifications);
        throw new Error(deleteError.message);
      }
    },
    [supabase, userId, tableName, notifications]
  );

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Real-time subscription
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: tableName,
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newNotification = transformRow(payload.new);
          setNotifications((prev) => [newNotification, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: tableName,
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const updated = transformRow(payload.new);
          setNotifications((prev) =>
            prev.map((n) => (n.id === updated.id ? updated : n))
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: tableName,
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) =>
            prev.filter((n) => n.id !== (payload.old as { id: string }).id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId, tableName]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    onMarkAsRead: markAsRead,
    onMarkAsUnread: markAsUnread,
    onMarkAllAsRead: markAllAsRead,
    onDelete: deleteNotification,
    onFetch: fetchNotifications,
  };
}

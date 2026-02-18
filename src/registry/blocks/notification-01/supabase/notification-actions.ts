"use server";

import { createClient } from "@supabase/supabase-js";
import type { Notification } from "../types/notification";

/**
 * Server actions for notification management with Supabase
 *
 * Prerequisites:
 * 1. Set up environment variables:
 *    - SUPABASE_URL
 *    - SUPABASE_SERVICE_ROLE_KEY
 *
 * 2. Create notifications table in Supabase:
 *
 * CREATE TABLE notifications (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 *   type VARCHAR(20) NOT NULL DEFAULT 'info',
 *   title VARCHAR(255) NOT NULL,
 *   message TEXT NOT NULL,
 *   read BOOLEAN DEFAULT FALSE,
 *   sender_id UUID REFERENCES auth.users(id),
 *   sender_name VARCHAR(255),
 *   sender_avatar TEXT,
 *   action_label VARCHAR(100),
 *   action_href VARCHAR(500),
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * -- RLS Policies
 * ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
 *
 * CREATE POLICY "Users can view own notifications" ON notifications
 *   FOR SELECT USING (auth.uid() = user_id);
 *
 * CREATE POLICY "Users can update own notifications" ON notifications
 *   FOR UPDATE USING (auth.uid() = user_id);
 *
 * CREATE POLICY "Users can delete own notifications" ON notifications
 *   FOR DELETE USING (auth.uid() = user_id);
 *
 * -- Enable realtime
 * ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
 */

const getSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
};

export async function getNotifications(userId: string): Promise<Notification[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(error.message);

  return (data || []).map((row) => ({
    id: row.id,
    type: row.type,
    title: row.title,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
    sender: row.sender_name
      ? { name: row.sender_name, avatar: row.sender_avatar }
      : undefined,
    action: row.action_label
      ? { label: row.action_label, href: row.action_href }
      : undefined,
  }));
}

export async function markNotificationAsRead(
  notificationId: string,
  userId: string
): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("notifications")
    .update({ read: true, updated_at: new Date().toISOString() })
    .eq("id", notificationId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}

export async function markNotificationAsUnread(
  notificationId: string,
  userId: string
): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("notifications")
    .update({ read: false, updated_at: new Date().toISOString() })
    .eq("id", notificationId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}

export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("notifications")
    .update({ read: true, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) throw new Error(error.message);
}

export async function deleteNotification(
  notificationId: string,
  userId: string
): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notificationId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}

export async function getUnreadCount(userId: string): Promise<number> {
  const supabase = getSupabase();

  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) throw new Error(error.message);

  return count || 0;
}

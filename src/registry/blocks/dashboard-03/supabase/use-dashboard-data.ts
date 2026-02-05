"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import type { DashboardData, DashboardStats, RevenueDataPoint, UserGrowthDataPoint, Activity } from "../types/dashboard";

interface UseDashboardDataOptions {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  refreshInterval?: number; // in milliseconds, 0 to disable
}

/**
 * Hook for Supabase dashboard data integration
 *
 * @example
 * // page.tsx
 * import { Dashboard03 } from "@/components/dashboard-03/dashboard"
 * import { useDashboardData } from "@/components/dashboard-03/supabase/use-dashboard-data"
 *
 * export default function DashboardPage() {
 *   const { data, isLoading, error, refetch } = useDashboardData()
 *   return <Dashboard03 data={data} isLoading={isLoading} error={error} />
 * }
 *
 * // Required env vars:
 * // NEXT_PUBLIC_SUPABASE_URL=your-project-url
 * // NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
 */
export function useDashboardData({
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  refreshInterval = 0,
}: UseDashboardDataOptions = {}) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(
    () => createClient(supabaseUrl, supabaseAnonKey),
    [supabaseUrl, supabaseAnonKey]
  );

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        usersResult,
        ordersResult,
        subscriptionsResult,
        revenueHistoryResult,
        userGrowthResult,
        activityResult,
      ] = await Promise.all([
        // Total users count
        supabase.from("users").select("*", { count: "exact", head: true }),
        // Total revenue (sum of orders)
        supabase.from("orders").select("amount"),
        // Active subscriptions count
        supabase
          .from("subscriptions")
          .select("*", { count: "exact", head: true })
          .eq("status", "active"),
        // Revenue history (last 6 months)
        supabase
          .from("orders")
          .select("amount, created_at")
          .gte("created_at", new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString())
          .order("created_at", { ascending: true }),
        // User growth (last 6 months)
        supabase
          .from("users")
          .select("created_at")
          .gte("created_at", new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString())
          .order("created_at", { ascending: true }),
        // Recent activity
        supabase
          .from("activity_log")
          .select("*, users(name, email, avatar)")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      // Calculate stats
      const totalUsers = usersResult.count ?? 0;
      const totalRevenue = ordersResult.data?.reduce((sum, o) => sum + (o.amount || 0), 0) ?? 0;
      const activeSubscriptions = subscriptionsResult.count ?? 0;
      const conversionRate = totalUsers > 0 ? (activeSubscriptions / totalUsers) * 100 : 0;

      // Group revenue by month
      const revenueByMonth: Record<string, number> = {};
      revenueHistoryResult.data?.forEach((order) => {
        const month = new Date(order.created_at).toLocaleDateString("en-US", {
          month: "short",
        });
        revenueByMonth[month] = (revenueByMonth[month] || 0) + order.amount;
      });
      const revenueHistory: RevenueDataPoint[] = Object.entries(revenueByMonth).map(
        ([date, revenue]) => ({ date, revenue })
      );

      // Group users by month for growth
      const usersByMonth: Record<string, number> = {};
      let cumulativeUsers = totalUsers - (userGrowthResult.data?.length ?? 0);
      userGrowthResult.data?.forEach((user) => {
        const month = new Date(user.created_at).toLocaleDateString("en-US", {
          month: "short",
        });
        cumulativeUsers++;
        usersByMonth[month] = cumulativeUsers;
      });
      const userGrowth: UserGrowthDataPoint[] = Object.entries(usersByMonth).map(
        ([date, users]) => ({ date, users })
      );

      // Map activity
      const recentActivity: Activity[] =
        activityResult.data?.map((a) => ({
          id: a.id,
          type: a.action as Activity["type"],
          description: a.description || a.action,
          user: a.users
            ? {
                name: a.users.name,
                email: a.users.email,
                avatar: a.users.avatar,
              }
            : undefined,
          amount: a.metadata?.amount,
          timestamp: a.created_at,
        })) ?? [];

      const stats: DashboardStats = {
        totalUsers,
        totalRevenue,
        activeSubscriptions,
        conversionRate: Math.round(conversionRate * 10) / 10,
      };

      setData({
        stats,
        revenueHistory,
        userGrowth,
        recentActivity,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchDashboardData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchDashboardData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchDashboardData, refreshInterval]);

  return { data, isLoading, error, refetch: fetchDashboardData };
}

/**
 * Supabase Setup - Run in SQL Editor:
 *
 * -- Users table (may already exist)
 * CREATE TABLE IF NOT EXISTS users (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   email TEXT UNIQUE NOT NULL,
 *   name TEXT,
 *   avatar TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * -- Orders table
 * CREATE TABLE orders (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID REFERENCES users(id),
 *   amount DECIMAL(10,2) NOT NULL,
 *   currency TEXT DEFAULT 'USD',
 *   status TEXT DEFAULT 'completed',
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * -- Subscriptions table
 * CREATE TABLE subscriptions (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID REFERENCES users(id),
 *   plan TEXT NOT NULL,
 *   status TEXT DEFAULT 'active',
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * -- Activity log table
 * CREATE TABLE activity_log (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID REFERENCES users(id),
 *   action TEXT NOT NULL,
 *   description TEXT,
 *   metadata JSONB DEFAULT '{}',
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * -- Indexes
 * CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
 * CREATE INDEX idx_subscriptions_status ON subscriptions(status);
 * CREATE INDEX idx_activity_created_at ON activity_log(created_at DESC);
 *
 * -- RLS policies
 * ALTER TABLE users ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
 *
 * -- Allow authenticated users to read their own data
 * CREATE POLICY "Users can read own data" ON users
 *   FOR SELECT USING (auth.uid() = id);
 *
 * CREATE POLICY "Users can read own orders" ON orders
 *   FOR SELECT USING (auth.uid() = user_id);
 */

"use server";

/**
 * Dashboard Server Actions for PostgreSQL/Drizzle/Neon integration
 *
 * This file provides server-side data fetching for the dashboard.
 * Uncomment and modify based on your database setup.
 *
 * @example
 * // app/dashboard/page.tsx
 * import { getDashboardData } from "@/components/dashboard-03/postgres/dashboard-actions"
 * import { Dashboard03 } from "@/components/dashboard-03/dashboard"
 *
 * export default async function DashboardPage() {
 *   const data = await getDashboardData()
 *   return <Dashboard03 data={data} />
 * }
 */

import type {
  DashboardData,
  DashboardStats,
  RevenueDataPoint,
  UserGrowthDataPoint,
  Activity,
} from "../types/dashboard";

// =============================================================================
// MOCK DATA (for preview/demo)
// Replace with actual database queries in production
// =============================================================================

const mockStats: DashboardStats = {
  totalUsers: 1247,
  totalRevenue: 45890,
  activeSubscriptions: 342,
  conversionRate: 27.4,
};

const mockRevenueHistory: RevenueDataPoint[] = [
  { date: "Aug", revenue: 28000, expenses: 18000 },
  { date: "Sep", revenue: 32000, expenses: 20000 },
  { date: "Oct", revenue: 38000, expenses: 22000 },
  { date: "Nov", revenue: 42000, expenses: 24000 },
  { date: "Dec", revenue: 48000, expenses: 26000 },
  { date: "Jan", revenue: 52000, expenses: 28000 },
];

const mockUserGrowth: UserGrowthDataPoint[] = [
  { date: "Aug", users: 850, newUsers: 120 },
  { date: "Sep", users: 920, newUsers: 70 },
  { date: "Oct", users: 1010, newUsers: 90 },
  { date: "Nov", users: 1080, newUsers: 70 },
  { date: "Dec", users: 1170, newUsers: 90 },
  { date: "Jan", users: 1247, newUsers: 77 },
];

const mockActivity: Activity[] = [
  {
    id: "1",
    type: "signup",
    description: "signed up for an account",
    user: { name: "Jean Dupont", email: "jean@example.com" },
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    type: "upgrade",
    description: "upgraded to Pro plan",
    user: { name: "Marie Martin", email: "marie@example.com" },
    amount: 29,
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    type: "purchase",
    description: "purchased Enterprise license",
    user: { name: "Pierre Bernard", email: "pierre@example.com" },
    amount: 99,
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    type: "signup",
    description: "signed up for an account",
    user: { name: "Sophie Petit", email: "sophie@example.com" },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    type: "cancellation",
    description: "cancelled subscription",
    user: { name: "Lucas Moreau", email: "lucas@example.com" },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    type: "purchase",
    description: "purchased add-on",
    user: { name: "Emma Leroy", email: "emma@example.com" },
    amount: 15,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    type: "signup",
    description: "signed up for an account",
    user: { name: "Hugo Roux", email: "hugo@example.com" },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "8",
    type: "upgrade",
    description: "upgraded to Team plan",
    user: { name: "Camille Simon", email: "camille@example.com" },
    amount: 49,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * Fetch all dashboard data
 * Replace mock data with actual database queries
 */
export async function getDashboardData(): Promise<DashboardData> {
  // Simulate network delay for demo
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    stats: mockStats,
    revenueHistory: mockRevenueHistory,
    userGrowth: mockUserGrowth,
    recentActivity: mockActivity,
  };
}

/**
 * Fetch dashboard stats only
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return mockStats;
}

/**
 * Fetch revenue history
 */
export async function getRevenueHistory(): Promise<RevenueDataPoint[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockRevenueHistory;
}

/**
 * Fetch user growth data
 */
export async function getUserGrowth(): Promise<UserGrowthDataPoint[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockUserGrowth;
}

/**
 * Fetch recent activity
 */
export async function getRecentActivity(limit: number = 10): Promise<Activity[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockActivity.slice(0, limit);
}

// =============================================================================
// DRIZZLE ORM EXAMPLE (uncomment and modify for your setup)
// =============================================================================

/*
import { db } from "@/db";
import { users, orders, subscriptions, activityLog } from "@/db/schema";
import { count, sum, sql, desc, eq, gte } from "drizzle-orm";

export async function getDashboardData(): Promise<DashboardData> {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [
    usersResult,
    revenueResult,
    subscriptionsResult,
    revenueHistoryResult,
    userGrowthResult,
    activityResult,
  ] = await Promise.all([
    // Total users
    db.select({ count: count() }).from(users),

    // Total revenue
    db.select({ total: sum(orders.amount) }).from(orders),

    // Active subscriptions
    db
      .select({ count: count() })
      .from(subscriptions)
      .where(eq(subscriptions.status, "active")),

    // Revenue by month
    db
      .select({
        month: sql<string>`TO_CHAR(${orders.createdAt}, 'Mon')`,
        revenue: sum(orders.amount),
      })
      .from(orders)
      .where(gte(orders.createdAt, sixMonthsAgo))
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'Mon'), DATE_TRUNC('month', ${orders.createdAt})`)
      .orderBy(sql`DATE_TRUNC('month', ${orders.createdAt})`),

    // User growth by month
    db
      .select({
        month: sql<string>`TO_CHAR(${users.createdAt}, 'Mon')`,
        count: count(),
      })
      .from(users)
      .where(gte(users.createdAt, sixMonthsAgo))
      .groupBy(sql`TO_CHAR(${users.createdAt}, 'Mon'), DATE_TRUNC('month', ${users.createdAt})`)
      .orderBy(sql`DATE_TRUNC('month', ${users.createdAt})`),

    // Recent activity
    db
      .select({
        id: activityLog.id,
        action: activityLog.action,
        description: activityLog.description,
        metadata: activityLog.metadata,
        createdAt: activityLog.createdAt,
        userName: users.name,
        userEmail: users.email,
        userAvatar: users.avatar,
      })
      .from(activityLog)
      .leftJoin(users, eq(activityLog.userId, users.id))
      .orderBy(desc(activityLog.createdAt))
      .limit(10),
  ]);

  const totalUsers = usersResult[0]?.count ?? 0;
  const totalRevenue = Number(revenueResult[0]?.total ?? 0);
  const activeSubscriptions = subscriptionsResult[0]?.count ?? 0;
  const conversionRate = totalUsers > 0 ? (activeSubscriptions / totalUsers) * 100 : 0;

  return {
    stats: {
      totalUsers,
      totalRevenue,
      activeSubscriptions,
      conversionRate: Math.round(conversionRate * 10) / 10,
    },
    revenueHistory: revenueHistoryResult.map((r) => ({
      date: r.month,
      revenue: Number(r.revenue ?? 0),
    })),
    userGrowth: userGrowthResult.reduce((acc, curr, i) => {
      const prevTotal = i > 0 ? acc[i - 1].users : 0;
      acc.push({ date: curr.month, users: prevTotal + curr.count });
      return acc;
    }, [] as UserGrowthDataPoint[]),
    recentActivity: activityResult.map((a) => ({
      id: a.id,
      type: a.action as Activity["type"],
      description: a.description ?? a.action,
      user: a.userName ? {
        name: a.userName,
        email: a.userEmail ?? "",
        avatar: a.userAvatar ?? undefined,
      } : undefined,
      amount: (a.metadata as any)?.amount,
      timestamp: a.createdAt.toISOString(),
    })),
  };
}
*/

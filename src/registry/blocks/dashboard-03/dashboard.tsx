"use client";

import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  FileText,
  HelpCircle,
  UserPlus,
  Download,
  Send,
  PlusCircle,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  Sidebar,
  Header,
  StatCard,
  RevenueChart,
  UserGrowthChart,
  RecentActivity,
  QuickActions,
  DataTableWidget,
  type Team,
  type User,
  type NavSection,
  type DashboardData,
  type QuickAction,
  type TableItem,
} from "./components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LogoIcon } from "../social-icons/icons";

// =============================================================================
// DEFAULT DATA
// =============================================================================

const defaultTeams: Team[] = [
  {
    name: "ShadcnShip",
    plan: "Pro",
    logo: <LogoIcon className="size-5 invert dark:invert-0" />,
  },
];

const defaultUser: User = {
  name: "Shadcn",
  email: "shadcn@ship.com",
  avatar: "/avatars/shadcn.jpg",
};

const defaultNavigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        icon: <LayoutDashboard className="size-4" />,
        label: "Dashboard",
        active: true,
      },
      { icon: <BarChart3 className="size-4" />, label: "Analytics" },
      { icon: <FileText className="size-4" />, label: "Reports" },
    ],
  },
  {
    title: "Management",
    items: [
      { icon: <Users className="size-4" />, label: "Customers", badge: 12 },
      { icon: <CreditCard className="size-4" />, label: "Billing" },
      { icon: <Bell className="size-4" />, label: "Notifications", badge: 3 },
    ],
  },
  {
    title: "Settings",
    items: [
      { icon: <Settings className="size-4" />, label: "Settings" },
      { icon: <HelpCircle className="size-4" />, label: "Help & Support" },
    ],
  },
];

const defaultQuickActions: QuickAction[] = [
  {
    id: "1",
    label: "Add Customer",
    icon: <UserPlus className="size-4" />,
    href: "#",
  },
  {
    id: "2",
    label: "Create Invoice",
    icon: <PlusCircle className="size-4" />,
    href: "#",
  },
  {
    id: "3",
    label: "Send Report",
    icon: <Send className="size-4" />,
    href: "#",
  },
  {
    id: "4",
    label: "Export Data",
    icon: <Download className="size-4" />,
    href: "#",
  },
];

const defaultRecentOrders: TableItem[] = [
  { id: "1", name: "Jean Dupont", email: "jean@example.com", status: "completed", amount: 99, date: "2026-02-01" },
  { id: "2", name: "Marie Martin", email: "marie@example.com", status: "active", amount: 149, date: "2026-01-30" },
  { id: "3", name: "Pierre Bernard", email: "pierre@example.com", status: "pending", amount: 299, date: "2026-01-28" },
  { id: "4", name: "Sophie Petit", email: "sophie@example.com", status: "completed", amount: 49, date: "2026-01-25" },
  { id: "5", name: "Lucas Moreau", email: "lucas@example.com", status: "cancelled", amount: 199, date: "2026-01-22" },
];

// Default mock data for preview
const defaultDashboardData: DashboardData = {
  stats: {
    totalUsers: 1247,
    totalRevenue: 45890,
    activeSubscriptions: 342,
    conversionRate: 27.4,
  },
  revenueHistory: [
    { date: "Aug", revenue: 28000, expenses: 18000 },
    { date: "Sep", revenue: 32000, expenses: 20000 },
    { date: "Oct", revenue: 38000, expenses: 22000 },
    { date: "Nov", revenue: 42000, expenses: 24000 },
    { date: "Dec", revenue: 48000, expenses: 26000 },
    { date: "Jan", revenue: 52000, expenses: 28000 },
  ],
  userGrowth: [
    { date: "Aug", users: 850 },
    { date: "Sep", users: 920 },
    { date: "Oct", users: 1010 },
    { date: "Nov", users: 1080 },
    { date: "Dec", users: 1170 },
    { date: "Jan", users: 1247 },
  ],
  recentActivity: [
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
  ],
};

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface Dashboard03Props {
  data?: DashboardData | null;
  isLoading?: boolean;
  error?: string | null;
  teams?: Team[];
  user?: User;
  navigation?: NavSection[];
  quickActions?: QuickAction[];
  recentOrders?: TableItem[];
  onRefresh?: () => void;
  onSignOut?: () => void;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Dashboard03({
  data = defaultDashboardData,
  isLoading = false,
  error = null,
  teams = defaultTeams,
  user = defaultUser,
  navigation = defaultNavigation,
  quickActions = defaultQuickActions,
  recentOrders = defaultRecentOrders,
  onRefresh,
  onSignOut,
}: Dashboard03Props) {
  const dashboardData = data ?? defaultDashboardData;

  return (
    <div className="flex h-screen bg-background w-full">
      <SidebarProvider>
        {/* Sidebar */}
        <Sidebar teams={teams} user={user} navigation={navigation} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {/* Header */}
          <Header
            title={`Good morning, ${user.name.split(" ")[0]}`}
            subtitle="Here's what's happening with your business today."
            isLoading={isLoading}
          />

          {/* Error State */}
          {error && (
            <div className="mx-6 mt-4 p-4 bg-destructive/10 text-destructive rounded-lg">
              <p className="text-sm font-medium">Error loading dashboard data</p>
              <p className="text-xs mt-1">{error}</p>
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="text-xs underline mt-2 hover:no-underline"
                >
                  Try again
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 pb-6 pt-4 space-y-4">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Users"
                value={dashboardData.stats.totalUsers}
                change="+12.5%"
                changeType="positive"
                description="vs last month"
                icon={<Users className="size-4" />}
                isLoading={isLoading}
              />
              <StatCard
                title="Revenue"
                value={`$${dashboardData.stats.totalRevenue.toLocaleString()}`}
                change="+8.2%"
                changeType="positive"
                description="vs last month"
                icon={<DollarSign className="size-4" />}
                isLoading={isLoading}
              />
              <StatCard
                title="Active Subscriptions"
                value={dashboardData.stats.activeSubscriptions}
                change="+3.1%"
                changeType="positive"
                description="vs last month"
                icon={<TrendingUp className="size-4" />}
                isLoading={isLoading}
              />
              <StatCard
                title="Conversion Rate"
                value={`${dashboardData.stats.conversionRate}%`}
                change="-0.5%"
                changeType="negative"
                description="vs last month"
                icon={<Activity className="size-4" />}
                isLoading={isLoading}
              />
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 lg:grid-cols-2">
              <RevenueChart data={dashboardData.revenueHistory} isLoading={isLoading} />
              <UserGrowthChart data={dashboardData.userGrowth} isLoading={isLoading} />
            </div>

            {/* Bottom Row */}
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <RecentActivity
                  activities={dashboardData.recentActivity}
                  isLoading={isLoading}
                />
              </div>

              {/* Quick Actions + Recent Orders */}
              <div className="lg:col-span-2 space-y-4">
                <QuickActions actions={quickActions} isLoading={isLoading} />
                <DataTableWidget
                  title="Recent Orders"
                  items={recentOrders}
                  isLoading={isLoading}
                  viewAllHref="#"
                />
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export { Dashboard03 };

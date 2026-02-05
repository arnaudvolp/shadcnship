// Components
export { Sidebar } from "./sidebar";
export { Header } from "./header";
export { NavUser } from "./nav-user";
export { TeamSwitcher } from "./team-switcher";
export { StatCard } from "./stat-card";
export { RevenueChart, UserGrowthChart } from "./chart-card";
export { RecentActivity } from "./recent-activity";
export { QuickActions } from "./quick-actions";
export { DataTableWidget } from "./data-table-widget";
export type { TableItem } from "./data-table-widget";

// Re-export types
export type {
  DashboardStats,
  StatCardData,
  RevenueDataPoint,
  UserGrowthDataPoint,
  Activity,
  QuickAction,
  DashboardData,
  NavItem,
  NavSection,
  Team,
  User,
} from "../types/dashboard";

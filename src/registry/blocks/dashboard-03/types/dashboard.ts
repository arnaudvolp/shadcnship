// =============================================================================
// Dashboard Types
// =============================================================================

export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeSubscriptions: number;
  conversionRate: number;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  description: string;
  icon?: React.ReactNode;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  expenses?: number;
}

export interface UserGrowthDataPoint {
  date: string;
  users: number;
  newUsers?: number;
}

export interface Activity {
  id: string;
  type: "signup" | "purchase" | "upgrade" | "downgrade" | "cancellation" | "other";
  description: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount?: number;
  timestamp: string;
}

export interface QuickAction {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  revenueHistory: RevenueDataPoint[];
  userGrowth: UserGrowthDataPoint[];
  recentActivity: Activity[];
  isLoading?: boolean;
  error?: string | null;
}

// Navigation types (shared with other dashboards)
export interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface Team {
  name: string;
  plan: string;
  logo: React.ReactNode;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

"use client";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Map,
  Users,
  Bell,
  Database,
  Cable,
  FileText,
  ShieldCheck,
  UserCog,
  Lock,
  CreditCard,
  Download,
  Upload,
  BarChart3,
  FileBarChart,
  MessageSquare,
  Command,
} from "lucide-react";
import {
  Sidebar,
  StatCard,
  RevenueSummaryChart,
  UserLocationsCard,
  ProjectsTable,
  type Team,
  type User,
  type NavSection,
} from "./components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LogoIcon } from "../social-icons/icons";

// =============================================================================
// DATA
// =============================================================================

const teams: Team[] = [
  {
    name: "ShadcnShip",
    plan: "Pro",
    logo: <LogoIcon className="size-5 invert dark:invert-0" />,
  },
];

const user: User = {
  name: "Shadcn",
  email: "shadcn@ship.com",
  avatar: "/avatars/shadcn.jpg",
};

const navigation: NavSection[] = [
  {
    title: "Workspace",
    items: [
      {
        icon: <LayoutDashboard className="size-4" />,
        label: "Overview",
        active: true,
      },
      { icon: <FolderKanban className="size-4" />, label: "Projects" },
      { icon: <CheckSquare className="size-4" />, label: "Tasks" },
      { icon: <Map className="size-4" />, label: "Roadmap" },
      { icon: <Users className="size-4" />, label: "Audience" },
      { icon: <Bell className="size-4" />, label: "Notifications" },
      { icon: <Database className="size-4" />, label: "Database" },
      { icon: <Cable className="size-4" />, label: "Connections" },
      { icon: <FileText className="size-4" />, label: "Documentation" },
    ],
  },
  {
    title: "Ventures",
    items: [
      { icon: <ShieldCheck className="size-4" />, label: "Authentication" },
      { icon: <UserCog className="size-4" />, label: "User Management" },
      { icon: <Lock className="size-4" />, label: "Security" },
      { icon: <CreditCard className="size-4" />, label: "Payments" },
      { icon: <Download className="size-4" />, label: "Import Data" },
      { icon: <Upload className="size-4" />, label: "Export Data" },
    ],
  },
  {
    title: "Insights",
    items: [
      { icon: <BarChart3 className="size-4" />, label: "Analytics" },
      { icon: <FileBarChart className="size-4" />, label: "Reports" },
      { icon: <MessageSquare className="size-4" />, label: "User Feedback" },
    ],
  },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background w-full">
      <SidebarProvider>
        {/* Sidebar */}
        <Sidebar teams={teams} user={user} navigation={navigation} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {/* Header */}
          <header className="px-6 py-4">
            <h1 className="text-xl font-semibold">Good morning, Shadcn</h1>
            <div className="flex gap-4 mt-3">
              {["General", "Members", "Notifications"].map((tab, i) => (
                <button
                  key={tab}
                  className={`text-sm pb-2 border-b-2 transition-colors ${
                    i === 0
                      ? "border-foreground text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="px-6 pb-6 space-y-4">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Active Users"
                value="2,450"
                change="+18.2%"
                positive
                label="Growing steadily"
                description="Active users in the last 30 days"
              />
              <StatCard
                title="New Subscriptions"
                value="145"
                change="+5.4%"
                positive
                label="Slightly up"
                description="New signups this week"
              />
              <StatCard
                title="Churn Rate"
                value="2.1%"
                change="-4.2%"
                positive
                label="Improving"
                description="Churn rate compared to last month"
              />
              <StatCard
                title="Revenue"
                value="$12,450"
                change="+2.5%"
                positive
                label="Above target"
                description="Total revenue this month"
              />
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 lg:grid-cols-2">
              <UserLocationsCard />
              <RevenueSummaryChart />
            </div>

            {/* Projects Table */}
            <ProjectsTable />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

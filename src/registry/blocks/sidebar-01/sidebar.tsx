"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  SidebarHeader,
  SidebarNav,
  SidebarUserMenu,
  MobileSidebar,
} from "./components";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  Bell,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare,
  HelpCircle,
  Menu,
} from "lucide-react";
import type { SidebarProps, NavGroup, SidebarUser } from "./types/sidebar";

// =============================================================================
// Demo Data
// =============================================================================

const demoUser: SidebarUser = {
  id: "user_1",
  name: "Sarah Chen",
  email: "sarah@acme.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  role: "Product Manager",
};

const demoNavigation: NavGroup[] = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="size-5" />,
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: <FolderKanban className="size-5" />,
        badge: 3,
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: <BarChart3 className="size-5" />,
      },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    collapsible: true,
    defaultOpen: true,
    items: [
      {
        id: "calendar",
        label: "Calendar",
        href: "/calendar",
        icon: <Calendar className="size-5" />,
      },
      {
        id: "documents",
        label: "Documents",
        href: "/documents",
        icon: <FileText className="size-5" />,
      },
      {
        id: "messages",
        label: "Messages",
        href: "/messages",
        icon: <MessageSquare className="size-5" />,
        badge: 12,
        badgeVariant: "destructive",
      },
    ],
  },
  {
    id: "team",
    label: "Team",
    collapsible: true,
    defaultOpen: true,
    items: [
      {
        id: "members",
        label: "Members",
        href: "/team/members",
        icon: <Users className="size-5" />,
      },
      {
        id: "notifications",
        label: "Notifications",
        href: "/notifications",
        icon: <Bell className="size-5" />,
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    collapsible: true,
    defaultOpen: false,
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: <Settings className="size-5" />,
      },
      {
        id: "help",
        label: "Help & Support",
        href: "/help",
        icon: <HelpCircle className="size-5" />,
      },
    ],
  },
];

// =============================================================================
// Sidebar Component
// =============================================================================

export default function Sidebar({
  navigation: externalNavigation,
  user: externalUser,
  logo,
  logoText = "Acme Inc",
  collapsed: externalCollapsed,
  onCollapsedChange,
  onLogout,
  onSettings,
  onProfile,
  activeItemId: externalActiveItemId,
  onNavigate,
  className,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [internalActiveItemId, setInternalActiveItemId] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Use external state if provided
  const navigation = externalNavigation ?? demoNavigation;
  const user = externalUser ?? demoUser;
  const collapsed = externalCollapsed ?? internalCollapsed;
  const activeItemId = externalActiveItemId ?? internalActiveItemId;

  const handleCollapsedChange = (value: boolean) => {
    if (onCollapsedChange) {
      onCollapsedChange(value);
    } else {
      setInternalCollapsed(value);
    }
  };

  const handleNavigate = (item: { id: string; href?: string }) => {
    if (onNavigate) {
      onNavigate(item as any);
    } else {
      setInternalActiveItemId(item.id);
      console.log("Navigate to:", item.href || item.id);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("Logout clicked");
    }
  };

  const handleSettings = () => {
    if (onSettings) {
      onSettings();
    } else {
      setInternalActiveItemId("settings");
      console.log("Settings clicked");
    }
  };

  const handleProfile = () => {
    if (onProfile) {
      onProfile();
    } else {
      console.log("Profile clicked");
    }
  };

  return (
    <TooltipProvider>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen bg-background border-r transition-all duration-300 relative",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        <SidebarHeader
          logo={logo}
          logoText={logoText}
          collapsed={collapsed}
          onCollapsedChange={handleCollapsedChange}
        />

        <SidebarNav
          groups={navigation}
          collapsed={collapsed}
          activeItemId={activeItemId}
          onNavigate={handleNavigate}
        />

        <SidebarUserMenu
          user={user}
          collapsed={collapsed}
          onLogout={handleLogout}
          onSettings={handleSettings}
          onProfile={handleProfile}
        />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b bg-background">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {logo || (
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                )}
              </div>
              <span className="font-semibold">{logoText}</span>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Sheet */}
        <MobileSidebar
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          navigation={navigation}
          user={user}
          logo={logo}
          logoText={logoText}
          activeItemId={activeItemId}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onSettings={handleSettings}
          onProfile={handleProfile}
        />
      </div>

      {/* Demo Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                {navigation
                  .flatMap((g) => g.items)
                  .find((i) => i.id === activeItemId)?.label || "Dashboard"}
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user.name.split(" ")[0]}
              </p>
            </div>

            {/* Demo Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              {[
                { label: "Total Projects", value: "12", change: "+2 this week" },
                { label: "Active Tasks", value: "24", change: "8 due today" },
                { label: "Team Members", value: "8", change: "2 online" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-card p-6 shadow-sm"
                >
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Demo Activity */}
            <div className="rounded-xl border bg-card shadow-sm">
              <div className="p-6 border-b">
                <h2 className="font-semibold">Recent Activity</h2>
              </div>
              <div className="divide-y">
                {[
                  { action: "Created new project", time: "2 minutes ago" },
                  { action: "Completed task: Design review", time: "1 hour ago" },
                  { action: "Added team member", time: "3 hours ago" },
                  { action: "Updated project settings", time: "Yesterday" },
                ].map((activity, idx) => (
                  <div key={idx} className="px-6 py-4 flex items-center justify-between">
                    <span className="text-sm">{activity.action}</span>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

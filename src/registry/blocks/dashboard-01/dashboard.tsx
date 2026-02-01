"use client";

import { Search, ChevronRight } from "lucide-react";
import {
  LayoutDashboard,
  ShoppingBag,
  Receipt,
  BarChart3,
  MessageSquare,
  Users2,
  Megaphone,
  UserCircle,
  MessageCircle,
  ClipboardList,
  Shield,
  CreditCard,
  Puzzle,
  Settings,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  StatsCard,
  SkeletonCard,
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
    plan: "Enterprise",
    logo: <LogoIcon className="size-4 invert" />,
  },
  {
    name: "Acme Corp.",
    plan: "Startup",
    logo: <AudioWaveform className="size-4" />,
  },
  {
    name: "Evil Corp.",
    plan: "Free",
    logo: <Command className="size-4" />,
  },
];

const user: User = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

const navigation: NavSection[] = [
  {
    title: "Main Menu",
    items: [
      {
        icon: <LayoutDashboard className="size-4" />,
        label: "Dashboard",
        active: true,
      },
      { icon: <ShoppingBag className="size-4" />, label: "Products" },
      { icon: <Receipt className="size-4" />, label: "Transactions" },
      { icon: <BarChart3 className="size-4" />, label: "Reports & Analytics" },
      { icon: <MessageSquare className="size-4" />, label: "Messages" },
      { icon: <Users2 className="size-4" />, label: "Team Performance" },
      { icon: <Megaphone className="size-4" />, label: "Campaigns" },
    ],
  },
  {
    title: "Customers",
    items: [
      { icon: <UserCircle className="size-4" />, label: "Customer List" },
      { icon: <MessageCircle className="size-4" />, label: "Channels" },
      { icon: <ClipboardList className="size-4" />, label: "Order Management" },
    ],
  },
  {
    title: "Management",
    items: [
      { icon: <Shield className="size-4" />, label: "Roles & Permissions" },
      {
        icon: <CreditCard className="size-4" />,
        label: "Billing & Subscription",
      },
      { icon: <Puzzle className="size-4" />, label: "Integrations" },
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
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Dashboard</span>
              <ChevronRight className="size-4 text-muted-foreground" />
              <span className="font-medium">Overview</span>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-9 bg-muted/50 border-0"
              />
            </div>
          </header>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Welcome message */}
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back Shadcn,
            </h1>

            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatsCard />
              <StatsCard />
              <StatsCard />
            </div>

            {/* Sales Trend */}
            <SkeletonCard />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

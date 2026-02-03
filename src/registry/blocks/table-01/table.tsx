"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Plus,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Pencil,
  KeyRound,
  Trash2,
  Globe,
  Sparkles,
  Rocket,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// =============================================================================
// TYPES
// =============================================================================

type UserStatus =
  | "active"
  | "inactive"
  | "pending_approval"
  | "pending_verification"
  | "cancelled"
  | "rejected";

interface User {
  id: string;
  name: string;
  phone: string;
  dealerships: string[];
  dealershipEnabled: boolean;
  roles: string[];
  status: UserStatus;
}

interface Deal {
  id: string;
  name: string;
  icon: "globe" | "sparkles" | "rocket" | "zap";
  loanId: string;
  received: number;
  goal: number;
  rate: number;
  created: string;
}

// =============================================================================
// DATA
// =============================================================================

const users: User[] = [
  {
    id: "1",
    name: "Anthony Dionne",
    phone: "(201) 555-0124",
    dealerships: ["Honda Drummondville"],
    dealershipEnabled: true,
    roles: ["Dealership group accounting", "Dealership user"],
    status: "pending_approval",
  },
  {
    id: "2",
    name: "Nick Yahodin",
    phone: "(201) 555-0124",
    dealerships: ["Honda Manic", "Jean Dumas", "Baie Comeau"],
    dealershipEnabled: true,
    roles: ["Dealership user", "Dealership group admin", "Dealership group accounting"],
    status: "active",
  },
  {
    id: "3",
    name: "Mujeeb Aimaq",
    phone: "(201) 555-0124",
    dealerships: ["Auto Financement action"],
    dealershipEnabled: true,
    roles: ["Dealership group user"],
    status: "cancelled",
  },
  {
    id: "4",
    name: "Eddie Parsons",
    phone: "(201) 555-0124",
    dealerships: ["Poirier Nissan", "Rouyn Noranda"],
    dealershipEnabled: false,
    roles: ["Admin"],
    status: "rejected",
  },
  {
    id: "5",
    name: "Jakub Bandura",
    phone: "(201) 555-0124",
    dealerships: ["Garage Eric Provost"],
    dealershipEnabled: true,
    roles: ["Dealership user", "Dealership group user"],
    status: "inactive",
  },
  {
    id: "6",
    name: "Michael St-Martin",
    phone: "(201) 555-0124",
    dealerships: ["Autos Namoune 9253-4239 qc inc"],
    dealershipEnabled: true,
    roles: ["Dealership group admin"],
    status: "pending_verification",
  },
];

const deals: Deal[] = [
  {
    id: "1",
    name: "Region scaling",
    icon: "globe",
    loanId: "A-139141",
    received: 420420,
    goal: 3000000,
    rate: 4.0,
    created: "22.07.2022",
  },
  {
    id: "2",
    name: "Marlin Corp. deal",
    icon: "sparkles",
    loanId: "A-114002",
    received: 54000,
    goal: 104000,
    rate: 2.0,
    created: "10.07.2022",
  },
  {
    id: "3",
    name: "Alpha app launch 2.0",
    icon: "rocket",
    loanId: "A-110249",
    received: 415200,
    goal: 1000000,
    rate: 3.2,
    created: "11.05.2022",
  },
  {
    id: "4",
    name: "Beat app launch 2.0",
    icon: "zap",
    loanId: "A-102888",
    received: 3527000,
    goal: 6000000,
    rate: 6.15,
    created: "22.04.2022",
  },
];

// =============================================================================
// HELPERS
// =============================================================================

function getStatusConfig(status: UserStatus) {
  const configs: Record<UserStatus, { label: string; className: string }> = {
    active: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    },
    inactive: {
      label: "Inactive",
      className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    },
    pending_approval: {
      label: "Pending admin approval",
      className: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },
    pending_verification: {
      label: "Pending verification",
      className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    },
    cancelled: {
      label: "Cancelled by user",
      className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    },
    rejected: {
      label: "Rejected by admin",
      className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    },
  };
  return configs[status];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

function calculateProgress(received: number, goal: number): number {
  return Math.min((received / goal) * 100, 100);
}

const iconMap = {
  globe: Globe,
  sparkles: Sparkles,
  rocket: Rocket,
  zap: Zap,
};

// =============================================================================
// COMPONENTS
// =============================================================================

function StatusBadge({ status }: { status: UserStatus }) {
  const config = getStatusConfig(status);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

function UserActions({ user }: { user: User }) {
  const [isActive, setIsActive] = useState(user.status === "active");

  return (
    <div className="flex items-center justify-end gap-2">
      {user.status === "pending_approval" && (
        <Button size="sm" variant="default">
          Approve
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-sm">Active</span>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Pencil className="mr-2 size-4" />
            Edit profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KeyRound className="mr-2 size-4" />
            Reset password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ProgressCircle({ progress }: { progress: number }) {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className="size-6 -rotate-90" viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-muted"
      />
      <circle
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="text-primary"
      />
    </svg>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function UsersTable() {
  const [activeTab, setActiveTab] = useState<"customers" | "employees" | "deals">("customers");
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  const filteredDeals = deals.filter(
    (deal) =>
      deal.name.toLowerCase().includes(search.toLowerCase()) ||
      deal.loanId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-background">
      {/* Header */}
      <div className="border-b px-6 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Users management</h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="flex gap-1">
          <Button
            variant={activeTab === "customers" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("customers")}
          >
            Customers
          </Button>
          <Button
            variant={activeTab === "employees" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("employees")}
          >
            Employees
          </Button>
          <Button
            variant={activeTab === "deals" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("deals")}
          >
            Deals
          </Button>
        </div>

        {/* Search and actions */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={activeTab === "deals" ? "Search for deals..." : "Search for customers..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 pl-9"
            />
          </div>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 size-4" />
            Filters
          </Button>
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            {activeTab === "deals" ? "Add new deal" : "Add new customer"}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 py-4">
        {activeTab === "deals" ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="text-muted-foreground font-normal">
                  Deal name
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  Loan ID
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  Recieved / Goal
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  Rate
                </TableHead>
                <TableHead className="text-muted-foreground font-normal">
                  Created
                </TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => {
                const progress = calculateProgress(deal.received, deal.goal);
                const Icon = iconMap[deal.icon];
                return (
                  <TableRow
                    key={deal.id}
                    className="cursor-pointer border-none hover:bg-muted/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                          <Icon className="size-4" />
                        </span>
                        <span className="font-medium">{deal.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {deal.loanId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <ProgressCircle progress={progress} />
                        <span>
                          <span className="font-semibold">
                            {formatCurrency(deal.received)}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            / {formatCurrency(deal.goal)} USD
                          </span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{deal.rate.toFixed(2)}%</TableCell>
                    <TableCell className="text-muted-foreground">
                      {deal.created}
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="size-5 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px]">
                  <Button variant="ghost" size="sm" className="-ml-3 h-8 font-medium">
                    Name
                    <ChevronDown className="ml-1 size-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-[280px]">
                  <Button variant="ghost" size="sm" className="-ml-3 h-8 font-medium">
                    Dealerships
                    <ChevronDown className="ml-1 size-3" />
                  </Button>
                </TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-none hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{user.dealerships[0]}</span>
                      {user.dealerships.length > 1 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.dealerships.length - 1}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{user.roles[0]}</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>
                    <UserActions user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

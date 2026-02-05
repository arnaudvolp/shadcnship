"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { RevenueDataPoint, UserGrowthDataPoint } from "../types/dashboard";

// =============================================================================
// Revenue Chart
// =============================================================================

interface RevenueChartProps {
  data: RevenueDataPoint[];
  isLoading?: boolean;
}

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--foreground))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

export function RevenueChart({ data, isLoading = false }: RevenueChartProps) {
  if (isLoading) {
    return (
      <Card className="p-4 shadow-none">
        <Skeleton className="h-5 w-32 mb-1" />
        <Skeleton className="h-3 w-24 mb-4" />
        <Skeleton className="h-[200px] w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-none">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="font-semibold text-sm">Revenue Overview</h3>
          <p className="text-xs text-muted-foreground">Monthly revenue trend</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-foreground" />
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-muted-foreground/50" />
            <span className="text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>

      <ChartContainer config={revenueChartConfig} className="h-[200px] w-full mt-4">
        <BarChart data={data} barGap={2}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <span className="font-medium">
                    ${Number(value).toLocaleString()} {name}
                  </span>
                )}
              />
            }
          />
          <Bar dataKey="revenue" fill="var(--foreground)" radius={[4, 4, 0, 0]} barSize={24} />
          {data[0]?.expenses !== undefined && (
            <Bar dataKey="expenses" fill="var(--muted)" radius={[4, 4, 0, 0]} barSize={24} />
          )}
        </BarChart>
      </ChartContainer>
    </Card>
  );
}

// =============================================================================
// User Growth Chart
// =============================================================================

interface UserGrowthChartProps {
  data: UserGrowthDataPoint[];
  isLoading?: boolean;
}

const userGrowthChartConfig = {
  users: {
    label: "Total Users",
    color: "hsl(var(--foreground))",
  },
  newUsers: {
    label: "New Users",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function UserGrowthChart({ data, isLoading = false }: UserGrowthChartProps) {
  if (isLoading) {
    return (
      <Card className="p-4 shadow-none">
        <Skeleton className="h-5 w-32 mb-1" />
        <Skeleton className="h-3 w-24 mb-4" />
        <Skeleton className="h-[200px] w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-none">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="font-semibold text-sm">User Growth</h3>
          <p className="text-xs text-muted-foreground">Monthly user acquisition</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-foreground" />
            <span className="text-muted-foreground">Total Users</span>
          </div>
        </div>
      </div>

      <ChartContainer config={userGrowthChartConfig} className="h-[200px] w-full mt-4">
        <AreaChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => <span className="font-medium">{Number(value).toLocaleString()} users</span>}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="var(--foreground)"
            fill="var(--foreground)"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}

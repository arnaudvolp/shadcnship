"use client";

import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Aug", billed: 28, unpaid: 8 },
  { month: "Sep", billed: 32, unpaid: 12 },
  { month: "Oct", billed: 38, unpaid: 10 },
  { month: "Nov", billed: 42, unpaid: 14 },
  { month: "Dec", billed: 48, unpaid: 10 },
  { month: "Jan", billed: 52, unpaid: 8 },
];

const chartConfig = {
  billed: {
    label: "Billed amount",
    color: "hsl(var(--foreground))",
  },
  unpaid: {
    label: "Unpaid amount",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

export function RevenueSummaryChart() {
  return (
    <Card className="p-4 shadow-none">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="font-semibold text-sm">Revenue Summary</h3>
          <p className="text-xs text-muted-foreground">Monthly comparison</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-foreground" />
            <span className="text-muted-foreground">Billed amount</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-muted-foreground/50" />
            <span className="text-muted-foreground">Unpaid amount</span>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-fit w-full mt-4">
        <BarChart data={chartData} barGap={2}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
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
            tickFormatter={(value) => `$${value}k`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <span className="font-medium">
                    ${value}k {name === "billed" ? "billed" : "unpaid"}
                  </span>
                )}
              />
            }
          />
          <Bar
            dataKey="billed"
            fill="var(--foreground)"
            radius={[4, 4, 0, 0]}
            barSize={24}
          />
          <Bar
            dataKey="unpaid"
            fill="var(--muted)"
            radius={[4, 4, 0, 0]}
            barSize={24}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}

// Keep old exports for compatibility
export { RevenueSummaryChart as RevenueChart };
export { RevenueSummaryChart as DeliveryTimeChart };
export { RevenueSummaryChart as AnalyticsChart };

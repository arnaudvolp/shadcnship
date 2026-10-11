"use client";

import { Code2, Copy, Users } from "lucide-react";
import { Bar, Cell, ComposedChart, LabelList, Line, XAxis } from "recharts";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface Driver {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface DataPoint {
  month: string;
  segment: number;
  total: number;
}

interface Stat07Props {
  badge?: string;
  title?: string;
  driversTitle?: string;
  drivers?: Driver[];
  chart?: {
    title: string;
    subtitle: string;
    summary: string;
    segmentLabel: string;
    totalLabel: string;
    suffix: string;
    data: DataPoint[];
  };
  className?: string;
}

const Stat07 = ({
  badge = "Our growth",
  title = "More developers ship faster with ready-to-use blocks every month",
  driversTitle = "Why developers choose us",
  drivers = [
    {
      icon: <Copy className="size-4" />,
      title: "Copy & paste ready",
      description:
        "Every block drops into your project in seconds. No dependencies, just code you own.",
    },
    {
      icon: <Users className="size-4" />,
      title: "Active community",
      description:
        "Thousands of developers share feedback and ideas that shape the next blocks.",
    },
    {
      icon: <Code2 className="size-4" />,
      title: "Built for modern stacks",
      description:
        "Typed, accessible and styled with Tailwind CSS to match your own theme.",
    },
  ],
  chart = {
    title: "Blocks installed (thousands)",
    subtitle: "Installs vs active developers",
    summary:
      "Installs grow every month, from 2 thousand in January to 17 thousand in July.",
    segmentLabel: "Blocks installed",
    totalLabel: "Active developers",
    suffix: "K",
    data: [
      { month: "Jan", segment: 2, total: 1 },
      { month: "Feb", segment: 4, total: 2 },
      { month: "Mar", segment: 6, total: 3 },
      { month: "Apr", segment: 9, total: 5 },
      { month: "May", segment: 12, total: 7 },
      { month: "Jun", segment: 14, total: 9 },
      { month: "Jul", segment: 17, total: 11 },
    ],
  },
  className,
}: Stat07Props) => {
  const chartConfig = {
    segment: { label: chart.segmentLabel, color: "var(--primary)" },
    total: { label: chart.totalLabel, color: "var(--muted-foreground)" },
  } satisfies ChartConfig;

  const lastIndex = chart.data.length - 1;

  return (
    <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <Badge variant="outline" className="uppercase">
            {badge}
          </Badge>
          <h2 className="max-w-2xl text-3xl leading-tight font-medium tracking-tight md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-11 md:gap-12">
          <div className="flex flex-col gap-6 md:col-span-5">
            <h3 className="text-sm font-medium">{driversTitle}</h3>
            <ul className="flex flex-col gap-6">
              {drivers.map((driver) => (
                <li key={driver.title} className="flex gap-3">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted"
                    aria-hidden="true"
                  >
                    {driver.icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h4 className="flex h-8 items-center text-sm font-medium">
                      {driver.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {driver.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4 md:col-span-6 md:p-6">
            <div>
              <h3 className="text-sm font-medium">{chart.title}</h3>
              <p className="text-xs text-muted-foreground">{chart.subtitle}</p>
            </div>
            <div role="img" aria-label={chart.summary}>
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-60 w-full"
              >
                <ComposedChart
                  data={chart.data}
                  margin={{ top: 24, right: 8, left: 8, bottom: 0 }}
                >
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="segment" fill="var(--color-segment)" radius={4}>
                    {chart.data.map((point, i) => (
                      <Cell
                        key={point.month}
                        fill="var(--color-segment)"
                        fillOpacity={i === lastIndex ? 1 : 0.35}
                      />
                    ))}
                    <LabelList
                      dataKey="segment"
                      content={(props) => {
                        const { index, x, y, width, value } = props as {
                          index: number;
                          x: number;
                          y: number;
                          width: number;
                          value: number;
                        };
                        if (index !== 0 && index !== lastIndex) return null;
                        return (
                          <text
                            x={x + width / 2}
                            y={y - 8}
                            textAnchor="middle"
                            className="fill-foreground text-xs font-medium"
                          >
                            {`${value}${chart.suffix}`}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                  <Line
                    dataKey="total"
                    type="monotone"
                    stroke="var(--color-total)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </ComposedChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stat07;

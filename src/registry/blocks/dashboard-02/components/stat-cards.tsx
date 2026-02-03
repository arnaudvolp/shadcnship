"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  label: string;
  description: string;
}

export function StatCard({
  title,
  value,
  change,
  positive,
  label,
  description,
}: StatCardProps) {
  return (
    <Card className="p-4 shadow-none bg-card gap-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-muted-foreground">{title}</span>
        <Badge
          variant={"outline"}
          className="text-xs flex items-center gap-0.5"
        >
          {change}
          {positive ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
        </Badge>
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm text-foreground">
        {label} <span className="text-primary">{positive ? "↗" : "↘"}</span>
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
    </Card>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { StatCardData } from "../types/dashboard";

interface StatCardProps extends StatCardData {
  isLoading?: boolean;
}

export function StatCard({
  title,
  value,
  change,
  changeType,
  description,
  icon,
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card className="p-4 shadow-none">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-3 w-32" />
      </Card>
    );
  }

  const TrendIcon =
    changeType === "positive"
      ? TrendingUp
      : changeType === "negative"
        ? TrendingDown
        : Minus;

  const trendColor =
    changeType === "positive"
      ? "text-emerald-600"
      : changeType === "negative"
        ? "text-red-600"
        : "text-muted-foreground";

  return (
    <Card className="p-4 shadow-none">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span className="text-sm text-muted-foreground">{title}</span>
        </div>
        <Badge variant="outline" className={`text-xs flex items-center gap-0.5 ${trendColor}`}>
          {change}
          <TrendIcon className="size-3" />
        </Badge>
      </div>
      <p className="text-3xl font-bold mb-1">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Card>
  );
}

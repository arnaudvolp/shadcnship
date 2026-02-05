"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  UserPlus,
  CreditCard,
  TrendingUp,
  TrendingDown,
  XCircle,
  Activity as ActivityIcon,
} from "lucide-react";
import type { Activity } from "../types/dashboard";

interface RecentActivityProps {
  activities: Activity[];
  isLoading?: boolean;
  maxItems?: number;
}

const activityIcons: Record<Activity["type"], React.ReactNode> = {
  signup: <UserPlus className="size-4 text-emerald-600" />,
  purchase: <CreditCard className="size-4 text-blue-600" />,
  upgrade: <TrendingUp className="size-4 text-emerald-600" />,
  downgrade: <TrendingDown className="size-4 text-orange-600" />,
  cancellation: <XCircle className="size-4 text-red-600" />,
  other: <ActivityIcon className="size-4 text-muted-foreground" />,
};

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function RecentActivity({
  activities,
  isLoading = false,
  maxItems = 10,
}: RecentActivityProps) {
  if (isLoading) {
    return (
      <Card className="p-4 shadow-none">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const displayedActivities = activities.slice(0, maxItems);

  return (
    <Card className="p-4 shadow-none">
      <h3 className="font-semibold text-sm mb-4">Recent Activity</h3>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {displayedActivities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent activity
            </p>
          ) : (
            displayedActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="relative">
                  {activity.user ? (
                    <Avatar className="size-8">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback className="text-xs">
                        {getInitials(activity.user.name)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                      {activityIcons[activity.type]}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 size-4 rounded-full bg-background flex items-center justify-center">
                    {activityIcons[activity.type]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    {activity.user && (
                      <span className="font-medium">{activity.user.name} </span>
                    )}
                    <span className="text-muted-foreground">{activity.description}</span>
                    {activity.amount !== undefined && (
                      <span className="font-medium"> ${activity.amount.toLocaleString()}</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}

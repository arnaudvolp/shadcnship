"use client";

import { cn } from "@/lib/utils";
import { ActivityItem } from "./activity-item";
import { ActivitySkeleton } from "./activity-skeleton";
import type { Activity } from "../types/activity";
import { format, isToday, isYesterday, parseISO } from "date-fns";

interface ActivityListProps {
  activities: Activity[];
  isLoading?: boolean;
  className?: string;
}

function groupActivitiesByDate(activities: Activity[]): Map<string, Activity[]> {
  const groups = new Map<string, Activity[]>();

  activities.forEach((activity) => {
    const date = parseISO(activity.createdAt);
    let key: string;

    if (isToday(date)) {
      key = "Today";
    } else if (isYesterday(date)) {
      key = "Yesterday";
    } else {
      key = format(date, "MMMM d, yyyy");
    }

    const existing = groups.get(key) || [];
    groups.set(key, [...existing, activity]);
  });

  return groups;
}

export function ActivityList({ activities, isLoading, className }: ActivityListProps) {
  if (isLoading && activities.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <ActivitySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className={cn("py-12 text-center", className)}>
        <p className="text-muted-foreground">No activity yet</p>
      </div>
    );
  }

  const groupedActivities = groupActivitiesByDate(activities);

  return (
    <div className={cn("space-y-6", className)}>
      {Array.from(groupedActivities.entries()).map(([date, dateActivities]) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 sticky top-0 bg-background py-1">
            {date}
          </h3>
          <div className="space-y-0">
            {dateActivities.map((activity, index) => (
              <div key={activity.id} className="relative">
                <ActivityItem activity={activity} />
                {/* Hide last timeline line */}
                {index === dateActivities.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-px bg-background" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

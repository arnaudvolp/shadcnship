"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActivityList, ActivityFilters, ActivitySkeleton } from "./components";
import { Loader2 } from "lucide-react";
import type { Activity, ActivityType, ActivityFeedProps } from "./types/activity";

// =============================================================================
// Demo Activities Data
// =============================================================================

const demoActivities: Activity[] = [
  {
    id: "1",
    type: "created",
    user: {
      id: "u1",
      name: "Sarah Connor",
      avatar: "https://avatar.vercel.sh/sarah",
    },
    target: {
      id: "p1",
      type: "project",
      name: "Website Redesign",
      href: "#",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "commented",
    user: {
      id: "u2",
      name: "John Doe",
      avatar: "https://avatar.vercel.sh/john",
    },
    target: {
      id: "t1",
      type: "task",
      name: "Update landing page",
      href: "#",
    },
    message: "Looking good! Just a few minor tweaks needed on the hero section.",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    type: "completed",
    user: {
      id: "u3",
      name: "Emily Chen",
      avatar: "https://avatar.vercel.sh/emily",
    },
    target: {
      id: "t2",
      type: "task",
      name: "Design system documentation",
      href: "#",
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    type: "mentioned",
    user: {
      id: "u2",
      name: "John Doe",
      avatar: "https://avatar.vercel.sh/john",
    },
    target: {
      id: "c1",
      type: "comment",
      name: "API integration review",
      href: "#",
    },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    type: "uploaded",
    user: {
      id: "u1",
      name: "Sarah Connor",
      avatar: "https://avatar.vercel.sh/sarah",
    },
    target: {
      id: "f1",
      type: "file",
      name: "design-mockups.fig",
      href: "#",
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    type: "assigned",
    user: {
      id: "u4",
      name: "Mike Johnson",
      avatar: "https://avatar.vercel.sh/mike",
    },
    target: {
      id: "t3",
      type: "task",
      name: "Backend API optimization",
      href: "#",
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    type: "joined",
    user: {
      id: "u5",
      name: "Alice Brown",
      avatar: "https://avatar.vercel.sh/alice",
    },
    target: {
      id: "team1",
      type: "team",
      name: "Engineering",
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "8",
    type: "updated",
    user: {
      id: "u3",
      name: "Emily Chen",
      avatar: "https://avatar.vercel.sh/emily",
    },
    target: {
      id: "d1",
      type: "document",
      name: "Q4 Roadmap",
      href: "#",
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "9",
    type: "shared",
    user: {
      id: "u2",
      name: "John Doe",
      avatar: "https://avatar.vercel.sh/john",
    },
    target: {
      id: "f2",
      type: "file",
      name: "quarterly-report.pdf",
      href: "#",
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "10",
    type: "liked",
    user: {
      id: "u4",
      name: "Mike Johnson",
      avatar: "https://avatar.vercel.sh/mike",
    },
    target: {
      id: "post1",
      type: "post",
      name: "Team milestone announcement",
      href: "#",
    },
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// =============================================================================
// Main Component
// =============================================================================

export default function ActivityFeed01({
  activities: propActivities,
  isLoading = false,
  hasMore = true,
  onLoadMore,
  onFilter,
  filterTypes: propFilterTypes,
  showFilters = true,
  className,
}: ActivityFeedProps) {
  const [internalFilterTypes, setInternalFilterTypes] = useState<ActivityType[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const activities = propActivities ?? demoActivities;
  const filterTypes = propFilterTypes ?? internalFilterTypes;

  const handleFilterChange = (types: ActivityType[]) => {
    if (onFilter) {
      onFilter(types);
    } else {
      setInternalFilterTypes(types);
    }
  };

  const handleLoadMore = async () => {
    if (onLoadMore) {
      setLoadingMore(true);
      try {
        await onLoadMore();
      } finally {
        setLoadingMore(false);
      }
    }
  };

  // Filter activities if filter types are selected
  const filteredActivities =
    filterTypes.length > 0
      ? activities.filter((a) => filterTypes.includes(a.type))
      : activities;

  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        {showFilters && (
          <ActivityFilters
            selectedTypes={filterTypes}
            onChange={handleFilterChange}
          />
        )}

        {/* Activity List */}
        <ScrollArea className="h-[500px] pr-4">
          <ActivityList
            activities={filteredActivities}
            isLoading={isLoading}
          />

          {/* Load More */}
          {hasMore && filteredActivities.length > 0 && (
            <div className="pt-4 flex justify-center">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore && <Loader2 className="size-4 mr-2 animate-spin" />}
                Load more
              </Button>
            </div>
          )}

          {/* Loading more skeleton */}
          {loadingMore && (
            <div className="pt-4 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ActivitySkeleton key={i} />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// Named Exports
// =============================================================================

export { ActivityFeed01 };

// Re-export types
export type {
  Activity,
  ActivityType,
  ActivityUser,
  ActivityTarget,
  ActivityFeedProps,
} from "./types/activity";

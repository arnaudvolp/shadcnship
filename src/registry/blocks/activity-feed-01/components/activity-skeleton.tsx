"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ActivitySkeletonProps {
  className?: string;
}

export function ActivitySkeleton({ className }: ActivitySkeletonProps) {
  return (
    <div className={cn("flex gap-3 py-3", className)}>
      <Skeleton className="size-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-3 w-24 ml-7" />
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
  className?: string;
}

export function UploadProgress({ progress, className }: UploadProgressProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <Progress value={progress} className="h-1" />
      <p className="text-xs text-muted-foreground text-right">{progress}%</p>
    </div>
  );
}

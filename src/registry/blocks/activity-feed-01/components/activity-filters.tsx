"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Trash2,
  MessageSquare,
  AtSign,
  UserPlus,
  CheckCircle,
  Upload,
  Share2,
  Heart,
  Filter,
  X,
} from "lucide-react";
import type { ActivityType } from "../types/activity";

interface ActivityFiltersProps {
  selectedTypes: ActivityType[];
  onChange: (types: ActivityType[]) => void;
  className?: string;
}

const filterOptions: { type: ActivityType; label: string; icon: typeof Plus }[] = [
  { type: "created", label: "Created", icon: Plus },
  { type: "updated", label: "Updated", icon: Pencil },
  { type: "deleted", label: "Deleted", icon: Trash2 },
  { type: "commented", label: "Comments", icon: MessageSquare },
  { type: "mentioned", label: "Mentions", icon: AtSign },
  { type: "assigned", label: "Assigned", icon: UserPlus },
  { type: "completed", label: "Completed", icon: CheckCircle },
  { type: "uploaded", label: "Uploads", icon: Upload },
  { type: "shared", label: "Shared", icon: Share2 },
  { type: "liked", label: "Likes", icon: Heart },
];

export function ActivityFilters({
  selectedTypes,
  onChange,
  className,
}: ActivityFiltersProps) {
  const toggleType = (type: ActivityType) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((t) => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="size-4" />
          <span>Filter by type</span>
        </div>
        {selectedTypes.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-auto py-1 px-2 text-xs"
          >
            <X className="size-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedTypes.includes(option.type);
          return (
            <Badge
              key={option.type}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                !isSelected && "hover:bg-muted"
              )}
              onClick={() => toggleType(option.type)}
            >
              <Icon className="size-3 mr-1" />
              {option.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

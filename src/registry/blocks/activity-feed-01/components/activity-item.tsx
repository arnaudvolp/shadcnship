"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Pencil,
  Trash2,
  MessageSquare,
  AtSign,
  UserPlus,
  CheckCircle,
  LogIn,
  LogOut,
  Upload,
  Share2,
  Heart,
  Circle,
} from "lucide-react";
import type { Activity, ActivityType } from "../types/activity";
import { formatDistanceToNow } from "date-fns";

interface ActivityItemProps {
  activity: Activity;
  className?: string;
}

const activityConfig: Record<ActivityType, { icon: typeof Plus; color: string; verb: string }> = {
  created: { icon: Plus, color: "text-green-500", verb: "created" },
  updated: { icon: Pencil, color: "text-blue-500", verb: "updated" },
  deleted: { icon: Trash2, color: "text-red-500", verb: "deleted" },
  commented: { icon: MessageSquare, color: "text-purple-500", verb: "commented on" },
  mentioned: { icon: AtSign, color: "text-orange-500", verb: "mentioned you in" },
  assigned: { icon: UserPlus, color: "text-cyan-500", verb: "assigned" },
  completed: { icon: CheckCircle, color: "text-green-500", verb: "completed" },
  joined: { icon: LogIn, color: "text-blue-500", verb: "joined" },
  left: { icon: LogOut, color: "text-gray-500", verb: "left" },
  uploaded: { icon: Upload, color: "text-indigo-500", verb: "uploaded" },
  shared: { icon: Share2, color: "text-pink-500", verb: "shared" },
  liked: { icon: Heart, color: "text-red-500", verb: "liked" },
};

export function ActivityItem({ activity, className }: ActivityItemProps) {
  const config = activityConfig[activity.type];
  const Icon = config.icon;

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={cn("flex gap-3 py-3", className)}>
      {/* Timeline line and icon */}
      <div className="relative flex flex-col items-center">
        <Avatar className="size-8 border-2 border-background z-10">
          <AvatarImage src={activity.user.avatar} />
          <AvatarFallback className="text-xs">
            {activity.user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="absolute top-10 bottom-0 w-px bg-border" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start gap-2">
          <div className={cn("size-5 rounded-full flex items-center justify-center mt-0.5", config.color)}>
            <Icon className="size-3" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span>
              <span className="text-muted-foreground"> {config.verb} </span>
              {activity.target && (
                <>
                  {activity.target.href ? (
                    <a
                      href={activity.target.href}
                      className="font-medium hover:underline"
                    >
                      {activity.target.name}
                    </a>
                  ) : (
                    <span className="font-medium">{activity.target.name}</span>
                  )}
                </>
              )}
            </p>
            {activity.message && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                "{activity.message}"
              </p>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground pl-7">
          {formatTime(activity.createdAt)}
        </p>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  Bell,
  Star,
} from "lucide-react";
import type { CalendarEvent, EventType } from "../types/calendar";

export const eventTypeConfig: Record<
  EventType,
  { icon: typeof Calendar; color: string; bgColor: string }
> = {
  meeting: {
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/50",
  },
  task: {
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/50",
  },
  reminder: {
    icon: Bell,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
  },
  event: {
    icon: Star,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/50",
  },
  holiday: {
    icon: Calendar,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/50",
  },
};

interface EventCardProps {
  event: CalendarEvent;
  compact?: boolean;
  onClick?: () => void;
}

export function EventCard({ event, compact = false, onClick }: EventCardProps) {
  const config = eventTypeConfig[event.type];
  const Icon = config.icon;
  const eventColor = event.color || config.color.replace("text-", "");

  const formatEventTime = () => {
    if (event.allDay) return "All day";
    const start = new Date(event.start);
    const end = new Date(event.end);
    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
  };

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left px-2 py-1 rounded text-xs truncate transition-colors",
          config.bgColor,
          config.color,
          "hover:opacity-80"
        )}
        style={event.color ? { backgroundColor: event.color + "20", color: event.color } : undefined}
      >
        <span className="font-medium">{event.title}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 rounded-lg border transition-colors hover:border-primary/50",
        config.bgColor
      )}
      style={event.color ? { backgroundColor: event.color + "10" } : undefined}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn("p-2 rounded-lg", config.bgColor)}
          style={event.color ? { backgroundColor: event.color + "20" } : undefined}
        >
          <Icon
            className={cn("size-4", config.color)}
            style={event.color ? { color: event.color } : undefined}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{event.title}</h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            <span>{formatEventTime()}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          {event.attendees && event.attendees.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-2">
                {event.attendees.slice(0, 3).map((attendee) => (
                  <div
                    key={attendee.id}
                    className="size-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-medium"
                    title={attendee.name}
                  >
                    {attendee.avatar ? (
                      <img
                        src={attendee.avatar}
                        alt={attendee.name}
                        className="size-full rounded-full object-cover"
                      />
                    ) : (
                      attendee.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                ))}
                {event.attendees.length > 3 && (
                  <div className="size-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-medium">
                    +{event.attendees.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

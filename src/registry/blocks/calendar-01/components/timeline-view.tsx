"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format, addDays, isSameDay, startOfDay } from "date-fns";
import type { CalendarEvent, TimelineViewProps } from "../types/calendar";

// Event icons - colored squares representing different event types
const eventIcons: Record<string, { bg: string; icon: string }> = {
  meeting: { bg: "bg-blue-100", icon: "🗓️" },
  task: { bg: "bg-green-100", icon: "✅" },
  reminder: { bg: "bg-yellow-100", icon: "🔔" },
  event: { bg: "bg-purple-100", icon: "🎉" },
  holiday: { bg: "bg-red-100", icon: "🏖️" },
};

interface TimelineEventCardProps {
  event: CalendarEvent;
  onClick?: () => void;
}

function TimelineEventCard({ event, onClick }: TimelineEventCardProps) {
  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "hh.mm a.").toLowerCase();
    } catch {
      return "";
    }
  };

  const iconConfig = eventIcons[event.type] || eventIcons.event;
  const isAvailable = event.isAvailable !== false;

  return (
    <div
      className="bg-background rounded-xl border p-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Icon and Title */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "size-10 rounded-lg flex items-center justify-center text-lg shrink-0",
            iconConfig.bg
          )}
        >
          {event.icon || iconConfig.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-sm line-clamp-2">{event.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatTime(event.start)} - {formatTime(event.end)}
          </p>
        </div>
      </div>

      {/* Description */}
      {event.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {event.description}
        </p>
      )}

      {/* Action Button */}
      <Button
        variant={isAvailable ? "default" : "secondary"}
        size="sm"
        className={cn(
          "w-full rounded-full text-xs",
          !isAvailable && "text-muted-foreground cursor-not-allowed"
        )}
        disabled={!isAvailable}
      >
        {isAvailable ? "Join the Meeting" : "Not Yet Available"}
      </Button>
    </div>
  );
}

export function TimelineView({ date, events, onEventClick }: TimelineViewProps) {
  // Generate 4 days starting from the provided date
  const days = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => addDays(date, i));
  }, [date]);

  // Group events by day
  const eventsByDay = useMemo(() => {
    const grouped: Record<string, CalendarEvent[]> = {};

    days.forEach((day) => {
      const dayKey = format(day, "yyyy-MM-dd");
      grouped[dayKey] = [];
    });

    events.forEach((event) => {
      const eventDate = startOfDay(new Date(event.start));
      days.forEach((day) => {
        if (isSameDay(eventDate, day)) {
          const dayKey = format(day, "yyyy-MM-dd");
          if (grouped[dayKey]) {
            grouped[dayKey].push(event);
          }
        }
      });
    });

    // Sort events by start time within each day
    Object.keys(grouped).forEach((dayKey) => {
      grouped[dayKey].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      );
    });

    return grouped;
  }, [events, days]);

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-4 gap-4 min-w-[800px]">
        {days.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const dayEvents = eventsByDay[dayKey] || [];

          return (
            <div key={dayKey} className="flex flex-col">
              {/* Day Header */}
              <div className="pb-4">
                <p className="text-sm text-muted-foreground">
                  {format(day, "EEEE")},{" "}
                  <span className="text-foreground font-medium">
                    {format(day, "d MMMM")}
                  </span>
                </p>
              </div>

              {/* Events */}
              <div className="space-y-3 flex-1">
                {dayEvents.map((event) => (
                  <TimelineEventCard
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick?.(event)}
                  />
                ))}

                {dayEvents.length === 0 && (
                  <div className="h-32 flex items-center justify-center text-sm text-muted-foreground border border-dashed rounded-xl">
                    No events
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

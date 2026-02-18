"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  eachHourOfInterval,
  format,
  isSameDay,
  isToday,
  startOfDay,
  endOfDay,
  getHours,
  getMinutes,
} from "date-fns";
import { eventTypeConfig } from "./event-card";
import type { CalendarEvent } from "../types/calendar";

interface WeekViewProps {
  date: Date;
  events: CalendarEvent[];
  onTimeClick: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export function WeekView({
  date,
  events,
  onTimeClick,
  onEventClick,
}: WeekViewProps) {
  const days = useMemo(() => {
    const weekStart = startOfWeek(date);
    const weekEnd = endOfWeek(date);
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [date]);

  const hours = useMemo(() => {
    const dayStart = startOfDay(new Date());
    const dayEnd = endOfDay(new Date());
    return eachHourOfInterval({ start: dayStart, end: dayEnd });
  }, []);

  const getEventsForDayAndHour = (day: Date, hour: number) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventHour = getHours(eventStart);
      return isSameDay(eventStart, day) && eventHour === hour && !event.allDay;
    });
  };

  const getAllDayEvents = (day: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start);
      return event.allDay && isSameDay(eventStart, day);
    });
  };

  const getEventPosition = (event: CalendarEvent) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const startMinutes = getHours(start) * 60 + getMinutes(start);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60);
    return {
      top: `${(startMinutes / (24 * 60)) * 100}%`,
      height: `${Math.max((duration / (24 * 60)) * 100, 2)}%`,
    };
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header with day names */}
      <div className="grid grid-cols-8 bg-muted border-b">
        <div className="p-2 text-center text-xs text-muted-foreground border-r">
          GMT
        </div>
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "p-2 text-center border-r last:border-r-0",
              isToday(day) && "bg-primary/10"
            )}
          >
            <p className="text-xs text-muted-foreground">{format(day, "EEE")}</p>
            <p
              className={cn(
                "text-lg font-semibold",
                isToday(day) && "text-primary"
              )}
            >
              {format(day, "d")}
            </p>
          </div>
        ))}
      </div>

      {/* All-day events row */}
      <div className="grid grid-cols-8 border-b bg-muted/50">
        <div className="p-2 text-xs text-muted-foreground border-r">
          All day
        </div>
        {days.map((day) => {
          const allDayEvents = getAllDayEvents(day);
          return (
            <div key={day.toISOString()} className="p-1 border-r last:border-r-0 min-h-[40px]">
              {allDayEvents.map((event) => {
                const config = eventTypeConfig[event.type];
                return (
                  <button
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    className={cn(
                      "w-full text-left px-2 py-0.5 rounded text-xs truncate mb-1",
                      config.bgColor,
                      config.color
                    )}
                    style={event.color ? { backgroundColor: event.color + "20", color: event.color } : undefined}
                  >
                    {event.title}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="relative h-[600px] overflow-y-auto">
        <div className="grid grid-cols-8 min-h-full">
          {/* Time labels */}
          <div className="border-r">
            {hours.map((hour, index) => (
              <div
                key={index}
                className="h-12 border-b text-xs text-muted-foreground pr-2 text-right"
              >
                {format(hour, "h a")}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day) => (
            <div key={day.toISOString()} className="relative border-r last:border-r-0">
              {hours.map((_, hourIndex) => (
                <div
                  key={hourIndex}
                  className="h-12 border-b hover:bg-muted/50 cursor-pointer"
                  onClick={() => {
                    const clickedDate = new Date(day);
                    clickedDate.setHours(hourIndex);
                    onTimeClick(clickedDate);
                  }}
                />
              ))}

              {/* Events overlay */}
              {events
                .filter((event) => {
                  const eventStart = new Date(event.start);
                  return isSameDay(eventStart, day) && !event.allDay;
                })
                .map((event) => {
                  const config = eventTypeConfig[event.type];
                  const position = getEventPosition(event);
                  return (
                    <button
                      key={event.id}
                      onClick={() => onEventClick?.(event)}
                      className={cn(
                        "absolute left-1 right-1 px-2 py-1 rounded text-xs overflow-hidden",
                        config.bgColor,
                        config.color,
                        "hover:opacity-80 transition-opacity"
                      )}
                      style={{
                        top: position.top,
                        minHeight: "20px",
                        ...(event.color ? { backgroundColor: event.color + "20", color: event.color } : {}),
                      }}
                    >
                      <p className="font-medium truncate">{event.title}</p>
                      <p className="text-[10px] opacity-80">
                        {format(new Date(event.start), "h:mm a")}
                      </p>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

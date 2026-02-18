"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { addDays, setHours, setMinutes, startOfDay } from "date-fns";
import {
  CalendarHeader,
  TimelineView,
  CreateEventDialog,
} from "./components";
import type { CalendarEvent, CalendarView, CalendarProps } from "./types/calendar";

// =============================================================================
// Demo Data
// =============================================================================

const createDemoEvents = (): CalendarEvent[] => {
  const today = startOfDay(new Date());
  const events: CalendarEvent[] = [];

  // Daily Standups for all 4 days
  for (let i = 0; i < 4; i++) {
    const day = addDays(today, i);
    events.push({
      id: `standup_${i}`,
      title: "Daily Standup",
      description: "Daily meeting to update team alignment, communication, and progress.",
      start: setMinutes(setHours(day, 9), 30).toISOString(),
      end: setMinutes(setHours(day, 10), 30).toISOString(),
      type: "meeting",
      icon: "🗓️",
      isAvailable: i === 0, // Only first day is available
    });
  }

  // Day 1 events
  events.push({
    id: "team_building_1",
    title: "Team Building",
    description: "Fostering stronger connections and improving teamwork for better results.",
    start: setMinutes(setHours(today, 11), 0).toISOString(),
    end: setMinutes(setHours(today, 11), 30).toISOString(),
    type: "event",
    icon: "🤝",
    isAvailable: false,
  });

  events.push({
    id: "mentorship_1",
    title: "Mentorship & Sponsorship",
    description: "Guiding growth and providing support for individual and team success.",
    start: setMinutes(setHours(today, 11), 30).toISOString(),
    end: setMinutes(setHours(today, 11), 50).toISOString(),
    type: "meeting",
    icon: "🎓",
    isAvailable: false,
  });

  events.push({
    id: "risk_1",
    title: "Risk Assessment",
    description: "Review the project's risk management plan and make necessary adjustments.",
    start: setMinutes(setHours(today, 12), 30).toISOString(),
    end: setMinutes(setHours(today, 13), 30).toISOString(),
    type: "task",
    icon: "⚠️",
    isAvailable: false,
  });

  // Day 2 events
  const day2 = addDays(today, 1);
  events.push({
    id: "agile_2",
    title: "Agile Methodology",
    description: "Enhancing flexibility and collaboration to deliver value faster.",
    start: setMinutes(setHours(day2, 11), 30).toISOString(),
    end: setMinutes(setHours(day2, 11), 50).toISOString(),
    type: "meeting",
    icon: "🔄",
    isAvailable: false,
  });

  // Day 3 events
  const day3 = addDays(today, 2);
  events.push({
    id: "devops_3",
    title: "DevOps & CI/CD",
    description: "I'd like to discuss our plan for the next quarter. I'll add the agenda later.",
    start: setMinutes(setHours(day3, 11), 0).toISOString(),
    end: setMinutes(setHours(day3, 11), 30).toISOString(),
    type: "meeting",
    icon: "⚙️",
    isAvailable: false,
  });

  events.push({
    id: "knowledge_3",
    title: "Knowledge Sharing",
    description: "Discuss recent articles, or conferences that members have found valuable.",
    start: setMinutes(setHours(day3, 12), 30).toISOString(),
    end: setMinutes(setHours(day3, 13), 30).toISOString(),
    type: "event",
    icon: "📚",
    isAvailable: false,
  });

  // Day 4 events
  const day4 = addDays(today, 3);
  events.push({
    id: "risk_4",
    title: "Risk Assessment",
    description: "Review the project's risk management plan and make necessary adjustments.",
    start: setMinutes(setHours(day4, 12), 30).toISOString(),
    end: setMinutes(setHours(day4, 13), 30).toISOString(),
    type: "task",
    icon: "⚠️",
    isAvailable: false,
  });

  return events;
};

// =============================================================================
// Calendar Component
// =============================================================================

export default function Calendar({
  events: externalEvents,
  projectName = "Team Project - Timeline",
  view: externalView,
  date: externalDate,
  onDateChange,
  onViewChange,
  onEventClick,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  isLoading,
  className,
}: CalendarProps) {
  const [internalEvents, setInternalEvents] = useState<CalendarEvent[]>(createDemoEvents);
  const [internalView, setInternalView] = useState<CalendarView>("timeline");
  const [internalDate, setInternalDate] = useState(new Date());
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createDialogDate, setCreateDialogDate] = useState<Date>(new Date());

  // Use external state if provided
  const events = externalEvents ?? internalEvents;
  const view = externalView ?? internalView;
  const date = externalDate ?? internalDate;

  const handleDateChange = (newDate: Date) => {
    if (onDateChange) {
      onDateChange(newDate);
    } else {
      setInternalDate(newDate);
    }
  };

  const handleViewChange = (newView: CalendarView) => {
    if (onViewChange) {
      onViewChange(newView);
    } else {
      setInternalView(newView);
    }
  };

  const handleToday = () => {
    handleDateChange(new Date());
  };

  const handleCreateEvent = (eventData: Partial<CalendarEvent>) => {
    if (onEventCreate) {
      onEventCreate(eventData);
    } else {
      const newEvent: CalendarEvent = {
        id: `event_${Date.now()}`,
        title: eventData.title || "Untitled",
        description: eventData.description,
        start: eventData.start || new Date().toISOString(),
        end: eventData.end || new Date().toISOString(),
        type: eventData.type || "event",
        allDay: eventData.allDay,
        location: eventData.location,
        color: eventData.color,
        isAvailable: true,
      };
      setInternalEvents((prev) => [...prev, newEvent]);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (onEventClick) {
      onEventClick(event);
    } else {
      console.log("Event clicked:", event);
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <CalendarHeader
          date={date}
          view={view}
          projectName={projectName}
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
          onToday={handleToday}
          onCreateEvent={() => {
            setCreateDialogDate(new Date());
            setCreateDialogOpen(true);
          }}
        />

        {view === "timeline" && (
          <TimelineView
            date={date}
            events={events}
            onEventClick={handleEventClick}
          />
        )}

        <CreateEventDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onCreate={handleCreateEvent}
          defaultDate={createDialogDate}
        />
      </CardContent>
    </Card>
  );
}

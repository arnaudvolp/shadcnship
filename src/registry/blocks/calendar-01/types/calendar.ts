// =============================================================================
// Calendar Types
// =============================================================================

export type CalendarView = "timeline" | "month" | "week";

export type EventType = "meeting" | "task" | "reminder" | "event" | "holiday";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO date string
  end: string;
  allDay?: boolean;
  type: EventType;
  color?: string;
  icon?: string;
  location?: string;
  isAvailable?: boolean;
  attendees?: {
    id: string;
    name: string;
    avatar?: string;
    status?: "accepted" | "declined" | "tentative" | "pending";
  }[];
  recurrence?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval?: number;
    until?: string;
  };
  reminders?: number[]; // minutes before
}

export interface CalendarProps {
  events?: CalendarEvent[];
  projectName?: string;
  view?: CalendarView;
  date?: Date;
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: CalendarView) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventCreate?: (event: Partial<CalendarEvent>) => void;
  onEventUpdate?: (eventId: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete?: (eventId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export interface CalendarHeaderProps {
  date: Date;
  view: CalendarView;
  projectName?: string;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
  onToday: () => void;
}

export interface MonthViewProps {
  date: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export interface WeekViewProps {
  date: Date;
  events: CalendarEvent[];
  onTimeClick: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export interface TimelineViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

export interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  onTimeClick: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export interface EventCardProps {
  event: CalendarEvent;
  compact?: boolean;
  onClick?: () => void;
}

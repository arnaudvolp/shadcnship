// Components
export { CalendarHeader } from "./calendar-header";
export { MonthView } from "./month-view";
export { WeekView } from "./week-view";
export { TimelineView } from "./timeline-view";
export { EventCard, eventTypeConfig } from "./event-card";
export { CreateEventDialog } from "./create-event-dialog";

// Re-export types
export type {
  CalendarView,
  EventType,
  CalendarEvent,
  CalendarProps,
  CalendarHeaderProps,
  MonthViewProps,
  WeekViewProps,
  TimelineViewProps,
  DayViewProps,
  EventCardProps,
} from "../types/calendar";

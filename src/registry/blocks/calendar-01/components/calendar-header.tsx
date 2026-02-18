"use client";

import { Button } from "@/components/ui/button";
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  SlidersHorizontal,
  MoreHorizontal,
} from "lucide-react";
import type { CalendarView } from "../types/calendar";

interface CalendarHeaderProps {
  date: Date;
  view: CalendarView;
  projectName?: string;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
  onToday: () => void;
  onCreateEvent?: () => void;
}

export function CalendarHeader({
  date,
  view,
  projectName = "Team Project - Timeline",
  onDateChange,
  onViewChange,
  onToday,
  onCreateEvent,
}: CalendarHeaderProps) {
  const navigatePrev = () => {
    switch (view) {
      case "month":
        onDateChange(subMonths(date, 1));
        break;
      case "week":
        onDateChange(subWeeks(date, 1));
        break;
      case "timeline":
        onDateChange(subDays(date, 4));
        break;
    }
  };

  const navigateNext = () => {
    switch (view) {
      case "month":
        onDateChange(addMonths(date, 1));
        break;
      case "week":
        onDateChange(addWeeks(date, 1));
        break;
      case "timeline":
        onDateChange(addDays(date, 4));
        break;
    }
  };

  // Format date range for timeline view
  const getDateRangeText = () => {
    if (view === "timeline") {
      const endDate = addDays(date, 3);
      return `${format(date, "dd")} - ${format(endDate, "dd MMM yyyy")}`;
    }
    return format(date, "MMMM yyyy");
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left: Project name */}
      <h2 className="text-lg font-semibold">{projectName}</h2>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Today button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onToday}
          aria-label="Go to today"
        >
          Today
        </Button>

        {/* Navigation */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={navigatePrev}
            aria-label="Previous period"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={navigateNext}
            aria-label="Next period"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* Date Range */}
        <Button variant="outline" size="sm" className="gap-2 font-normal">
          <Calendar className="size-4" />
          {getDateRangeText()}
        </Button>

        {/* Filter */}
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="size-4" />
          Filter
        </Button>

        {/* More options */}
        <Button variant="ghost" size="icon" className="size-8" aria-label="More options">
          <MoreHorizontal className="size-4" />
        </Button>
      </div>
    </div>
  );
}

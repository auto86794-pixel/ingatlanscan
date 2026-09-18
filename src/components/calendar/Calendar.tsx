"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CalendarHeader from "./CalendarHeader";

import CalendarMonth from "./views/CalendarMonth";
import CalendarWeek from "./views/CalendarWeek";
import CalendarDay from "./views/CalendarDay";
import CalendarAgenda from "./views/CalendarAgenda";

import {
  buildEventIndex,
  getMonthEvents,
} from "./calendar-filters";

import {
  monthName,
  nextMonth,
  previousMonth,
} from "./calendar-utils";

import type {
  CalendarEvent,
  CalendarView,
} from "@/types/calendar";

type CalendarProps = {
  events: CalendarEvent[];
};

export default function Calendar({
  events,
}: CalendarProps) {
  const router = useRouter();

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const [view, setView] =
    useState<CalendarView>("month");

  const monthEvents = useMemo(
    () =>
      getMonthEvents(
        events,
        currentDate
      ),
    [events, currentDate]
  );

  const eventIndex = useMemo(
    () => buildEventIndex(monthEvents),
    [monthEvents]
  );

  function handlePrevious() {
    setCurrentDate((date) =>
      previousMonth(date)
    );
  }

  function handleNext() {
    setCurrentDate((date) =>
      nextMonth(date)
    );
  }

  function handleToday() {
    setCurrentDate(new Date());
  }

  function handleDateClick(date: Date) {
    router.push(
      `/tasks/new?start_at=${date.toISOString()}`
    );
  }

  return (
    <div className="space-y-6">
      <CalendarHeader
        title={monthName(currentDate)}
        view={view}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onViewChange={setView}
      />

      {view === "month" && (
        <CalendarMonth
          currentDate={currentDate}
          eventIndex={eventIndex}
          onDateClick={handleDateClick}
        />
      )}

      {view === "week" && (
        <CalendarWeek
          currentDate={currentDate}
          eventIndex={eventIndex}
          onDateClick={handleDateClick}
        />
      )}

      {view === "day" && (
        <CalendarDay
          currentDate={currentDate}
          eventIndex={eventIndex}
          onDateClick={handleDateClick}
        />
      )}

      {view === "agenda" && (
        <CalendarAgenda
          events={monthEvents}
        />
      )}
    </div>
  );
}
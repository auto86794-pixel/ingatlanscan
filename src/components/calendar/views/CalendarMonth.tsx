"use client";

import { useMemo } from "react";

import CalendarCell from "../CalendarCell";

import {
  getDayEvents,
  type EventIndex,
} from "../calendar-filters";

import {
  WEEK_DAYS,
  getMonthGrid,
  isCurrentMonth,
  isToday,
} from "../calendar-utils";

type CalendarMonthProps = {
  currentDate: Date;
  eventIndex: EventIndex;
  onDateClick?: (date: Date) => void;
};

export default function CalendarMonth({
  currentDate,
  eventIndex,
  onDateClick,
}: CalendarMonthProps) {
  const days = useMemo(
    () => getMonthGrid(currentDate),
    [currentDate]
  );

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="border-r border-slate-200 p-3 text-center text-sm font-semibold text-slate-600 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((date) => (
          <CalendarCell
            key={date.toISOString()}
            date={date}
            events={getDayEvents(
              eventIndex,
              date
            )}
            isToday={isToday(date)}
            isCurrentMonth={isCurrentMonth(
              date,
              currentDate
            )}
            onClick={onDateClick}
          />
        ))}
      </div>
    </div>
  );
}
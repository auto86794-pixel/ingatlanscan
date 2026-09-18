"use client";

import {
  formatHour,
} from "../calendar-utils";

type CalendarWeekGridProps = {
  weekDays: Date[];
  hours: number[];
};

export default function CalendarWeekGrid({
  weekDays,
  hours,
}: CalendarWeekGridProps) {
  return (
    <>
      {hours.map((hour) => (
        <div
          key={hour}
          className="grid border-b border-slate-200 last:border-b-0"
          style={{
            gridTemplateColumns:
              "80px repeat(7, minmax(0, 1fr))",
          }}
        >
          <div className="border-r border-slate-200 bg-slate-50 p-3 text-right text-sm text-slate-500">
            {formatHour(hour)}
          </div>

          {weekDays.map((date) => (
            <div
              key={`${date.toISOString()}-${hour}`}
              className="min-h-[64px] border-r border-slate-200 transition hover:bg-slate-50 last:border-r-0"
            />
          ))}
        </div>
      ))}
    </>
  );
}
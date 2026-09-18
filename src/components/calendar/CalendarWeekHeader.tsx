"use client";

import {
  WEEK_DAYS,
  isToday,
} from "./calendar-utils";

type CalendarWeekHeaderProps = {
  weekDays: Date[];
  onDateClick?: (date: Date) => void;
};

export default function CalendarWeekHeader({
  weekDays,
  onDateClick,
}: CalendarWeekHeaderProps) {
  return (
    <div
      className="grid border-b border-slate-200"
      style={{
        gridTemplateColumns:
          "80px repeat(7, minmax(0, 1fr))",
      }}
    >
      <div className="border-r border-slate-200 bg-slate-50" />

      {weekDays.map((date, index) => (
        <button
          key={date.toISOString()}
          type="button"
          onClick={() => onDateClick?.(date)}
          className="border-r border-slate-200 bg-slate-50 p-4 text-center transition hover:bg-slate-100 last:border-r-0"
        >
          <div className="text-sm text-slate-500">
            {WEEK_DAYS[index]}
          </div>

          <div
            className={`mx-auto mt-2 flex h-9 w-9 items-center justify-center rounded-full font-semibold ${
              isToday(date)
                ? "bg-blue-600 text-white"
                : ""
            }`}
          >
            {date.getDate()}
          </div>
        </button>
      ))}
    </div>
  );
}
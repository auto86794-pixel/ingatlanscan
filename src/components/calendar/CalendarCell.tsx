"use client";

import CalendarEvent from "./CalendarEvent";

import type { CalendarEvent as CalendarEventType } from "@/types/calendar";

type CalendarCellProps = {
  date: Date;
  events: CalendarEventType[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onClick?: (date: Date) => void;
};

export default function CalendarCell({
  date,
  events,
  isToday,
  isCurrentMonth,
  onClick,
}: CalendarCellProps) {
  return (
    <div
      onClick={() => onClick?.(date)}
      className={`min-h-[140px] cursor-pointer border border-slate-200 p-2 transition hover:bg-slate-50 ${
        isCurrentMonth
          ? "bg-white"
          : "bg-slate-50 text-slate-400"
      }`}
    >
      <div
        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
          isToday
            ? "bg-blue-600 text-white"
            : "text-slate-700"
        }`}
      >
        {date.getDate()}
      </div>

      <div className="space-y-1">
        {events.slice(0, 3).map((event) => (
          <CalendarEvent
            key={event.id}
            event={event}
          />
        ))}

        {events.length > 3 && (
          <div className="rounded px-2 py-1 text-xs font-medium text-slate-500">
            +{events.length - 3} további
          </div>
        )}
      </div>
    </div>
  );
}
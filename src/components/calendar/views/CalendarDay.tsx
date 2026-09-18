"use client";

import CalendarEvent from "../CalendarEvent";

import {
  getDayEvents,
  type EventIndex,
} from "../calendar-filters";

import { isToday } from "../calendar-utils";

type CalendarDayProps = {
  currentDate: Date;
  eventIndex: EventIndex;
  onDateClick?: (date: Date) => void;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

export default function CalendarDay({
  currentDate,
  eventIndex,
  onDateClick,
}: CalendarDayProps) {
  const events = getDayEvents(
    eventIndex,
    currentDate
  );

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() =>
          onDateClick?.(currentDate)
        }
        className="w-full border-b border-slate-200 bg-slate-50 p-4 text-left transition hover:bg-slate-100"
      >
        <div className="text-sm text-slate-500">
          {isToday(currentDate)
            ? "Ma"
            : ""}
        </div>

        <div className="mt-1 text-xl font-semibold">
          {formatDate(currentDate)}
        </div>
      </button>

      <div className="p-4">
        {events.length === 0 ? (
          <div className="py-10 text-center text-slate-500">
            Erre a napra nincs esemény.
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <CalendarEvent
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
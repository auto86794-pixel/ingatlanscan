"use client";

import CalendarEvent from "../CalendarEvent";

import type { CalendarEvent as CalendarEventType } from "@/types/calendar";

type CalendarAgendaProps = {
  events: CalendarEventType[];
};

function formatDate(date: Date) {
  return date.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

export default function CalendarAgenda({
  events,
}: CalendarAgendaProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Nincs megjeleníthető esemény ebben a hónapban.
      </div>
    );
  }

  let previousDate = "";

  return (
    <div className="space-y-6">
      {events.map((event) => {
        const date = new Date(event.start_at!);

        const currentDate = date.toDateString();

        const showHeader =
          currentDate !== previousDate;

        previousDate = currentDate;

        return (
          <div key={event.id}>
            {showHeader && (
              <div className="mb-3 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-700">
                {formatDate(date)}
              </div>
            )}

            <CalendarEvent event={event} />
          </div>
        );
      })}
    </div>
  );
}
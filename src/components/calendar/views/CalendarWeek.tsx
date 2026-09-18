"use client";

import CalendarEvent from "../CalendarEvent";

import {
  getHourEvents,
  type EventIndex,
} from "../calendar-filters";

import {
  getEventHeight,
} from "../calendar-layout";

import {
  WEEK_DAYS,
  formatHour,
  getHours,
  getWeekDays,
  isToday,
} from "../calendar-utils";

type CalendarWeekProps = {
  currentDate: Date;
  eventIndex: EventIndex;
  onDateClick?: (date: Date) => void;
};

export default function CalendarWeek({
  currentDate,
  eventIndex,
  onDateClick,
}: CalendarWeekProps) {
  const weekDays =
    getWeekDays(currentDate);

  const hours = getHours();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Fejléc */}
          <div
            className="sticky top-0 z-10 grid border-b border-slate-200 bg-white"
            style={{
              gridTemplateColumns:
                "80px repeat(7, minmax(110px, 1fr))",
            }}
          >
            <div className="border-r border-slate-200 bg-slate-50" />

            {weekDays.map((date, index) => (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() =>
                  onDateClick?.(date)
                }
                className="border-r border-slate-200 bg-slate-50 px-2 py-3 text-center transition hover:bg-slate-100 last:border-r-0"
              >
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {WEEK_DAYS[index]}
                </div>

                <div
                  className={`mx-auto mt-2 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                    isToday(date)
                      ? "bg-blue-600 text-white"
                      : "text-slate-800"
                  }`}
                >
                  {date.getDate()}
                </div>
              </button>
            ))}
          </div>

          {/* Órarács */}
          {hours.map((hour) => (
            <div
              key={hour}
              className="grid border-b border-slate-200 last:border-b-0"
              style={{
                gridTemplateColumns:
                  "80px repeat(7, minmax(110px, 1fr))",
              }}
            >
              <div className="border-r border-slate-200 bg-slate-50 p-3 text-right text-sm text-slate-500">
                {formatHour(hour)}
              </div>

              {weekDays.map((date) => {
                const events =
                  getHourEvents(
                    eventIndex,
                    date,
                    hour
                  );

                return (
                  <div
                    key={`${date.toISOString()}-${hour}`}
                    className="min-h-[72px] border-r border-slate-200 p-2 transition hover:bg-slate-50 last:border-r-0"
                  >
                    <div className="space-y-2">
                      {events.map((event) => (
                        <CalendarEvent
                          key={event.id}
                          event={event}
                          height={getEventHeight(
                            event
                          )}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
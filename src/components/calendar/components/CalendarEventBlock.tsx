"use client";

import type { CSSProperties } from "react";

import type { CalendarEvent } from "@/types/calendar";

type CalendarEventBlockProps = {
  event: CalendarEvent;
  top: number;
  height: number;
  left: string;
  width: string;
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CalendarEventBlock({
  event,
  top,
  height,
  left,
  width,
}: CalendarEventBlockProps) {
  const start = event.start_at
    ? new Date(event.start_at)
    : null;

  const renderedHeight = Math.max(
    height - 2,
    32
  );

  const isCompact = renderedHeight < 44;

  const style: CSSProperties = {
    position: "absolute",
    top: top + 1,
    left,
    width,
    height: renderedHeight,
  };

  return (
    <div
      style={style}
      className="pointer-events-auto z-10 overflow-hidden rounded-lg border border-blue-300 bg-blue-100 px-2 py-1 text-xs shadow-sm transition-all duration-150 hover:z-20 hover:border-blue-400 hover:shadow-md"
    >
      {isCompact ? (
        <div className="truncate font-semibold leading-5 text-slate-900">
          {start && (
            <span className="mr-1 text-blue-700">
              {formatTime(start)}
            </span>
          )}

          {event.title}
        </div>
      ) : (
        <>
          {start && (
            <div className="font-medium leading-4 text-blue-700">
              {formatTime(start)}
            </div>
          )}

          <div className="truncate font-semibold leading-4 text-slate-900">
            {event.title}
          </div>

          {event.location &&
            renderedHeight >= 56 && (
              <div className="mt-1 truncate text-[11px] leading-4 text-slate-600">
                {event.location}
              </div>
            )}
        </>
      )}
    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";

import type { CalendarEvent } from "@/types/calendar";

type CalendarEventProps = {
  event: CalendarEvent;
  height?: number;
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTypeIcon(type?: string) {
  switch (type) {
    case "meeting":
      return "🤝";

    case "call":
      return "📞";

    case "visit":
      return "🏡";

    default:
      return "✅";
  }
}

function getTypeColor(type?: string) {
  switch (type) {
    case "meeting":
      return "border-l-green-500 bg-green-50";

    case "call":
      return "border-l-orange-500 bg-orange-50";

    case "visit":
      return "border-l-purple-500 bg-purple-50";

    default:
      return "border-l-blue-500 bg-blue-50";
  }
}

export default function CalendarEvent({
  event,
  height,
}: CalendarEventProps) {
  const router = useRouter();

  const start = event.start_at
    ? new Date(event.start_at)
    : null;

  function handleClick(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    e.stopPropagation();

    router.push(`/tasks/${event.id}`);
  }

  return (
    <div
      onClick={handleClick}
      style={
        height
          ? {
              minHeight: `${height}px`,
            }
          : undefined
      }
      className={`cursor-pointer rounded-lg border border-slate-200 border-l-4 p-3 transition hover:bg-slate-100 hover:shadow-sm ${getTypeColor(
        event.type
      )}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
          {getTypeIcon(event.type)}
        </div>

        <div className="min-w-0 flex-1">
          {start && (
            <div className="text-xs font-medium text-slate-500">
              {formatTime(start)}
            </div>
          )}

          <div className="truncate font-semibold text-slate-900">
            {event.title}
          </div>

          {event.description && (
            <div className="mt-1 line-clamp-2 text-sm text-slate-600">
              {event.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
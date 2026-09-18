import {
  CalendarDays,
  Home,
  MapPin,
} from "lucide-react";

import type {
  CalendarEvent,
} from "@/types/calendar";

type MeetingHeaderProps = {
  event: CalendarEvent;
};

export default function MeetingHeader({
  event,
}: MeetingHeaderProps) {
  return (
    <header className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Találkozó
          </span>

          <h1 className="text-3xl font-bold text-slate-900">
            {event.client_name ??
              "Ismeretlen ügyfél"}
          </h1>

          <div className="space-y-2 text-slate-600">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 shrink-0 text-slate-400" />
              <span>
                {event.property_title ??
                  "Nincs ingatlan"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
              <span>
                {event.address ??
                  event.location ??
                  "Nincs cím"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
              <span>
                {formatDate(event.start_at)}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">
            Kezdés
          </div>

          <div className="mt-2 text-3xl font-bold text-slate-900">
            {formatTime(event.start_at)}
          </div>

          <div className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {event.status}
          </div>
        </div>
      </div>
    </header>
  );
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return "-";
  }

  return new Date(value)
    .toLocaleDateString(
      "hu-HU",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
}

function formatTime(
  value: string | null
) {
  if (!value) {
    return "-";
  }

  return new Date(value)
    .toLocaleTimeString(
      "hu-HU",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
}
import Link from "next/link";

import type { CalendarEvent } from "@/types/calendar";

type MeetingActionsProps = {
  event: CalendarEvent;
};

export default function MeetingActions({
  event,
}: MeetingActionsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        📞 Gyors műveletek
      </h2>

      <div className="space-y-3">
        {event.client_phone && (
          <a
            href={`tel:${event.client_phone}`}
            className="block rounded-xl bg-blue-600 px-4 py-3 text-center font-medium text-white transition hover:bg-blue-700"
          >
            📞 Ügyfél hívása
          </a>
        )}

        {event.address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              event.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-slate-100 px-4 py-3 text-center font-medium transition hover:bg-slate-200"
          >
            🧭 Navigáció
          </a>
        )}

        {event.case_id && (
          <Link
            href={`/cases/${event.case_id}`}
            className="block rounded-xl bg-slate-100 px-4 py-3 text-center font-medium transition hover:bg-slate-200"
          >
            📄 Ügy megnyitása
          </Link>
        )}
      </div>
    </div>
  );
}
import type {
  CalendarEvent,
} from "@/types/calendar";

type MeetingClientProps = {
  event: CalendarEvent;
};

export default function MeetingClient({
  event,
}: MeetingClientProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        👤 Ügyfél
      </h2>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-slate-500">
            Név
          </div>

          <div className="mt-1 text-lg font-semibold text-slate-900">
            {event.client_name ??
              "Nincs megadva"}
          </div>
        </div>

        <div>
          <div className="text-sm text-slate-500">
            Telefonszám
          </div>

          <div className="mt-1 text-slate-900">
            {event.client_phone ??
              "-"}
          </div>
        </div>

        <div>
          <div className="text-sm text-slate-500">
            E-mail
          </div>

          <div className="mt-1 text-slate-900 break-all">
            {event.client_email ??
              "-"}
          </div>
        </div>
      </div>
    </section>
  );
}
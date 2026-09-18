import { Building2, MapPin, BriefcaseBusiness } from "lucide-react";

import type {
  CalendarEvent,
} from "@/types/calendar";

type MeetingPropertyProps = {
  event: CalendarEvent;
};

export default function MeetingProperty({
  event,
}: MeetingPropertyProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-slate-500" />

        <h2 className="text-lg font-semibold">
          Ingatlan
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-slate-500">
            Ingatlan
          </div>

          <div className="mt-1 flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Building2 className="h-4 w-4 text-slate-400" />

            <span>
              {event.property_title ??
                "Nincs megadva"}
            </span>
          </div>
        </div>

        <div>
          <div className="text-sm text-slate-500">
            Cím
          </div>

          <div className="mt-1 flex items-center gap-2 text-slate-900">
            <MapPin className="h-4 w-4 text-slate-400" />

            <span>
              {event.address ??
                event.location ??
                "-"}
            </span>
          </div>
        </div>

        <div>
          <div className="text-sm text-slate-500">
            Ügy
          </div>

          <div className="mt-1 flex items-center gap-2 text-slate-900">
            <BriefcaseBusiness className="h-4 w-4 text-slate-400" />

            <span>
              {event.case_title ??
                "-"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
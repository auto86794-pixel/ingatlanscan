import { Clock3 } from "lucide-react";

import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";

import type { TimelineItem } from "@/types/timeline";

type CaseTimelineProps = {
  items: TimelineItem[];
};

export default function CaseTimeline({
  items,
}: CaseTimelineProps) {
  return (
    <Section
      title="Idővonal"
      description="Az ügyhöz kapcsolódó események időrendi sorrendben."
    >
      {items.length === 0 ? (
        <EmptyState
          icon="🕒"
          title="Még nincs esemény"
          description="Az ügy idővonala jelenleg üres."
        />
      ) : (
        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-slate-200" />

          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative flex gap-5"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
                  {item.icon}
                </div>

                <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-blue-200 hover:shadow-md">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-2 text-sm text-slate-500">
                      <Clock3 className="h-4 w-4" />

                      <span>
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

function formatDate(
  value: string
): string {
  return new Date(value).toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTypeLabel(
  type: TimelineItem["type"]
): string {
  switch (type) {
    case "meeting_created":
      return "Találkozó";

    case "meeting_completed":
      return "Találkozó lezárva";

    case "task_created":
      return "Feladat";

    case "task_completed":
      return "Feladat teljesítve";

    case "note_created":
      return "Jegyzet";

    case "offer_created":
      return "Ajánlat létrehozva";

    case "offer_sent":
      return "Ajánlat elküldve";

    case "offer_accepted":
      return "Ajánlat elfogadva";

    case "offer_rejected":
      return "Ajánlat elutasítva";

    case "offer_expired":
      return "Ajánlat lejárt";

    case "client_created":
      return "Ügyfél létrehozva";

    case "client_updated":
      return "Ügyfél módosítva";

    case "case_created":
      return "Ügy létrehozva";

    case "case_updated":
      return "Ügy módosítva";

    case "case_closed":
      return "Ügy lezárva";

    default:
      return "Rendszer";
  }
}
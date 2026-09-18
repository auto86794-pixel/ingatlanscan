import { CalendarClock, Sparkles } from "lucide-react";

import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import HeroCard from "@/components/ui/HeroCard";
import Section from "@/components/ui/Section";

import type { CalendarEvent } from "@/types/calendar";

type TodaySectionProps = {
  nextMeeting: CalendarEvent | null;
  events: CalendarEvent[];
};

export default function TodaySection({
  nextMeeting,
  events,
}: TodaySectionProps) {
  return (
    <Section
      title="Mai nap"
      description="Áttekintés a mai találkozókról és teendőkről."
      actions={
        <Badge variant="blue">
          {events.length} esemény
        </Badge>
      }
    >
      <div className="mb-8">
        <HeroCard
          badge={
            <div className="flex items-center gap-2 text-blue-100">
              <Sparkles className="h-5 w-5" />

              <span className="text-sm font-semibold uppercase tracking-wide">
                HomeFlow AI
              </span>
            </div>
          }
          title="Jó napot! 👋"
          description={
            nextMeeting
              ? `Ma ${events.length} esemény szerepel a naptáradban. A következő találkozó lent látható.`
              : `Ma ${events.length} esemény szerepel a naptáradban. Jelenleg nincs közelgő találkozód.`
          }
          aside={
            <>
              <div className="mb-2 flex items-center gap-2 text-blue-100">
                <CalendarClock className="h-5 w-5" />

                <span className="text-sm font-medium">
                  Következő találkozó
                </span>
              </div>

              {nextMeeting ? (
                <>
                  <div className="text-xl font-semibold">
                    {nextMeeting.title}
                  </div>

                  <div className="mt-2 text-blue-100">
                    {formatTime(nextMeeting.start_at)}
                  </div>
                </>
              ) : (
                <div className="text-blue-100">
                  Ma nincs közelgő találkozó.
                </div>
              )}
            </>
          }
        />
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon="📅"
          title="Ma nincs esemény"
          description="Élvezd a nyugodtabb napot, vagy tervezz be új találkozót."
        />
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="font-semibold text-slate-900">
                  {event.title}
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  {event.client_name ??
                    event.case_title ??
                    "Nincs ügyfél"}
                </div>
              </div>

              <Badge variant="default">
                {formatTime(event.start_at)}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

function formatTime(
  value: string | null
): string {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
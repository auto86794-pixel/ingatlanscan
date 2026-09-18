import Link from "next/link";
import {
  ArrowRight,
  Clock3,
} from "lucide-react";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";

import type { DashboardActivity } from "@/types/dashboard";

type RecentActivitySectionProps = {
  activities: DashboardActivity[];
};

export default function RecentActivitySection({
  activities,
}: RecentActivitySectionProps) {
  return (
    <Section
      title="Legutóbbi aktivitások"
      description="A rendszer legfrissebb eseményei."
      actions={
        <Link href="/activity">
          <Button variant="secondary">
            Összes
          </Button>
        </Link>
      }
    >
      {activities.length === 0 ? (
        <EmptyState
          icon="🕒"
          title="Még nincs aktivitás"
          description="Az ügyek, feladatok és ajánlatok eseményei itt jelennek meg."
        />
      ) : (
        <div className="relative">
          <div className="absolute bottom-0 left-7 top-0 w-px bg-gradient-to-b from-blue-200 via-slate-200 to-transparent" />

          <div className="space-y-4">
            {activities.map((activity) => (
              <Link
                key={`${activity.type}-${activity.id}`}
                href={activity.href}
                className="group relative flex gap-5 overflow-hidden rounded-[26px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.14)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />

                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
                  {activity.icon}
                </div>

                <div className="relative z-10 min-w-0 flex-1">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold text-slate-900">
                        {activity.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {activity.subtitle}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
                      <Clock3 className="h-4 w-4 text-blue-600" />

                      <span>
                        {formatDate(
                          activity.createdAt
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)]">
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

function formatDate(
  value: string | null
): string {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString(
    "hu-HU",
    {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}
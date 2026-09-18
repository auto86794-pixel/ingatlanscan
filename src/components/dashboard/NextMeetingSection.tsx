"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: NextMeetingSection
 * ----------------------------------------
 */

import {
  ArrowRight,
  CalendarDays,
  Clock,
  House,
  Mail,
  MapPin,
  Navigation,
  Phone,
  UserRound,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export default function NextMeetingSection() {
  return (
    <Section
      title="Következő találkozó"
      description="A soron következő naptárbejegyzés."
    >
      <Card
        padding="none"
        className={[
          "relative overflow-hidden",
          "border-white/70 bg-white/80",
          "shadow-[0_18px_50px_rgba(15,23,42,0.08)]",
          "backdrop-blur-xl",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative p-4 sm:p-5">
          <div
            className={[
              "relative overflow-hidden rounded-[28px]",
              "border border-slate-200/80",
              "bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950",
              "p-5 text-white sm:p-6",
              "shadow-[0_24px_60px_rgba(15,23,42,0.22)]",
            ].join(" ")}
          >
            <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 left-24 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div
                  className={[
                    "flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl",
                    "border border-white/15 bg-white/10",
                    "shadow-[0_14px_34px_rgba(0,0,0,0.2)]",
                    "backdrop-blur-xl",
                  ].join(" ")}
                >
                  <CalendarDays className="h-8 w-8 text-blue-200" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-200">
                      Ma
                    </span>

                    <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-200">
                      45 perc múlva
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Ingatlan bemutatás
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Következő személyes találkozó egy érdeklődő
                    ügyféllel.
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Találkozó megnyitása"
                className={[
                  "group inline-flex h-12 items-center justify-center gap-2 rounded-2xl",
                  "border border-white/15 bg-white/10 px-4",
                  "text-sm font-bold text-white",
                  "backdrop-blur-xl transition-all duration-300",
                  "hover:border-blue-300/30 hover:bg-blue-500",
                  "hover:shadow-[0_12px_28px_rgba(59,130,246,0.3)]",
                ].join(" ")}
              >
                Megnyitás

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <InfoTile
                icon={Clock}
                label="Időpont"
                value="14:00"
              />

              <InfoTile
                icon={CalendarDays}
                label="Dátum"
                value="Ma"
              />

              <InfoTile
                icon={MapPin}
                label="Város"
                value="Debrecen"
              />

              <InfoTile
                icon={House}
                label="Típus"
                value="Bemutatás"
              />
            </div>
          </div>
        </div>

        <div className="relative grid gap-4 border-t border-slate-200/70 p-4 sm:p-5 lg:grid-cols-[1fr_1.3fr]">
          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-4">
              <div
                className={[
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
                  "bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600",
                  "text-lg font-black text-white",
                  "shadow-lg shadow-blue-500/20",
                ].join(" ")}
              >
                KA
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Ügyfél
                </p>

                <h4 className="mt-1 truncate text-lg font-extrabold text-slate-900">
                  Kovács Anna
                </h4>

                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                  <UserRound className="h-4 w-4 text-blue-500" />
                  Aktív érdeklődő
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                className={[
                  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl",
                  "border border-slate-200 bg-white",
                  "text-sm font-bold text-slate-700 shadow-sm",
                  "transition-all duration-300",
                  "hover:border-emerald-500 hover:bg-emerald-500 hover:text-white",
                  "hover:shadow-[0_10px_24px_rgba(16,185,129,0.22)]",
                ].join(" ")}
              >
                <Phone className="h-4 w-4" />
                Hívás
              </button>

              <button
                type="button"
                className={[
                  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl",
                  "border border-slate-200 bg-white",
                  "text-sm font-bold text-slate-700 shadow-sm",
                  "transition-all duration-300",
                  "hover:border-blue-500 hover:bg-blue-600 hover:text-white",
                  "hover:shadow-[0_10px_24px_rgba(37,99,235,0.22)]",
                ].join(" ")}
              >
                <Mail className="h-4 w-4" />
                Email
              </button>
            </div>
          </div>

          <div className="rounded-[26px] border border-slate-200/80 bg-gradient-to-br from-slate-50 to-blue-50/60 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm">
                <MapPin className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Ingatlan helyszíne
                </p>

                <h4 className="mt-1 text-lg font-extrabold text-slate-900">
                  Debrecen, Vezér utca 18.
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Eladó, erkélyes társasházi lakás a Vezér úti
                  lakótelepen.
                </p>
              </div>
            </div>

            <button
              type="button"
              className={[
                "mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl",
                "bg-slate-950 px-4 text-sm font-bold text-white",
                "shadow-[0_10px_24px_rgba(15,23,42,0.2)]",
                "transition-all duration-300",
                "hover:-translate-y-0.5 hover:bg-blue-600",
                "hover:shadow-[0_14px_30px_rgba(37,99,235,0.25)]",
              ].join(" ")}
            >
              <Navigation className="h-4 w-4" />
              Útvonal megnyitása
            </button>
          </div>
        </div>
      </Card>
    </Section>
  );
}

type InfoTileProps = {
  icon: typeof Clock;
  label: string;
  value: string;
};

function InfoTile({
  icon: Icon,
  label,
  value,
}: InfoTileProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-slate-300">
        <Icon className="h-4 w-4 text-blue-300" />

        <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>

      <p className="mt-1.5 text-sm font-extrabold text-white">
        {value}
      </p>
    </div>
  );
}
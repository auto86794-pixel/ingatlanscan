"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: DashboardHero
 * ----------------------------------------
 */

import Link from "next/link";

import type {
  LucideIcon,
} from "lucide-react";

import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckSquare2,
  Clock3,
  PhoneCall,
  Sparkles,
} from "lucide-react";

type HeroStatTone =
  | "sky"
  | "emerald"
  | "violet"
  | "red";

type HeroStat = {
  label: string;
  description: string;
  value: number;
  icon: LucideIcon;
  tone: HeroStatTone;
};

const HERO_STATS: HeroStat[] = [
  {
    label: "Találkozó",
    description: "Mai esemény",
    value: 3,
    icon: CalendarDays,
    tone: "sky",
  },
  {
    label: "Feladat",
    description: "Elvégzendő",
    value: 7,
    icon: CheckSquare2,
    tone: "emerald",
  },
  {
    label: "Visszahívás",
    description: "Kapcsolattartás",
    value: 2,
    icon: PhoneCall,
    tone: "violet",
  },
  {
    label: "Lejárt",
    description: "Figyelmet igényel",
    value: 1,
    icon: AlertTriangle,
    tone: "red",
  },
];

const STAT_TONES: Record<
  HeroStatTone,
  {
    icon: string;
    value: string;
    glow: string;
    border: string;
  }
> = {
  sky: {
    icon:
      "border-sky-300/25 bg-sky-300/15 text-sky-100",
    value:
      "text-sky-50",
    glow:
      "bg-sky-300/20",
    border:
      "hover:border-sky-200/30",
  },

  emerald: {
    icon:
      "border-emerald-300/25 bg-emerald-300/15 text-emerald-100",
    value:
      "text-emerald-50",
    glow:
      "bg-emerald-300/20",
    border:
      "hover:border-emerald-200/30",
  },

  violet: {
    icon:
      "border-violet-300/25 bg-violet-300/15 text-violet-100",
    value:
      "text-violet-50",
    glow:
      "bg-violet-300/20",
    border:
      "hover:border-violet-200/30",
  },

  red: {
    icon:
      "border-red-300/25 bg-red-300/15 text-red-100",
    value:
      "text-red-50",
    glow:
      "bg-red-300/20",
    border:
      "hover:border-red-200/30",
  },
};

export default function DashboardHero() {
  const greeting = getGreeting();

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-slate-800/10 bg-[#061326] shadow-[0_32px_90px_rgba(15,23,42,0.24)]">
      <HeroBackground />

      <div className="relative z-10 px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] xl:items-end">
          <div className="relative max-w-3xl">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <BrandBadge />

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3.5 py-2 text-xs font-semibold text-emerald-50 shadow-[0_12px_30px_rgba(2,6,23,0.18)] backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />

                Minden a terv szerint halad
              </div>
            </div>

            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-200/75 sm:text-sm">
                Személyes napi áttekintés
              </p>

              <h1 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                {greeting}
              </h1>

              <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-200/90 sm:text-lg sm:leading-8">
                Az AI összegyűjtötte a mai
                legfontosabb feladatokat,
                találkozókat és visszahívásokat,
                hogy mindig a megfelelő ügyre
                koncentrálhass.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
              <Link
                href="/tasks"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_18px_45px_rgba(14,165,233,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-sky-50 sm:w-auto"
              >
                Mai teendők megnyitása

                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <div className="flex max-w-xl items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm leading-5 text-slate-200 shadow-[0_16px_40px_rgba(2,6,23,0.16)] backdrop-blur-xl">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-200/15 bg-sky-400/15 text-sky-100">
                  <Sparkles className="h-5 w-5" />
                </span>

                <span>
                  A HomeFlow folyamatosan figyeli
                  a naptáradat, feladataidat és
                  ajánlataidat.
                </span>
              </div>
            </div>
          </div>

          <DashboardStatusPanel />
        </div>
      </div>
    </section>
  );
}

function getGreeting() {
  const hour =
    new Date().getHours();

  if (hour < 10) {
    return "Jó reggelt!";
  }

  if (hour < 18) {
    return "Jó napot!";
  }

  return "Jó estét!";
}

function BrandBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.09] py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.18em] text-white/90 shadow-[0_12px_30px_rgba(2,6,23,0.2)] backdrop-blur-xl">
      <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-gradient-to-br from-sky-300 via-blue-500 to-blue-800 shadow-[0_8px_24px_rgba(59,130,246,0.35)]">
        <span className="absolute inset-[2px] rounded-full border border-white/20" />

        <span className="relative text-[11px] font-black tracking-[-0.08em] text-white">
          HF
        </span>
      </span>

      <span>
        HomeFlow CRM
      </span>
    </div>
  );
}

function DashboardStatusPanel() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-sky-400/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/15 bg-white/[0.09] p-3 shadow-[0_28px_80px_rgba(2,6,23,0.4)] backdrop-blur-2xl sm:p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-sky-300/[0.04]" />

        <div className="relative mb-4 flex items-center justify-between px-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/70">
              Mai állapot
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              Gyors munkanapi áttekintés
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/35" />
            <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.85)]" />
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-3">
          {HERO_STATS.map((stat) => (
            <HeroStatCard
              key={stat.label}
              stat={stat}
            />
          ))}
        </div>

        <div className="relative mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/25 px-4 py-3 text-xs text-slate-300/80">
          <span>
            HomeFlow intelligens összegzés
          </span>

          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]" />

            Aktív
          </span>
        </div>
      </div>
    </div>
  );
}

type HeroStatCardProps = {
  stat: HeroStat;
};

function HeroStatCard({
  stat,
}: HeroStatCardProps) {
  const Icon =
    stat.icon;

  const styles =
    STAT_TONES[stat.tone];

  return (
    <div
      className={[
        "group relative min-h-40 overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/25 p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-950/40 sm:p-5",
        styles.border,
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div
        className={[
          "absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-transform duration-300 group-hover:scale-125",
          styles.glow,
        ].join(" ")}
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div
            className={[
              "flex h-10 w-10 items-center justify-center rounded-2xl border shadow-[0_10px_24px_rgba(2,6,23,0.2)] backdrop-blur-xl",
              styles.icon,
            ].join(" ")}
          >
            <Icon className="h-5 w-5" />
          </div>

          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
            Ma
          </span>
        </div>

        <div className="mt-5">
          <div
            className={[
              "text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl",
              styles.value,
            ].join(" ")}
          >
            {stat.value}
          </div>

          <div className="mt-2 text-sm font-bold text-white">
            {stat.label}
          </div>

          <div className="mt-1 text-xs font-medium text-slate-300/70">
            {stat.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#04101f_0%,#071d38_38%,#0b4268_72%,#0d617b_100%)]" />

      <div className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_82%_12%,rgba(125,211,252,0.3),transparent_26%),radial-gradient(circle_at_25%_100%,rgba(59,130,246,0.25),transparent_34%)]" />

      <BlueprintGrid />

      <ArchitecturalVilla />

      <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-300/15 blur-[110px]" />

      <div className="absolute -bottom-40 left-[24%] h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute right-[8%] top-[8%] h-48 w-48 rounded-full border border-white/[0.04]" />

      <div className="absolute right-[13%] top-[15%] h-28 w-28 rounded-full border border-white/[0.05]" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.4)_0%,rgba(2,6,23,0.05)_58%,rgba(2,6,23,0.15)_100%)]" />
    </div>
  );
}

function BlueprintGrid() {
  return (
    <>
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-position:12px_12px] [background-size:12px_12px]" />

      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.8)_25%,rgba(255,255,255,0.8)_26%,transparent_26%,transparent_74%,rgba(255,255,255,0.8)_74%,rgba(255,255,255,0.8)_75%,transparent_75%)] [background-size:96px_96px]" />
    </>
  );
}

function ArchitecturalVilla() {
  return (
    <div className="absolute bottom-0 right-[-5%] hidden h-[94%] w-[64%] lg:block">
      <div className="absolute bottom-[7%] right-[1%] h-px w-[88%] bg-gradient-to-r from-transparent via-sky-100/30 to-transparent" />

      <div className="absolute bottom-[8%] right-[5%] h-[74%] w-[90%]">
        <div className="absolute bottom-0 right-0 h-[68%] w-[68%] overflow-hidden rounded-tl-[5rem] border-l border-t border-white/20 bg-gradient-to-br from-white/[0.14] via-sky-100/[0.05] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[2px]">
          <div className="absolute inset-x-[7%] bottom-[11%] top-[18%] grid grid-cols-4 gap-3 p-5 opacity-80">
            {Array.from({
              length: 12,
            }).map((_, index) => (
              <span
                key={index}
                className="relative overflow-hidden rounded-[4px] border border-white/15 bg-gradient-to-br from-sky-100/15 to-white/[0.03]"
              >
                <span className="absolute inset-x-0 top-1/2 h-px bg-white/10" />

                <span className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
              </span>
            ))}
          </div>

          <div className="absolute bottom-[8%] right-[7%] h-[12%] w-[28%] rounded-t-2xl border border-white/15 bg-slate-950/25" />

          <div className="absolute bottom-[8%] left-[8%] h-[8%] w-[44%] border-t border-white/15 bg-gradient-to-t from-sky-100/[0.06] to-transparent" />

          <div className="absolute left-[8%] top-[11%] h-px w-[68%] bg-gradient-to-r from-white/25 to-transparent" />
        </div>

        <div className="absolute bottom-0 right-[52%] h-[50%] w-[43%] overflow-hidden rounded-tl-[4rem] border-l border-t border-white/15 bg-gradient-to-br from-white/[0.1] via-sky-100/[0.04] to-transparent backdrop-blur-[1px]">
          <div className="absolute bottom-[14%] left-[16%] right-[12%] top-[30%] grid grid-cols-3 gap-3 opacity-65">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <span
                key={index}
                className="rounded-[3px] border border-white/15 bg-white/[0.05]"
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-[68%] right-[1%] h-px w-[67%] -rotate-[7deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="absolute bottom-[50%] right-[61%] h-px w-[33%] rotate-[7deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="absolute bottom-[2%] right-[4%] h-[12%] w-[79%] border-t border-sky-100/10 bg-gradient-to-t from-sky-300/[0.03] to-transparent" />

        <div className="absolute bottom-[5%] right-[15%] h-[62%] w-[68%] rounded-full bg-sky-300/[0.05] blur-3xl" />
      </div>

      <div className="absolute bottom-[2%] right-[4%] flex w-[82%] items-end justify-between opacity-55">
        {Array.from({
          length: 13,
        }).map((_, index) => (
          <span
            key={index}
            className="w-px bg-gradient-to-t from-white/20 to-transparent"
            style={{
              height: `${
                14 +
                (index % 5) * 7
              }px`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-[7%] right-[10%] flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/20 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-100/60 backdrop-blur-md">
        <Clock3 className="h-3.5 w-3.5" />

        Élő rendszer
      </div>
    </div>
  );
}
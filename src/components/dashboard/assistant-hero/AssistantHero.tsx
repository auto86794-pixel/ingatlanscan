"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: AssistantHero
 * ----------------------------------------
 */

import type { ReactNode } from "react";

import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckSquare2,
  Clock3,
  PhoneCall,
  Sparkles,
} from "lucide-react";

import type { AssistantHeroModel } from "@/assistant/presenters/assistant-hero-presenter";

import Button from "@/components/ui/Button";

type Props = {
  model: AssistantHeroModel;
  onPrimaryAction?: () => void;
};

type PriorityTheme = {
  badge: string;
  dot: string;
  label: string;
};

const PRIORITY_THEMES: Record<
  AssistantHeroModel["priority"],
  PriorityTheme
> = {
  urgent: {
    badge:
      "border-rose-200 bg-rose-50 text-rose-700",
    dot:
      "bg-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.12)]",
    label:
      "Azonnali figyelmet igényel",
  },

  high: {
    badge:
      "border-amber-200 bg-amber-50 text-amber-700",
    dot:
      "bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.12)]",
    label:
      "Kiemelt napi fókusz",
  },

  normal: {
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    dot:
      "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]",
    label:
      "Minden a terv szerint halad",
  },

  low: {
    badge:
      "border-sky-200 bg-sky-50 text-sky-700",
    dot:
      "bg-sky-500 shadow-[0_0_0_4px_rgba(14,165,233,0.12)]",
    label:
      "Nyugodt munkanap",
  },
};

export default function AssistantHero({
  model,
  onPrimaryAction,
}: Props) {
  const theme =
    PRIORITY_THEMES[model.priority];

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-sky-100/80 bg-gradient-to-br from-[#1B4F9A] via-[#2E6FC2] to-[#76A9FA] shadow-[0_24px_60px_rgba(37,99,235,0.22)]">
      <HeroBackground />

      <div className="relative z-10 px-5 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-10">
        <div className="flex flex-col gap-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <BrandBadge />

            <PriorityBadge
              theme={theme}
            />
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] xl:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-50/80 sm:text-xs">
                <Sparkles className="h-4 w-4" />
                HomeFlow napi asszisztens
              </div>

              <h1 className="mt-3 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                {model.greeting}
              </h1>

              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-blue-50/90 sm:text-lg sm:leading-8">
                {model.recommendation}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                {model.primaryActionLabel && (
                  <Button
                    className="group min-h-13 w-full rounded-2xl border border-white/80 bg-white px-5 py-3 text-slate-950 shadow-[0_16px_36px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-50 sm:w-auto"
                    onClick={onPrimaryAction}
                  >
                    <span>
                      {model.primaryActionLabel}
                    </span>

                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                )}

                <div className="flex min-h-13 items-center gap-3 rounded-2xl border border-white/25 bg-white/12 px-4 py-3 text-sm leading-5 text-white shadow-sm backdrop-blur-xl">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/15 text-white">
                    <Sparkles className="h-4 w-4" />
                  </span>

                  <span className="max-w-xl">
                    A HomeFlow átnézte a mai
                    eseményeket, feladatokat és
                    utánkövetéseket.
                  </span>
                </div>
              </div>
            </div>

            <DashboardStatusPanel
              model={model}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/12 py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(15,23,42,0.14)] backdrop-blur-xl">
      <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/35 bg-gradient-to-br from-sky-200 via-blue-500 to-indigo-700 shadow-[0_8px_20px_rgba(30,64,175,0.3)]">
        <span className="absolute inset-[2px] rounded-full border border-white/25" />

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

type PriorityBadgeProps = {
  theme: PriorityTheme;
};

function PriorityBadge({
  theme,
}: PriorityBadgeProps) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-semibold shadow-sm backdrop-blur-xl sm:text-xs",
        theme.badge,
      ].join(" ")}
    >
      <span
        className={[
          "h-2 w-2 rounded-full",
          theme.dot,
        ].join(" ")}
      />

      {theme.label}
    </div>
  );
}

type DashboardStatusPanelProps = {
  model: AssistantHeroModel;
};

function DashboardStatusPanel({
  model,
}: DashboardStatusPanelProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[2.5rem] bg-white/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/92 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50/60" />

        <div className="relative mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-[11px]">
              Mai áttekintés
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              A napi működés fő számai
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Aktív
          </span>
        </div>

        <div className="relative grid grid-cols-2 gap-3">
          <HeroStat
            value={model.stats.tasks}
            label="Feladat"
            description="Mai teendő"
            icon={
              <CheckSquare2 className="h-4 w-4" />
            }
            tone="emerald"
          />

          <HeroStat
            value={model.stats.meetings}
            label="Találkozó"
            description="Mai esemény"
            icon={
              <CalendarDays className="h-4 w-4" />
            }
            tone="sky"
          />

          <HeroStat
            value={model.stats.followUps}
            label="Visszahívás"
            description="Utánkövetés"
            icon={
              <PhoneCall className="h-4 w-4" />
            }
            tone="violet"
          />

          <HeroStat
            value={model.stats.overdue}
            label="Lejárt"
            description={
              model.stats.overdue > 0
                ? "Figyelmet igényel"
                : "Nincs elmaradás"
            }
            icon={
              model.stats.overdue > 0 ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                <Clock3 className="h-4 w-4" />
              )
            }
            tone={
              model.stats.overdue > 0
                ? "rose"
                : "slate"
            }
          />
        </div>
      </div>
    </div>
  );
}
type HeroStatTone =
  | "sky"
  | "emerald"
  | "violet"
  | "rose"
  | "slate";

type HeroStatProps = {
  value: number;
  label: string;
  description: string;
  icon: ReactNode;
  tone: HeroStatTone;
};

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
      "border-sky-200 bg-sky-50 text-sky-600",
    value:
      "text-sky-700",
    glow:
      "bg-sky-100",
    border:
      "hover:border-sky-200",
  },

  emerald: {
    icon:
      "border-emerald-200 bg-emerald-50 text-emerald-600",
    value:
      "text-emerald-700",
    glow:
      "bg-emerald-100",
    border:
      "hover:border-emerald-200",
  },

  violet: {
    icon:
      "border-violet-200 bg-violet-50 text-violet-600",
    value:
      "text-violet-700",
    glow:
      "bg-violet-100",
    border:
      "hover:border-violet-200",
  },

  rose: {
    icon:
      "border-rose-200 bg-rose-50 text-rose-600",
    value:
      "text-rose-700",
    glow:
      "bg-rose-100",
    border:
      "hover:border-rose-200",
  },

  slate: {
    icon:
      "border-slate-200 bg-slate-100 text-slate-600",
    value:
      "text-slate-800",
    glow:
      "bg-slate-100",
    border:
      "hover:border-slate-300",
  },
};

function HeroStat({
  value,
  label,
  description,
  icon,
  tone,
}: HeroStatProps) {
  const styles =
    STAT_TONES[tone];

  return (
    <div
      className={[
        "group relative min-h-28 overflow-hidden rounded-[1.2rem] border border-slate-200/80 bg-white p-3.5 shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.1)] sm:min-h-32 sm:p-4",
        styles.border,
      ].join(" ")}
    >
      <div
        className={[
          "absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-80 blur-2xl transition-transform duration-300 group-hover:scale-125",
          styles.glow,
        ].join(" ")}
      />

      <div className="relative flex h-full items-start justify-between gap-3">
        <div className="min-w-0">
          <div
            className={[
              "text-3xl font-black leading-none tracking-[-0.05em] sm:text-4xl",
              styles.value,
            ].join(" ")}
          >
            {value}
          </div>

          <div className="mt-2 truncate text-xs font-bold text-slate-900 sm:text-sm">
            {label}
          </div>

          <div className="mt-1 text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
            {description}
          </div>
        </div>

        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-sm",
            styles.icon,
          ].join(" ")}
        >
          {icon}
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
      <div className="absolute inset-0 bg-[linear-gradient(125deg,#1B4F9A_0%,#2F6FC2_42%,#5B96E8_78%,#B9D8FF_100%)]" />

      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.34),transparent_25%),radial-gradient(circle_at_18%_100%,rgba(59,130,246,0.2),transparent_34%)]" />

      <BlueprintGrid />

      <VillaSilhouette />

      <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-white/12 blur-[110px]" />

      <div className="absolute -bottom-40 left-[24%] h-96 w-96 rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-blue-950/28 via-blue-900/5 to-transparent" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,64,175,0.28)_0%,rgba(30,64,175,0.04)_58%,rgba(30,64,175,0.08)_100%)]" />
    </div>
  );
}

function BlueprintGrid() {
  return (
    <>
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-position:12px_12px] [background-size:12px_12px]" />

      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.8)_25%,rgba(255,255,255,0.8)_26%,transparent_26%,transparent_74%,rgba(255,255,255,0.8)_74%,rgba(255,255,255,0.8)_75%,transparent_75%)] [background-size:96px_96px]" />
    </>
  );
}

function VillaSilhouette() {
  return (
    <div className="absolute bottom-0 right-[-5%] hidden h-[92%] w-[64%] lg:block">
      <div className="absolute bottom-[7%] right-[1%] h-px w-[88%] bg-gradient-to-r from-transparent via-white/45 to-transparent" />

      <div className="absolute bottom-[8%] right-[4%] h-[74%] w-[92%]">
        <div className="absolute bottom-0 right-0 h-[70%] w-[69%] overflow-hidden rounded-tl-[5rem] border-l border-t border-white/30 bg-gradient-to-br from-white/[0.2] via-white/[0.07] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-[2px]">
          <div className="absolute inset-x-[7%] bottom-[11%] top-[18%] grid grid-cols-4 gap-3 p-5 opacity-90">
            {Array.from({
              length: 12,
            }).map((_, index) => (
              <span
                key={index}
                className="relative overflow-hidden rounded-[4px] border border-white/20 bg-gradient-to-br from-white/22 to-white/[0.04]"
              >
                <span className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
                <span className="absolute inset-y-0 left-1/2 w-px bg-white/15" />
              </span>
            ))}
          </div>

          <div className="absolute bottom-[8%] right-[7%] h-[12%] w-[28%] rounded-t-2xl border border-white/20 bg-blue-950/20" />

          <div className="absolute bottom-[8%] left-[8%] h-[8%] w-[44%] border-t border-white/20 bg-gradient-to-t from-white/[0.1] to-transparent" />
        </div>

        <div className="absolute bottom-0 right-[52%] h-[50%] w-[43%] overflow-hidden rounded-tl-[4rem] border-l border-t border-white/25 bg-gradient-to-br from-white/[0.16] via-white/[0.05] to-transparent backdrop-blur-[1px]">
          <div className="absolute bottom-[14%] left-[16%] right-[12%] top-[30%] grid grid-cols-3 gap-3 opacity-75">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <span
                key={index}
                className="rounded-[3px] border border-white/20 bg-white/[0.08]"
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-[68%] right-[1%] h-px w-[67%] -rotate-[7deg] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="absolute bottom-[50%] right-[61%] h-px w-[33%] rotate-[7deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="absolute bottom-[2%] right-[4%] h-[12%] w-[79%] border-t border-white/15 bg-gradient-to-t from-white/[0.05] to-transparent" />

        <div className="absolute bottom-[5%] right-[15%] h-[62%] w-[68%] rounded-full bg-white/[0.08] blur-3xl" />
      </div>

      <div className="absolute bottom-[2%] right-[4%] flex w-[82%] items-end justify-between opacity-60">
        {Array.from({
          length: 13,
        }).map((_, index) => (
          <span
            key={index}
            className="w-px bg-gradient-to-t from-white/30 to-transparent"
            style={{
              height: `${
                14 +
                (index % 5) * 7
              }px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
"use client";

/**
 * HomeFlow CRM
 * Dashboard: mai feladatok
 *
 * Mobilbarát változat:
 * - nincs vízszintes túlcsordulás;
 * - a hosszú címek nem vesznek el;
 * - a műveletek mobilon teljes szélességűek;
 * - legalább 44 px magas érintési célok;
 * - javított magyar karakterkódolás.
 */

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Clock,
  House,
  Phone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

type TaskTone = "red" | "blue" | "emerald";
type TaskStatus = "urgent" | "today" | "afternoon";

type DashboardTask = {
  id: number;
  title: string;
  client: string;
  time: string;
  urgent: boolean;
  icon: LucideIcon;
  tone: TaskTone;
  status: TaskStatus;
  href: string;
};

const tasks: DashboardTask[] = [
  {
    id: 1,
    title: "Adásvételi szerződés előkészítése",
    client: "Kovács Péter",
    time: "09:30",
    urgent: true,
    icon: BriefcaseBusiness,
    tone: "red",
    status: "urgent",
    href: "/tasks/1",
  },
  {
    id: 2,
    title: "Vevő visszahívása",
    client: "Nagy Anna",
    time: "11:00",
    urgent: false,
    icon: Phone,
    tone: "blue",
    status: "today",
    href: "/tasks/2",
  },
  {
    id: 3,
    title: "Ingatlan bemutatás",
    client: "Debrecen, Vezér u. 45.",
    time: "14:00",
    urgent: false,
    icon: House,
    tone: "emerald",
    status: "afternoon",
    href: "/tasks/3",
  },
];

const THEMES: Record<
  TaskTone,
  {
    icon: string;
    time: string;
    glow: string;
    accent: string;
    progress: string;
    hoverBorder: string;
  }
> = {
  red: {
    icon: "bg-gradient-to-br from-red-500 via-rose-500 to-rose-600 text-white shadow-red-500/25",
    time: "border-red-200/80 bg-gradient-to-br from-red-50 to-rose-50 text-red-700",
    glow: "bg-red-400/20",
    accent: "from-red-500 via-rose-500 to-orange-400",
    progress: "bg-gradient-to-r from-red-500 via-rose-500 to-orange-400",
    hoverBorder: "hover:border-red-200",
  },
  blue: {
    icon: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white shadow-blue-500/25",
    time: "border-blue-200/80 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700",
    glow: "bg-blue-400/20",
    accent: "from-blue-500 via-indigo-500 to-violet-500",
    progress: "bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500",
    hoverBorder: "hover:border-blue-200",
  },
  emerald: {
    icon: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-emerald-500/25",
    time: "border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700",
    glow: "bg-emerald-400/20",
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
    progress: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500",
    hoverBorder: "hover:border-emerald-200",
  },
};

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; className: string }
> = {
  urgent: {
    label: "Sürgős",
    className: "border-red-200 bg-red-50 text-red-700",
  },
  today: {
    label: "Ma",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  afternoon: {
    label: "Délután",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
};

export default function TodayTasksSection() {
  const completedTasks = 0;
  const totalTasks = tasks.length;
  const remainingTasks = totalTasks - completedTasks;
  const completionPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Section
      title="Mai teendők"
      description="A mai nap legfontosabb feladatai."
      action={
        <Link
          href="/tasks"
          className="group inline-flex min-h-11 items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Összes feladat
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      }
    >
      <Card
        padding="none"
        className="relative overflow-hidden border-white/70 bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative border-b border-slate-200/70 p-3 sm:p-5">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-4 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)] sm:rounded-[26px] sm:p-5">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-20 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:h-14 sm:w-14 sm:rounded-2xl">
                  <Sparkles className="h-5 w-5 text-blue-200 sm:h-7 sm:w-7" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200 sm:text-[11px] sm:tracking-[0.18em]">
                      Mai fókusz
                    </p>
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/80">
                      {remainingTasks} feladat
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-black leading-tight tracking-tight text-white sm:text-2xl">
                    Haladj végig a mai prioritásokon
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300 sm:max-w-xl">
                    A legsürgősebb feladatod a szerződés előkészítése. Utána
                    két ügyfélkapcsolati teendő következik.
                  </p>
                </div>
              </div>

              <div className="self-start sm:shrink-0 sm:self-auto">
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-xl sm:px-4 sm:py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-black tabular-nums text-white">
                      {completedTasks}/{totalTasks}
                    </div>
                    <div className="text-xs font-medium text-slate-300">
                      teljesítve
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>Napi haladás</span>
                <span>{completionPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative space-y-3 p-3 sm:p-4">
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} isFocus={index === 0} />
          ))}
        </div>
      </Card>
    </Section>
  );
}

type TaskItemProps = {
  task: DashboardTask;
  isFocus: boolean;
};

function TaskItem({ task, isFocus }: TaskItemProps) {
  const theme = THEMES[task.tone];
  const status = STATUS_CONFIG[task.status];
  const TaskIcon = task.icon;

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border bg-white px-3 py-4 sm:rounded-[26px] sm:px-5 sm:py-5",
        "transition-all duration-300 ease-out motion-safe:hover:-translate-y-1",
        "hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]",
        theme.hoverBorder,
        task.urgent
          ? "border-red-200/90 shadow-[0_12px_30px_rgba(239,68,68,0.08)]"
          : "border-slate-200/80 shadow-[0_10px_28px_rgba(15,23,42,0.05)]",
      ].join(" ")}
    >
      <div
        className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b sm:w-1.5 ${theme.accent}`}
      />
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125 ${theme.glow}`}
      />

      {isFocus && (
        <div className="pointer-events-none absolute right-5 top-4 hidden items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          Fókusz
        </div>
      )}

      <div className="relative flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
            <div
              className={`flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2 text-sm font-black tabular-nums shadow-sm sm:min-w-[88px] sm:rounded-2xl sm:px-3 sm:py-3 sm:text-base ${theme.time}`}
            >
              <Clock className="h-4 w-4" />
              {task.time}
            </div>

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14 sm:rounded-2xl ${theme.icon}`}
            >
              <TaskIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <span
              className={`ml-auto shrink-0 rounded-full border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] sm:hidden ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          <div className="mt-3 min-w-0 sm:ml-[160px] sm:mt-[-56px] sm:min-h-14 lg:ml-[176px]">
            <div className="flex min-w-0 flex-wrap items-center gap-2 sm:pr-20">
              <h3 className="min-w-0 break-words text-base font-extrabold leading-snug text-slate-900 sm:text-lg">
                {task.title}
              </h3>
              <span
                className={`hidden shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] sm:inline-flex ${status.className}`}
              >
                {status.label}
              </span>
            </div>

            <p className="mt-1.5 break-words text-sm font-medium text-slate-500">
              {task.client}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${theme.progress} ${
                    isFocus ? "w-2/3" : "w-1/3"
                  }`}
                />
              </div>
              <span className="shrink-0 text-[11px] font-semibold text-slate-400">
                {isFocus ? "Kiemelt" : "Ütemezett"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:flex lg:shrink-0 lg:items-center lg:justify-end lg:pl-4">
          <button
            type="button"
            aria-label={`${task.title} teljesítése`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-bold text-slate-600 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-500 hover:text-white hover:shadow-[0_10px_24px_rgba(16,185,129,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:rounded-2xl"
          >
            <Check className="h-4 w-4" />
            <span>Kész</span>
          </button>

          <Link
            href={task.href}
            aria-label={`${task.title} megnyitása`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:rounded-2xl"
          >
            <span>Megnyitás</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

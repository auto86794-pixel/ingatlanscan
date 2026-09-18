"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: QuickActionsSection
 * ----------------------------------------
 *
 * Prémium dashboard gyors műveletek.
 */

import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  CalendarPlus,
  FileText,
  FolderPlus,
  Sparkles,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

import Section from "@/components/ui/Section";

type ActionItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  glow: string;
  iconShadow: string;
  accent: string;
  badge: string;
};

const actions: ActionItem[] = [
  {
    title: "Új ügy",
    description:
      "Értékesítési vagy megbízási ügy gyors létrehozása.",
    href: "/cases/new",
    icon: FolderPlus,
    gradient:
      "from-blue-500 via-blue-600 to-indigo-700",
    glow:
      "bg-blue-500/20",
    iconShadow:
      "shadow-[0_18px_35px_rgba(37,99,235,0.30)]",
    accent:
      "from-blue-500 to-indigo-600",
    badge:
      "Ügykezelés",
  },
  {
    title: "Új ügyfél",
    description:
      "Új érdeklődő vagy tulajdonos rögzítése.",
    href: "/clients/new",
    icon: UserPlus,
    gradient:
      "from-emerald-500 via-emerald-600 to-teal-700",
    glow:
      "bg-emerald-500/20",
    iconShadow:
      "shadow-[0_18px_35px_rgba(16,185,129,0.28)]",
    accent:
      "from-emerald-500 to-teal-600",
    badge:
      "Kapcsolatok",
  },
  {
    title: "Új ingatlan",
    description:
      "Új ingatlanadatlap létrehozása minden fontos adattal.",
    href: "/properties/new",
    icon: Building2,
    gradient:
      "from-amber-500 via-orange-500 to-orange-700",
    glow:
      "bg-amber-500/20",
    iconShadow:
      "shadow-[0_18px_35px_rgba(245,158,11,0.28)]",
    accent:
      "from-amber-500 to-orange-600",
    badge:
      "Ingatlan",
  },
  {
    title: "Új találkozó",
    description:
      "Megtekintés, konzultáció vagy egyeztetés rögzítése.",
    href: "/calendar/new",
    icon: CalendarPlus,
    gradient:
      "from-violet-500 via-purple-600 to-fuchsia-700",
    glow:
      "bg-violet-500/20",
    iconShadow:
      "shadow-[0_18px_35px_rgba(139,92,246,0.28)]",
    accent:
      "from-violet-500 to-fuchsia-600",
    badge:
      "Naptár",
  },
  {
    title: "Új ajánlat",
    description:
      "Ajánlat készítése meglévő ügyhöz és ügyfélhez.",
    href: "/offers/new",
    icon: FileText,
    gradient:
      "from-cyan-500 via-sky-600 to-blue-700",
    glow:
      "bg-cyan-500/20",
    iconShadow:
      "shadow-[0_18px_35px_rgba(14,165,233,0.28)]",
    accent:
      "from-cyan-500 to-blue-600",
    badge:
      "Ajánlat",
  },
  {
    title: "Naptár megnyitása",
    description:
      "Tekintsd át a napi, heti és havi eseményeket.",
    href: "/calendar",
    icon: CalendarDays,
    gradient:
      "from-slate-700 via-slate-800 to-slate-950",
    glow:
      "bg-slate-500/20",
    iconShadow:
      "shadow-[0_18px_35px_rgba(15,23,42,0.30)]",
    accent:
      "from-slate-600 to-slate-900",
    badge:
      "Áttekintés",
  },
];

export default function QuickActionsSection() {
  return (
    <Section
      title="Gyors műveletek"
      description="A leggyakrabban használt funkciók egy helyen."
    >
      <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/70 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-5 lg:p-6">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-[90px]" />

        <div className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative mb-5 flex flex-col gap-3 border-b border-slate-200/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />

              HomeFlow gyorsindító
            </div>

            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Indítsd el a legfontosabb napi feladatokat
              néhány másodperc alatt.
            </p>
          </div>

          <Link
            href="/calendar"
            className="group inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
          >
            Teljes naptár

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className="group relative min-h-[250px] overflow-hidden rounded-[30px] border border-white/80 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white hover:shadow-[0_30px_70px_rgba(15,23,42,0.14)] sm:p-6"
              >
                <div
                  className={[
                    "pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-[65px] transition-all duration-700 group-hover:scale-125",
                    action.glow,
                  ].join(" ")}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-transparent opacity-80" />

                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                <div className="relative flex h-full flex-col">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div
                      className={[
                        "flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-gradient-to-br text-white transition-all duration-500 group-hover:rotate-2 group-hover:scale-105",
                        action.gradient,
                        action.iconShadow,
                      ].join(" ")}
                    >
                      <Icon
                        className="h-8 w-8"
                        strokeWidth={2}
                      />
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/90 text-slate-500 shadow-sm transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_12px_28px_rgba(37,99,235,0.28)]">
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="inline-flex rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      {action.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black tracking-tight text-slate-950">
                    {action.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                    {action.description}
                  </p>

                  <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-700 transition-colors duration-300 group-hover:text-blue-700">
                        Megnyitás
                      </span>

                      <span className="text-xs font-semibold text-slate-400">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={[
                          "h-full w-10 rounded-full bg-gradient-to-r transition-all duration-500 group-hover:w-full",
                          action.accent,
                        ].join(" ")}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
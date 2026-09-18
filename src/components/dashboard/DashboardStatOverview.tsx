import {
  Calendar,
  Clock3,
  FileText,
  FolderOpen,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";

import Icon from "@/components/ui/Icon";

import type { CalendarEvent } from "@/types/calendar";

type DashboardStats = {
  activeCases: number;
  openFollowUps: number;
  meetingsToday: number;
  upcomingMeetings: number;
  pendingOffers: number;
};

type Props = {
  stats: DashboardStats;
  nextMeeting: CalendarEvent | null;
};

type StatCard = {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle: string;
  tone:
    | "blue"
    | "emerald"
    | "amber"
    | "violet"
    | "rose"
    | "slate";
  highlight?: boolean;
};

export default function DashboardStatOverview({
  stats,
  nextMeeting,
}: Props) {
  const nextMeetingTime = nextMeeting?.start_at
    ? new Date(nextMeeting.start_at).toLocaleTimeString(
        "hu-HU",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "-";

  const cards: StatCard[] = [
    {
      icon: FolderOpen,
      title: "Aktív ügyek",
      value: stats.activeCases,
      subtitle: "Folyamatban",
      tone: "blue",
    },
    {
      icon: Phone,
      title: "Follow-up",
      value: stats.openFollowUps,
      subtitle:
        stats.openFollowUps > 10
          ? "Sürgős"
          : "Kapcsolattartás",
      tone: "emerald",
      highlight:
        stats.openFollowUps > 10,
    },
    {
      icon: Users,
      title: "Mai találkozó",
      value: stats.meetingsToday,
      subtitle: "Mai naptár",
      tone: "violet",
    },
    {
      icon: Clock3,
      title: "Következő",
      value: nextMeetingTime,
      subtitle: "Mai időpont",
      tone: "amber",
    },
    {
      icon: Calendar,
      title: "Közelgő",
      value: stats.upcomingMeetings,
      subtitle: "Naptár",
      tone: "slate",
    },
    {
      icon: FileText,
      title: "Ajánlatok",
      value: stats.pendingOffers,
      subtitle:
        stats.pendingOffers > 5
          ? "Lejáró"
          : "Függő",
      tone: "rose",
      highlight:
        stats.pendingOffers > 5,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
            Dashboard
          </p>

          <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] text-slate-900">
            Mai áttekintés
          </h2>

          <p className="mt-2 text-slate-500">
            A legfontosabb mutatók egy
            pillantásra.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <StatOverviewCard
            key={card.title}
            {...card}
          />
        ))}
      </div>
    </section>
  );
}

type StatOverviewCardProps = StatCard;

const THEMES = {
  blue: {
    icon:
      "bg-sky-500 text-white",
    glow:
      "bg-sky-400/20",
  },

  emerald: {
    icon:
      "bg-emerald-500 text-white",
    glow:
      "bg-emerald-400/20",
  },

  violet: {
    icon:
      "bg-violet-500 text-white",
    glow:
      "bg-violet-400/20",
  },

  amber: {
    icon:
      "bg-amber-500 text-white",
    glow:
      "bg-amber-400/20",
  },

  rose: {
    icon:
      "bg-rose-500 text-white",
    glow:
      "bg-rose-400/20",
  },

  slate: {
    icon:
      "bg-slate-700 text-white",
    glow:
      "bg-slate-400/20",
  },
};

function StatOverviewCard({
  icon,
  title,
  value,
  subtitle,
  tone,
  highlight = false,
}: StatOverviewCardProps) {
  const theme =
    THEMES[tone];

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.14)]",
        highlight
          ? "ring-2 ring-amber-200"
          : "",
      ].join(" ")}
    >
      <div
        className={[
          "absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl",
          theme.glow,
        ].join(" ")}
      />

      <div className="relative flex items-center justify-between">
        <div
          className={[
            "flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg",
            theme.icon,
          ].join(" ")}
        >
          <Icon
            icon={icon}
            size="lg"
          />
        </div>

        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Ma
        </span>
      </div>

      <div className="relative mt-8">
        <div className="text-5xl font-black tracking-[-0.05em] text-slate-900">
          {value}
        </div>

        <div className="mt-3 text-lg font-bold text-slate-800">
          {title}
        </div>

        <div className="mt-1 text-sm text-slate-500">
          {subtitle}
        </div>
      </div>

      <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={[
            "h-full rounded-full",
            theme.icon
              .split(" ")[0],
          ].join(" ")}
          style={{
            width: highlight
              ? "100%"
              : "72%",
          }}
        />
      </div>
    </div>
  );
}
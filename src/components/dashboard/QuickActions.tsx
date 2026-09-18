import Link from "next/link";
import {
  ArrowRight,
  FileText,
  FolderPlus,
  SquarePlus,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";

type Action = {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  glow: string;
  tags: string[];
};

const actions: Action[] = [
  {
    href: "/cases/new",
    icon: FolderPlus,
    title: "Új ügy",
    description: "Új ingatlanügy létrehozása",
    color: "bg-sky-500 text-white",
    glow: "bg-sky-400/20",
    tags: ["Ügyfél", "Ingatlan", "Feladat"],
  },
  {
    href: "/tasks/new",
    icon: SquarePlus,
    title: "Új feladat",
    description: "Mai feladat hozzáadása",
    color: "bg-emerald-500 text-white",
    glow: "bg-emerald-400/20",
    tags: ["Határidő", "Prioritás", "Naptár"],
  },
  {
    href: "/offers/new",
    icon: FileText,
    title: "Új ajánlat",
    description: "Ajánlat készítése",
    color: "bg-violet-500 text-white",
    glow: "bg-violet-400/20",
    tags: ["PDF", "Email", "Verzió"],
  },
  {
    href: "/clients/new",
    icon: UserPlus,
    title: "Új ügyfél",
    description: "Kapcsolat rögzítése",
    color: "bg-amber-500 text-white",
    glow: "bg-amber-400/20",
    tags: ["CRM", "Kapcsolat", "Előzmények"],
  },
];

export default function QuickActions() {
  return (
    <Section
      title="Gyors műveletek"
      description="A leggyakoribb műveletek egy kattintással."
    >
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group relative overflow-hidden rounded-[30px] border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-sky-50/40 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] hover:border-sky-200 hover:shadow-[0_30px_80px_rgba(15,23,42,0.16)]"
          >
            <div className={["absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-all duration-500 group-hover:scale-125",action.glow].join(" ")} />

            <div className="relative flex items-center justify-between">
              <div className={[action.color,"flex h-[72px] w-[72px] items-center justify-center rounded-[24px] ring-1 ring-white/30 shadow-xl transition-transform duration-300 group-hover:scale-110"].join(" ")}>
                <Icon icon={action.icon} size="lg" />
              </div>

              <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                Gyors indítás
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">{action.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{action.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {action.tags.map(tag=>(
                  <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{tag}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-200/70 pt-5">
              <span className="font-semibold text-slate-700 group-hover:text-sky-600">
                Indítás
              </span>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"/>
              </div>
            </div>

            <div className="absolute inset-x-6 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"/>
          </Link>
        ))}
      </div>
    </Section>
  );
}
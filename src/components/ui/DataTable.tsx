import type { ReactNode } from "react";

import EmptyState from "./EmptyState";

type DataTableProps = {
  children: ReactNode;
  className?: string;
};

type SectionProps = {
  children: ReactNode;
};

type EmptyProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

function Root({
  children,
  className = "",
}: DataTableProps) {
  return (
    <div
      className={[
        "overflow-hidden",
        "rounded-3xl",
        "border border-white/60",
        "bg-white/80",
        "backdrop-blur-xl",
        "shadow-[0_10px_40px_rgba(15,23,42,0.08)]",
        "ring-1 ring-slate-200/60",
        "transition-all duration-300",
        className,
      ].join(" ")}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {children}
        </table>
      </div>
    </div>
  );
}

function Head({
  children,
}: SectionProps) {
  return (
    <thead className="border-b border-slate-200/70 bg-gradient-to-r from-slate-50 via-white to-sky-50">
      {children}
    </thead>
  );
}

function Body({
  children,
}: SectionProps) {
  return (
    <tbody className="divide-y divide-slate-100 bg-white">
      {children}
    </tbody>
  );
}

function Empty({
  title = "Nincs adat",
  description = "Nincs megjeleníthető elem.",
  icon = "📂",
  action,
}: EmptyProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-10 shadow-sm">
      <EmptyState
        icon={icon}
        title={title}
        description={description}
        action={action}
      />
    </div>
  );
}

const DataTable = Object.assign(Root, {
  Head,
  Body,
  Empty,
});

export default DataTable;
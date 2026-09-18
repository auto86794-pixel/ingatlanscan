"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: StatCard
 * ----------------------------------------
 *
 * Dashboard és statisztikai panelekhez.
 */

import type { ReactNode } from "react";

import Card from "./Card";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  onClick?: () => void;
};

export default function StatCard({
  title,
  value,
  icon,
  change,
  onClick,
}: StatCardProps) {
  return (
    <Card
      hover
      onClick={onClick}
      className={[
        onClick ? "cursor-pointer" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          {change && (
            <p className="mt-2 text-sm font-medium text-emerald-600">
              {change}
            </p>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
    </Card>
  );
}
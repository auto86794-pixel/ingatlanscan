"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: Section
 * ----------------------------------------
 *
 * Egységes szekció komponens.
 * Visszafelé kompatibilis a régi
 * description és actions propokkal.
 */

import type { ReactNode } from "react";

type SectionProps = {
  title: string;

  subtitle?: string;

  /**
   * Régi prop.
   */
  description?: string;

  /**
   * Új prop.
   */
  action?: ReactNode;

  /**
   * Régi prop.
   */
  actions?: ReactNode;

  children: ReactNode;
};

export default function Section({
  title,
  subtitle,
  description,
  action,
  actions,
  children,
}: SectionProps) {
  const text = subtitle ?? description;

  const right = action ?? actions;

  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {title}
          </h2>

          {text && (
            <p className="mt-1 text-sm text-slate-500">
              {text}
            </p>
          )}
        </div>

        {right && (
          <div className="shrink-0">
            {right}
          </div>
        )}
      </div>

      {children}
    </section>
  );
}
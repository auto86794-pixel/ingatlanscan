"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: PageHeader
 * ----------------------------------------
 *
 * Egységes oldalfejléc.
 * Visszafelé kompatibilis a régi
 * children, description és actions propokkal.
 */

import type { ReactNode } from "react";

type PageHeaderProps = {
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

  /**
   * Régi használat miatt.
   */
  children?: ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  description,
  action,
  actions,
  children,
}: PageHeaderProps) {
  const text = subtitle ?? description;

  const right = action ?? actions ?? children;

  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
          {title}
        </h1>

        {text && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 lg:text-base">
            {text}
          </p>
        )}
      </div>

      {right && (
        <div className="flex shrink-0 items-center gap-3">
          {right}
        </div>
      )}
    </div>
  );
}
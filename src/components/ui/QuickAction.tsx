"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: QuickAction
 * ----------------------------------------
 *
 * Dashboard gyors műveletekhez.
 */

import Link from "next/link";
import type { ReactNode } from "react";

import Card from "./Card";

type QuickActionProps = {
  title: string;
  description?: string;
  href: string;
  icon: ReactNode;
};

export default function QuickAction({
  title,
  description,
  href,
  icon,
}: QuickActionProps) {
  return (
    <Link href={href} className="block">
      <Card
        hover
        className="h-full cursor-pointer"
      >
        <div className="flex flex-col gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            {icon}
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {title}
            </h3>

            {description && (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {description}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
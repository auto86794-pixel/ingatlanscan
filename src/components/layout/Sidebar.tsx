"use client";

/**
 * HomeFlow CRM
 *
 * Sidebar
 *
 * Desktop navigáció.
 * A menüpontokat a NavigationList komponens rajzolja ki,
 * így nincs duplikált navigációs logika.
 */

import { House, Sparkles } from "lucide-react";

import NavigationList from "./NavigationList";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-100 px-8 py-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <House
              className="h-6 w-6"
              strokeWidth={2.2}
            />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              HomeFlow
            </h1>

            <p className="text-sm text-slate-500">
              Real Estate CRM
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <NavigationList />

      {/* AI Card */}
      <div className="border-t border-slate-100 p-6">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600" />

            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              HomeFlow AI
            </p>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            Az asszisztens figyeli a feladataidat,
            kiemeli a fontos teendőket,
            és segít a napi munkád
            megszervezésében.
          </p>
        </div>
      </div>
    </aside>
  );
}
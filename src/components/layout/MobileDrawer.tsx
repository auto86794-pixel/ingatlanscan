"use client";

import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";

import Icon from "@/components/ui/Icon";

import { navigation } from "./navigation";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileDrawer({
  open,
  onClose,
}: MobileDrawerProps) {
  const pathname = usePathname();

  return (
    <div
      aria-hidden={!open}
      className="lg:hidden"
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Mobil menü bezárása"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={[
          "fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm",
          "transition-opacity duration-300 ease-out",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobil navigáció"
        className={[
          "fixed inset-y-0 left-0 z-50",
          "flex w-80 max-w-[90vw] flex-col",
          "overflow-hidden bg-white shadow-2xl",
          "transition-transform duration-300 ease-out",
          open
            ? "translate-x-0"
            : "-translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-slate-900">
                HomeFlow
              </h2>

              <p className="truncate text-xs text-slate-500">
                Real Estate CRM
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Mobil menü bezárása"
            onClick={onClose}
            className={[
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              "text-slate-500 transition-colors",
              "hover:bg-slate-100 hover:text-slate-900",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            ].join(" ")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overscroll-contain p-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className={[
                    "group flex items-center gap-4 rounded-2xl px-4 py-3",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      "transition-colors duration-200",
                      active
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900",
                    ].join(" ")}
                  >
                    <Icon
                      icon={item.icon}
                      size="md"
                    />
                  </div>

                  <span className="truncate font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-blue-600" />

              <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                HomeFlow AI
              </span>
            </div>

            <p className="text-sm leading-6 text-slate-600">
              Az AI asszisztens figyeli a napi feladatokat, és segít a
              legfontosabb teendők priorizálásában.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
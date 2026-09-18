"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

import Icon from "@/components/ui/Icon";

import { navigation } from "./navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  const items = navigation.filter(
    (item) => item.mobile
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
      <div className="grid h-16 grid-cols-5">
        {items.slice(0, 2).map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1"
            >
              <Icon
                icon={item.icon}
                size="sm"
                className={
                  active
                    ? "text-blue-600"
                    : "text-slate-500"
                }
              />

              <span
                className={[
                  "text-[11px] font-medium",
                  active
                    ? "text-blue-600"
                    : "text-slate-500",
                ].join(" ")}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <Link
          href="/cases/new"
          className="flex items-center justify-center"
        >
          <div className="flex h-14 w-14 -translate-y-4 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition hover:scale-105">
            <Plus className="h-6 w-6" />
          </div>
        </Link>

        {items.slice(2).map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1"
            >
              <Icon
                icon={item.icon}
                size="sm"
                className={
                  active
                    ? "text-blue-600"
                    : "text-slate-500"
                }
              />

              <span
                className={[
                  "text-[11px] font-medium",
                  active
                    ? "text-blue-600"
                    : "text-slate-500",
                ].join(" ")}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
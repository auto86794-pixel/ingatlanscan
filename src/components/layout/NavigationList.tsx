"use client";

/**
 * HomeFlow CRM
 *
 * NavigationList
 *
 * Közös navigációs komponens,
 * amelyet a Sidebar és a
 * MobileDrawer is használ.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

import Icon from "@/components/ui/Icon";

import { navigation } from "./navigation";

type NavigationListProps = {
  onItemClick?: () => void;
};

export default function NavigationList({
  onItemClick,
}: NavigationListProps) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-2 p-4">
      {navigation.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={[
              "group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200",
              active
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            ].join(" ")}
          >
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
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

            <span className="font-medium">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
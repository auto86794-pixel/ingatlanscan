"use client";

import Image from "next/image";

import {
  Bell,
  Menu,
  Plus,
  Search,
} from "lucide-react";

import Button from "@/components/ui/Button";

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:h-20 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 lg:text-3xl">
              Dashboard
            </h2>

            <p className="hidden text-sm text-slate-500 lg:block">
              Üdv újra! Íme a mai áttekintés.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm xl:flex">
            <Search className="h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Keresés..."
              className="w-64 border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="hidden lg:block">
            <Button href="/cases/new">
              <Plus className="mr-2 h-4 w-4" />
              Új ügy
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 lg:h-11 lg:w-11 lg:rounded-2xl"
          >
            <Bell className="h-5 w-5" />
          </button>

          {/* HomeFlow logó */}
          <div className="mr-3 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="HomeFlow CRM"
              width={64}
              height={64}
              className="h-12 w-12 object-contain lg:h-16 lg:w-16"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
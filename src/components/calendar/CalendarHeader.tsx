"use client";

import Button from "@/components/ui/Button";

import type { CalendarView } from "@/types/calendar";

type CalendarHeaderProps = {
  title: string;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
};

export default function CalendarHeader({
  title,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
}: CalendarHeaderProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center">
          <h2 className="text-center text-xl font-bold whitespace-nowrap lg:mr-4">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
            >
              ◀
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onToday}
            >
              Ma
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
            >
              ▶
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 lg:flex lg:flex-wrap">
          <Button
            size="sm"
            variant={
              view === "month"
                ? "primary"
                : "outline"
            }
            onClick={() =>
              onViewChange("month")
            }
          >
            Hónap
          </Button>

          <Button
            size="sm"
            variant={
              view === "week"
                ? "primary"
                : "outline"
            }
            onClick={() =>
              onViewChange("week")
            }
          >
            Hét
          </Button>

          <Button
            size="sm"
            variant={
              view === "day"
                ? "primary"
                : "outline"
            }
            onClick={() =>
              onViewChange("day")
            }
          >
            Nap
          </Button>

          <Button
            size="sm"
            variant={
              view === "agenda"
                ? "primary"
                : "outline"
            }
            onClick={() =>
              onViewChange("agenda")
            }
          >
            Lista
          </Button>
        </div>
      </div>
    </div>
  );
}
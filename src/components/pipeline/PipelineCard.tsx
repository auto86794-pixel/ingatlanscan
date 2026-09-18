"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import {
  Calendar,
  ChevronRight,
  Home,
  User,
} from "lucide-react";

import Card from "@/components/ui/Card";

import type { PipelineCard as PipelineCardType } from "@/types/pipeline";

type PipelineCardProps = {
  item: PipelineCardType;
};

function formatPrice(price?: number | null) {
  if (!price) {
    return "Ár nincs megadva";
  }

  return new Intl.NumberFormat("hu-HU").format(price) + " Ft";
}

function formatDate(date?: string | null) {
  if (!date) {
    return "Ma";
  }

  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export default function PipelineCard({
  item,
}: PipelineCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: item.id,
    data: {
      item,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Card
        className={[
          "cursor-grab border border-slate-200 transition-all duration-200",
          "hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg",
          isDragging
            ? "cursor-grabbing shadow-2xl ring-2 ring-blue-300"
            : "",
        ].join(" ")}
        padding="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                HF-
                {String(item.case.case_number).padStart(
                  6,
                  "0",
                )}
              </p>

              <h3 className="mt-1 line-clamp-2 font-semibold text-slate-900">
                {item.case.title}
              </h3>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <User className="h-4 w-4 text-blue-600" />

              <span className="truncate">
                {item.clientName}
              </span>
            </div>

            {item.propertyTitle && (
              <div className="flex items-center gap-2 text-slate-600">
                <Home className="h-4 w-4 text-blue-600" />

                <span className="truncate">
                  {item.propertyTitle}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="h-4 w-4 text-blue-600" />

              <span>
                {formatDate(item.updatedAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(item.price)}
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Aktív
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
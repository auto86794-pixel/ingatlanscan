"use client";

import { useDroppable } from "@dnd-kit/core";

import Card from "@/components/ui/Card";

import PipelineCard from "./PipelineCard";

import type {
  PipelineCard as PipelineCardType,
  PipelineColumn as PipelineColumnType,
} from "@/types/pipeline";

type PipelineColumnProps = {
  column: PipelineColumnType;
  items: PipelineCardType[];
};

export default function PipelineColumn({
  column,
  items,
}: PipelineColumnProps) {
  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={[
        "flex min-w-[320px] flex-col rounded-2xl transition-colors",
        isOver
          ? "bg-blue-50 ring-2 ring-blue-300"
          : "bg-slate-50",
      ].join(" ")}
    >
      <div className="sticky top-0 z-10 rounded-t-2xl border-b border-slate-200 bg-white px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-3 rounded-full ${column.color}`}
            />

            <h2 className="font-semibold text-slate-900">
              {column.title}
            </h2>
          </div>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {items.length}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        {items.length === 0 ? (
          <Card
            className="border-2 border-dashed border-slate-200 bg-white/70"
            padding="sm"
          >
            <div className="py-8 text-center text-sm text-slate-400">
              Nincs ügy ebben a státuszban.
            </div>
          </Card>
        ) : (
          items.map((item) => (
            <PipelineCard
              key={item.id}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
}
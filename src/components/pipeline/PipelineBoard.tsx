"use client";

import {
  DndContext,
  type DragEndEvent,
} from "@dnd-kit/core";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import PipelineColumn from "./PipelineColumn";

import { updatePipelineStage } from "@/services/pipeline-service";

import {
  DEFAULT_PIPELINE_COLUMNS,
  type PipelineCard,
  type PipelineColumnId,
} from "@/types/pipeline";

type PipelineBoardProps = {
  items: PipelineCard[];
};

export default function PipelineBoard({
  items,
}: PipelineBoardProps) {
  const router = useRouter();

  const [, startTransition] =
    useTransition();

  async function handleDragEnd(
    event: DragEndEvent,
  ) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const stage =
      over.id as PipelineColumnId;

    const card = items.find(
      (item) => item.id === active.id,
    );

    if (!card) {
      return;
    }

    if (
      card.case.pipeline_stage === stage
    ) {
      return;
    }

    startTransition(async () => {
      await updatePipelineStage(
        card.id,
        stage,
      );

      router.refresh();
    });
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-6 pb-2">
          {DEFAULT_PIPELINE_COLUMNS.map(
            (column) => {
              const columnItems =
                items.filter(
                  (item) =>
                    item.case
                      .pipeline_stage ===
                    column.id,
                );

              return (
                <div
                  key={column.id}
                  className="w-[340px] flex-shrink-0"
                >
                  <PipelineColumn
                    column={column}
                    items={columnItems}
                  />
                </div>
              );
            },
          )}
        </div>
      </div>
    </DndContext>
  );
}
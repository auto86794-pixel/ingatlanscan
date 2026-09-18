import type { Task } from "@/types/task";

import TaskCard from "./TaskCard";

interface TaskKanbanProps {
  tasks: Task[];
}

const columns = [
  {
    key: "todo",
    title: "Teendő",
  },
  {
    key: "in_progress",
    title: "Folyamatban",
  },
  {
    key: "waiting",
    title: "Várakozik",
  },
  {
    key: "done",
    title: "Kész",
  },
] as const;

export default function TaskKanban({
  tasks,
}: TaskKanbanProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-4">
      {columns.map((column) => {
        const columnTasks =
          tasks.filter(
            (task) =>
              task.status ===
              column.key
          );

        return (
          <div
            key={column.key}
            className="rounded-2xl bg-slate-100 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">
                {column.title}
              </h2>

              <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-600">
                {columnTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnTasks.length > 0 ? (
                columnTasks.map(
                  (task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                    />
                  )
                )
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-500">
                  Nincs feladat
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
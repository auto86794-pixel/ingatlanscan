import Link from "next/link";
import { CalendarDays, CheckCircle2 } from "lucide-react";

import PriorityBadge from "@/components/ui/PriorityBadge";
import StatusBadge from "@/components/ui/StatusBadge";

import type { Task } from "@/types/task";

type TasksListProps = {
  tasks: Task[];
  caseId: string;
};

export default function TasksList({
  tasks,
  caseId,
}: TasksListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <CheckCircle2 className="h-6 w-6 text-slate-400" />
        </div>

        <h3 className="text-lg font-semibold text-slate-800">
          Még nincs feladat
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Hozz létre egy új feladatot ehhez az ügyhöz.
        </p>

        <Link
          href={`/tasks/new?case=${caseId}`}
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          + Új feladat
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Link
          key={task.id}
          href={`/tasks/${task.id}`}
          className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-slate-900">
                {task.title}
              </h3>

              {task.description && (
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                  {task.description}
                </p>
              )}

              {task.due_date && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays className="h-4 w-4" />

                  <span>
                    {new Date(task.due_date).toLocaleDateString(
                      "hu-HU"
                    )}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusBadge status={task.status} />

              <PriorityBadge priority={task.priority} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
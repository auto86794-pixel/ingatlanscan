import Link from "next/link";

import type { Task } from "@/types/task";

import Card from "@/components/ui/Card";

import TaskPriorityBadge from "./TaskPriorityBadge";
import TaskStatusBadge from "./TaskStatusBadge";

interface TaskCardProps {
  task: Task;
}

const typeIcons: Record<
  Task["type"],
  string
> = {
  task: "📋",
  meeting: "🤝",
  call: "📞",
  visit: "🏠",
};

export default function TaskCard({
  task,
}: TaskCardProps) {
  return (
    <Card className="space-y-3 p-4 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-1 text-sm">
            {typeIcons[task.type]}
          </div>

          <Link
            href={`/tasks/${task.id}`}
            className="font-semibold text-slate-900 transition hover:text-blue-600"
          >
            {task.title}
          </Link>
        </div>

        <TaskPriorityBadge
          priority={task.priority}
        />
      </div>

      {task.description && (
        <p className="line-clamp-2 text-sm text-slate-600">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <TaskStatusBadge
          status={task.status}
        />

        <span className="text-xs text-slate-500">
          {task.due_date
            ? new Date(
                task.due_date
              ).toLocaleDateString(
                "hu-HU"
              )
            : "Nincs határidő"}
        </span>
      </div>
    </Card>
  );
}
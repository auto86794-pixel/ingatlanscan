import Link from "next/link";

import { taskService } from "@/services/task-service";

import TaskView from "@/components/tasks/TaskView";
import PageTitle from "@/components/ui/PageTitle";

export default async function TasksPage() {
  const tasks =
    await taskService.getTasks();

  return (
    <div className="space-y-6">
      <PageTitle
        title="Feladatok"
        subtitle="Feladatok kezelése"
        action={
          <Link
            href="/tasks/new"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Új feladat
          </Link>
        }
      />

      <TaskView tasks={tasks} />
    </div>
  );
}
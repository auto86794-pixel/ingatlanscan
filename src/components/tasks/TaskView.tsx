"use client";

import { useMemo, useState } from "react";

import type { Task } from "@/types/task";

import TaskKanban from "./TaskKanban";
import TasksList from "./TasksList";

interface TaskViewProps {
  tasks: Task[];
}

export default function TaskView({
  tasks,
}: TaskViewProps) {
  const [view, setView] = useState<"list" | "kanban">("list");
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return tasks;
    }

    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
    );
  }, [tasks, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-3">
          <button
            onClick={() => setView("list")}
            className={
              view === "list"
                ? "rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                : "rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
            }
          >
            Lista
          </button>

          <button
            onClick={() => setView("kanban")}
            className={
              view === "kanban"
                ? "rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                : "rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
            }
          >
            Kanban
          </button>
        </div>

        <input
          type="text"
          placeholder="Feladat keresése..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm lg:max-w-sm"
        />
      </div>

      {view === "kanban" ? (
        <TaskKanban tasks={filteredTasks} />
      ) : (
        <TasksList
          tasks={filteredTasks}
          caseId=""
        />
      )}
    </div>
  );
}
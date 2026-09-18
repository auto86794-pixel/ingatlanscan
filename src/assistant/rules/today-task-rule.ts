import {
  calculateTaskPriority,
} from "@/assistant/features/priority/priority-calculator";

import type {
  AssistantItem,
} from "@/types/assistant";

import type {
  Task,
} from "@/types/task";

import type {
  AssistantContext,
} from "../assistant-context";

import type {
  AssistantRule,
} from "./rule";

export class TodayTaskRule
  implements AssistantRule
{
  execute(
    context: AssistantContext
  ): AssistantItem[] {
    return context.tasks
      .filter((task) =>
        this.isToday(
          task,
          context.now
        )
      )
      .sort((a, b) => {
        const pa =
          calculateTaskPriority(
            a,
            context.now
          );

        const pb =
          calculateTaskPriority(
            b,
            context.now
          );

        return (
          pb.score - pa.score
        );
      })
      .map((task) =>
        this.createAssistantItem(
          task,
          context.now
        )
      );
  }

  private isToday(
    task: Task,
    now: Date
  ): boolean {
    if (!task.due_date) {
      return false;
    }

    const due =
      new Date(task.due_date);

    return (
      due.getFullYear() ===
        now.getFullYear() &&
      due.getMonth() ===
        now.getMonth() &&
      due.getDate() ===
        now.getDate()
    );
  }

  private createAssistantItem(
    task: Task,
    now: Date
  ): AssistantItem {
    const priority =
      calculateTaskPriority(
        task,
        now
      );

    return {
      id: `today-${task.id}`,

      type: "action",

      priority:
        priority.priority,

      source: "task",

      title: task.title,

      subtitle:
        "Mai feladat",

      reason:
        priority.recommended
          ? "Ajánlott ezzel kezdeni."
          : "Ma esedékes feladat.",

      dueAt:
        new Date(
          task.due_date!
        ),

      icon: "📋",

      color: "green",

      actions: [
        {
          id: `task-${task.id}`,
          label:
            "Feladat megnyitása",
          icon: "✅",
          href: `/tasks/${task.id}`,
          primary: true,
        },
      ],

      completed: false,

      dismissible: true,

      score:
        priority.score,

      recommended:
        priority.recommended,

      estimatedMinutes: 15,

      caseId:
        task.case_id ??
        undefined,
    };
  }
}
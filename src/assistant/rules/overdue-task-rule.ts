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

/**
 * Overdue Task Rule.
 *
 * A lejárt feladatokból
 * Assistant elemeket készít.
 */
export class OverdueTaskRule
  implements AssistantRule
{
  execute(
    context: AssistantContext
  ): AssistantItem[] {
    return context.tasks
      .filter((task) =>
        this.isOverdue(
          task,
          context.now
        )
      )
      .map((task) =>
        this.createAssistantItem(
          task,
          context.now
        )
      );
  }

  /**
   * Lejárt feladat.
   */
  private isOverdue(
    task: Task,
    now: Date
  ): boolean {
    if (!task.due_date) {
      return false;
    }

    return (
      new Date(
        task.due_date
      ).getTime() <
      now.getTime()
    );
  }

  /**
   * Assistant kártya létrehozása.
   */
  private createAssistantItem(
    task: Task,
    now: Date
  ): AssistantItem {
    const dueAt =
      new Date(task.due_date!);

    const priority =
      calculateTaskPriority(
        task,
        now
      );

    const overdueDays =
      Math.max(
        1,
        Math.ceil(
          (now.getTime() -
            dueAt.getTime()) /
            (24 *
              60 *
              60 *
              1000)
        )
      );

    return {
      id: `overdue-${task.id}`,

      type: "warning",

      priority:
        priority.priority,

      source: "task",

      title: task.title,

      subtitle:
        "Lejárt feladat",

      reason: `${overdueDays} napja lejárt.`,

      dueAt,

      icon: "⚠️",

      color: "red",

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

      estimatedMinutes: 5,

      caseId:
        task.case_id ??
        undefined,
    };
  }
}
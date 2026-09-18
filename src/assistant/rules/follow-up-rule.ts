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
 * Follow-up Rule.
 *
 * A nyitott, hívás típusú feladatokból
 * Assistant elemeket készít.
 */
export class FollowUpRule
  implements AssistantRule
{
  execute(
    context: AssistantContext
  ): AssistantItem[] {
    if (!context.tasks.length) {
      return [];
    }

    return context.tasks
      .filter((task) =>
        this.isFollowUpTask(task)
      )
      .map((task) =>
        this.createAssistantItem(
          task,
          context.now
        )
      );
  }

  /**
   * Nyitott hívás típusú feladat.
   */
  private isFollowUpTask(
    task: Task
  ): boolean {
    return (
      task.type === "call" &&
      task.status !== "done" &&
      task.status !== "cancelled"
    );
  }

  /**
   * Assistant kártya létrehozása.
   */
  private createAssistantItem(
    task: Task,
    now: Date
  ): AssistantItem {
    const dueAt = task.due_date
      ? new Date(task.due_date)
      : now;

    const priority =
      calculateTaskPriority(
        task,
        now
      );

    return {
      id: `follow-up-${task.id}`,

      type: "call",

      priority:
        priority.priority,

      source: "task",

      title: task.title,

      subtitle:
        task.description ??
        "Nyitott visszahívási feladat",

      reason:
        this.getReason(
          task,
          now
        ),

      dueAt,

      icon: "📞",

      completed: false,

      dismissible: true,

      score:
        priority.score,

      recommended:
        priority.recommended,

      estimatedMinutes: 10,

      caseId:
        task.case_id ??
        undefined,

      actions:
        this.createActions(
          task
        ),
    };
  }

  /**
   * Megjelenítési indoklás.
   */
  private getReason(
    task: Task,
    now: Date
  ): string {
    if (!task.due_date) {
      return "A visszahívásnak nincs megadott határideje.";
    }

    const dueAt = new Date(
      task.due_date
    );

    const diff =
      dueAt.getTime() -
      now.getTime();

    if (diff < 0) {
      const overdueDays =
        Math.max(
          1,
          Math.ceil(
            Math.abs(diff) /
              (24 * 60 * 60 * 1000)
          )
        );

      return `${overdueDays} napja lejárt visszahívási feladat.`;
    }

    const remainingMinutes =
      Math.ceil(
        diff /
          (60 * 1000)
      );

    if (remainingMinutes <= 60) {
      return "A visszahívás egy órán belül esedékes.";
    }

    const remainingDays =
      Math.ceil(
        diff /
          (24 * 60 * 60 * 1000)
      );

    if (remainingDays <= 1) {
      return "A visszahívás ma esedékes.";
    }

    return `${remainingDays} napon belül esedékes visszahívás.`;
  }

  /**
   * Gyors műveletek.
   */
  private createActions(
    task: Task
  ): AssistantItem["actions"] {
    const actions:
      AssistantItem["actions"] = [
        {
          id: `open-task-${task.id}`,
          label: "Feladat megnyitása",
          icon: "✅",
          href: `/tasks/${task.id}`,
          primary: true,
        },
      ];

    if (task.case_id) {
      actions.push({
        id: `open-case-${task.case_id}`,
        label: "Ügy megnyitása",
        icon: "📁",
        href: `/cases/${task.case_id}`,
      });
    }

    return actions;
  }
}
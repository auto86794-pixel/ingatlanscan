import type {
  AssistantPriority,
} from "@/types/assistant";

import type {
  Task,
} from "@/types/task";

/**
 * Prioritás számítás eredménye.
 */
export type PriorityResult = {
  score: number;
  priority: AssistantPriority;
  recommended: boolean;
};

/**
 * Task prioritás számítása.
 */
export function calculateTaskPriority(
  task: Task,
  now: Date
): PriorityResult {
  let score = 0;

  /**
   * Alap prioritás.
   */
  switch (task.priority) {
    case "urgent":
      score += 60;
      break;

    case "high":
      score += 40;
      break;

    case "normal":
      score += 20;
      break;

    case "low":
      score += 10;
      break;
  }

  /**
   * Lejárt?
   */
  if (task.due_date) {
    const due = new Date(
      task.due_date
    ).getTime();

    const diff =
      due - now.getTime();

    if (diff < 0) {
      score += 50;
    } else if (
      diff <=
      60 * 60 * 1000
    ) {
      score += 30;
    } else if (
      diff <=
      24 * 60 * 60 * 1000
    ) {
      score += 15;
    }
  }

  /**
   * Hívások fontosabbak.
   */
  if (task.type === "call") {
    score += 10;
  }

  /**
   * Találkozók még fontosabbak.
   */
  if (task.type === "meeting") {
    score += 15;
  }

  let priority: AssistantPriority =
    "low";

  if (score >= 100) {
    priority = "urgent";
  } else if (score >= 70) {
    priority = "high";
  } else if (score >= 35) {
    priority = "normal";
  }

  return {
    score,
    priority,
    recommended:
      score >= 70,
  };
}
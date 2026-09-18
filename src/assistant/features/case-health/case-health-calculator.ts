import type {
  CalendarEvent,
} from "@/types/calendar";

import type {
  Case,
} from "@/types/case";

import type {
  Task,
} from "@/types/task";

import type {
  CaseHealth,
  CaseHealthStatus,
} from "./case-health-types";

/**
 * Kiszámolja egy ügy egészségi állapotát.
 */
export function calculateCaseHealth(
  input: {
    now: Date;
    caseItem: Case;
    tasks: Task[];
    events: CalendarEvent[];
  }
): CaseHealth {
  let score = 100;

  const caseTasks =
    input.tasks.filter(
      (task) =>
        task.case_id ===
        input.caseItem.id
    );

  const openTasks =
    caseTasks.filter(
      (task) =>
        task.status !== "done" &&
        task.status !== "cancelled"
    );

  const upcomingMeetings =
    input.events.filter(
      (event) =>
        event.case_id ===
          input.caseItem.id &&
        event.start_at !== null &&
        new Date(
          event.start_at
        ).getTime() >=
          input.now.getTime()
    );

  let reason =
    "Az ügy rendben halad.";

  if (openTasks.length === 0) {
    score -= 25;

    reason =
      "Nincs nyitott feladat.";
  }

  if (
    upcomingMeetings.length === 0
  ) {
    score -= 20;

    if (
      reason ===
      "Az ügy rendben halad."
    ) {
      reason =
        "Nincs következő találkozó.";
    }
  }

  let status: CaseHealthStatus =
    "healthy";

  if (score < 40) {
    status = "critical";
  } else if (score < 70) {
    status = "warning";
  }

  return {
    caseId:
      input.caseItem.id,
    score,
    status,
    reason,
  };
}
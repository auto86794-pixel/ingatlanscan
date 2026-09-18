import {
  calendarRepository,
} from "@/lib/repositories/calendar-repository";

import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import {
  taskRepository,
} from "@/lib/repositories/task-repository";

import type {
  AssistantContext,
} from "./assistant-context";

/**
 * Assistant Context Builder.
 *
 * Összegyűjti az Assistant Engine
 * számára szükséges adatokat.
 */
export class AssistantContextBuilder {
  async build(): Promise<AssistantContext> {
    const now = new Date();

    const start = new Date(now);
    start.setHours(
      0,
      0,
      0,
      0
    );

    const end = new Date(now);
    end.setHours(
      23,
      59,
      59,
      999
    );

    const [
      events,
      allTasks,
      cases,
    ] = await Promise.all([
      calendarRepository.getCalendarEvents({
        start:
          start.toISOString(),
        end:
          end.toISOString(),
      }),
      taskRepository.getAll(),
      caseRepository.getAll(),
    ]);

    const tasks =
      allTasks.filter(
        (task) =>
          task.status !== "done" &&
          task.status !== "cancelled"
      );

    return {
      now,
      events,
      tasks,
      cases,
    };
  }
}

/**
 * Singleton.
 */
export const assistantContextBuilder =
  new AssistantContextBuilder();
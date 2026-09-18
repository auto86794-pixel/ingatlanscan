import type {
  AssistantContext,
} from "@/assistant/assistant-context";

import type {
  DailySummary,
} from "./daily-summary-types";

/**
 * Daily Summary Builder.
 *
 * Elkészíti a Dashboard napi
 * AI összefoglalóját.
 */
export class DailySummaryBuilder {
  build(
    context: AssistantContext
  ): DailySummary {
    const meetings =
      context.events.length;

    const tasks =
      context.tasks.length;

    const followUps =
      context.tasks.filter(
        (task) =>
          task.type === "call"
      ).length;

    const overdue =
      context.tasks.filter(
        (task) => {
          if (!task.due_date) {
            return false;
          }

          return (
            new Date(
              task.due_date
            ).getTime() <
            context.now.getTime()
          );
        }
      ).length;

    return {
      greeting:
        this.getGreeting(
          context.now
        ),

      recommendation:
        this.getRecommendation({
          meetings,
          tasks,
          followUps,
          overdue,
        }),

      meetings,

      tasks,

      followUps,

      overdue,
    };
  }

  /**
   * Napszak szerinti köszönés.
   */
  private getGreeting(
    now: Date
  ): string {
    const hour =
      now.getHours();

    if (hour < 12) {
      return "Jó reggelt!";
    }

    if (hour < 18) {
      return "Jó napot!";
    }

    return "Jó estét!";
  }

  /**
   * AI ajánlás.
   */
  private getRecommendation(
    summary: Pick<
      DailySummary,
      | "meetings"
      | "tasks"
      | "followUps"
      | "overdue"
    >
  ): string {
    if (summary.overdue > 0) {
      return "Érdemes a lejárt feladatokkal kezdeni.";
    }

    if (summary.followUps > 0) {
      return "A visszahívások elsőbbséget élveznek.";
    }

    if (summary.meetings > 0) {
      return "Készülj fel a mai találkozókra.";
    }

    if (summary.tasks > 0) {
      return "Tekintsd át a mai feladatokat.";
    }

    return "Nyugodt napnak ígérkezik.";
  }
}

/**
 * Singleton.
 */
export const dailySummaryBuilder =
  new DailySummaryBuilder();
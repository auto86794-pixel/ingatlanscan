import type { DailySummary } from "@/assistant/features/daily-summary/daily-summary-types";
import type { AssistantPriority } from "@/types/assistant";

export type AssistantHeroModel = {
  greeting: string;
  recommendation: string;

  priority: AssistantPriority;

  stats: {
    meetings: number;
    tasks: number;
    followUps: number;
    overdue: number;
  };

  primaryActionLabel?: string;
};

export class AssistantHeroPresenter {
  build(
    summary: DailySummary
  ): AssistantHeroModel {
    return {
      greeting: summary.greeting,

      recommendation: summary.recommendation,

      priority: this.getPriority(summary),

      stats: {
        meetings: summary.meetings,
        tasks: summary.tasks,
        followUps: summary.followUps,
        overdue: summary.overdue,
      },

      primaryActionLabel:
        this.getPrimaryAction(summary),
    };
  }

  private getPriority(
    summary: DailySummary
  ): AssistantPriority {
    if (summary.overdue > 0) {
      return "urgent";
    }

    if (
      summary.followUps > 0 ||
      summary.meetings > 0
    ) {
      return "high";
    }

    return "normal";
  }

  private getPrimaryAction(
    summary: DailySummary
  ): string | undefined {
    if (summary.overdue > 0) {
      return "Lejárt feladatok";
    }

    if (summary.followUps > 0) {
      return "Visszahívások";
    }

    if (summary.meetings > 0) {
      return "Mai találkozók";
    }

    if (summary.tasks > 0) {
      return "Mai feladatok";
    }

    return undefined;
  }
}

export const assistantHeroPresenter =
  new AssistantHeroPresenter();
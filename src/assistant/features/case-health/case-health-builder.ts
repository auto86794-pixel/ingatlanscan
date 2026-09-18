import {
  calculateCaseHealth,
} from "./case-health-calculator";

import type {
  AssistantContext,
} from "@/assistant/assistant-context";

import type {
  CaseHealth,
} from "./case-health-types";

/**
 * Case Health Builder.
 *
 * Kiértékeli az összes ügyet és
 * visszaadja azokat, amelyek
 * figyelmet igényelnek.
 */
export class CaseHealthBuilder {
  build(
    context: AssistantContext
  ): CaseHealth[] {
    return context.cases
      .map((caseItem) =>
        calculateCaseHealth({
          now: context.now,
          caseItem,
          tasks: context.tasks,
          events: context.events,
        })
      )
      .filter(
        (health) =>
          health.status !==
          "healthy"
      )
      .sort(
        (a, b) =>
          a.score - b.score
      );
  }
}

/**
 * Singleton.
 */
export const caseHealthBuilder =
  new CaseHealthBuilder();
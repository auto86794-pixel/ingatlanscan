import {
  caseHealthBuilder,
} from "@/assistant/features/case-health/case-health-builder";

import type {
  AssistantContext,
} from "../assistant-context";

import type {
  AssistantRule,
} from "./rule";

import type {
  AssistantItem,
} from "@/types/assistant";

export class CaseHealthRule
  implements AssistantRule
{
  execute(
    context: AssistantContext
  ): AssistantItem[] {
    const healthItems =
      caseHealthBuilder.build(
        context
      );

    return healthItems.map(
      (health) => ({
        id: `case-health-${health.caseId}`,

        type: "warning",

        priority:
          health.status ===
          "critical"
            ? "urgent"
            : "high",

        source: "case",

        title:
          "Ügy figyelmet igényel",

        subtitle:
          "Case Health",

        reason:
          health.reason,

        dueAt:
          context.now,

        icon:
          health.status ===
          "critical"
            ? "🚨"
            : "⚠️",

        color:
          health.status ===
          "critical"
            ? "red"
            : "orange",

        actions: [
          {
            id: `case-${health.caseId}`,
            label:
              "Ügy megnyitása",
            href: `/cases/${health.caseId}`,
            primary: true,
          },
        ],

        completed: false,

        dismissible: true,

        score:
          health.score,

        recommended:
          health.status ===
          "critical",

        estimatedMinutes: 10,

        caseId:
          health.caseId,
      })
    );
  }
}
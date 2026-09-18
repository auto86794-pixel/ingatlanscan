import { dailySummaryBuilder } from "@/assistant/features/daily-summary/daily-summary-builder";

import type { AssistantItem } from "@/types/assistant";

import type { AssistantContext } from "../assistant-context";
import type { AssistantRule } from "./rule";

export class DailySummaryRule implements AssistantRule {
  execute(
    context: AssistantContext
  ): AssistantItem[] {
    const summary =
      dailySummaryBuilder.build(context);

    const item: AssistantItem = {
      id: "daily-summary",

      type: "info",

      priority: "high",

      source: "ai",

      title: summary.greeting,

      subtitle:
        "Mai áttekintés",

      reason:
        `${summary.recommendation}

📅 Találkozók: ${summary.meetings}
✅ Feladatok: ${summary.tasks}
📞 Visszahívások: ${summary.followUps}
⚠️ Lejárt feladatok: ${summary.overdue}`,

      dueAt: context.now,

      icon: "🌅",

      color: "blue",

      actions: [],

      completed: false,

      dismissible: false,

      score: 100,

      recommended: true,

      estimatedMinutes: 1,
    };

    return [item];
  }
}
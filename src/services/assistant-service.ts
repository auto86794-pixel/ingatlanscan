import type { AssistantItem } from "@/types/assistant";

export type DailyBriefing = {
  greeting: string;
  summary: {
    total: number;
    urgent: number;
    high: number;
    meetings: number;
    calls: number;
  };
  items: AssistantItem[];
};

class AssistantService {
  async getDailyBriefing(): Promise<DailyBriefing> {
    // A következő lépésekben ide kerülnek:
    //
    // - taskService
    // - caseService
    // - meetingService
    // - clientService
    //
    // Ezekből fogjuk összeállítani a napi ajánlásokat.

    const items: AssistantItem[] = [];

    return {
      greeting: this.getGreeting(),
      summary: this.buildSummary(items),
      items,
    };
  }

  private buildSummary(
    items: AssistantItem[]
  ): DailyBriefing["summary"] {
    return {
      total: items.length,

      urgent: items.filter(
        (item) => item.priority === "urgent"
      ).length,

      high: items.filter(
        (item) => item.priority === "high"
      ).length,

      meetings: items.filter(
        (item) => item.type === "meeting"
      ).length,

      calls: items.filter(
        (item) => item.type === "call"
      ).length,
    };
  }

  private getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Jó reggelt!";
    }

    if (hour < 18) {
      return "Jó napot!";
    }

    return "Jó estét!";
  }
}

export const assistantService =
  new AssistantService();
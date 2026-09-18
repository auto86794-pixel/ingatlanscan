import type { AssistantItem } from "./assistant";
import type { CalendarEvent } from "./calendar";

export type DashboardAgenda = {
  /**
   * Mai naptári események.
   */
  todayEvents: CalendarEvent[];

  /**
   * Következő találkozó.
   */
  nextMeeting: CalendarEvent | null;

  /**
   * Assistant elemek.
   */
  assistantItems: AssistantItem[];
};
import type {
  AssistantAction,
} from "@/types/assistant";

import type {
  CalendarEvent,
} from "@/types/calendar";

/**
 * Meeting Assistant műveletek.
 */
export function createMeetingActions(
  event: CalendarEvent
): AssistantAction[] {
  const actions: AssistantAction[] =
    [];

  if (event.client_phone) {
    actions.push({
      id: "call",
      label: "Hívás",
      icon: "📞",
      external: `tel:${event.client_phone}`,
      primary: true,
    });
  }

  if (event.address) {
    actions.push({
      id: "navigate",
      label: "Navigáció",
      icon: "🧭",
      external: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        event.address
      )}`,
    });
  }

  if (event.case_id) {
    actions.push({
      id: "case",
      label: "Ügy",
      icon: "📄",
      href: `/cases/${event.case_id}`,
    });
  }

  return actions;
}
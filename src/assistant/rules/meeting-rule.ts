import type {
  AssistantItem,
} from "@/types/assistant";

import type {
  CalendarEvent,
} from "@/types/calendar";

import type {
  AssistantContext,
} from "../assistant-context";

import type {
  AssistantRule,
} from "./rule";

import {
  getMeetingReason,
} from "@/assistant/features/meeting/meeting-reason";

import {
  createMeetingActions,
} from "@/assistant/features/meeting/meeting-actions";

/**
 * Meeting Rule.
 *
 * A következő 30 percben kezdődő
 * találkozókból Assistant elemeket készít.
 */
export class MeetingRule
  implements AssistantRule
{
  execute(
    context: AssistantContext
  ): AssistantItem[] {
    if (!context.events.length) {
      return [];
    }

    const now = context.now.getTime();

    return context.events
      .filter((event) =>
        this.isUpcomingMeeting(
          event,
          now
        )
      )
      .map((event) =>
        this.createAssistantItem(
          event,
          context.now
        )
      );
  }

  /**
   * A következő 30 percben kezdődik.
   */
  private isUpcomingMeeting(
    event: CalendarEvent,
    now: number
  ): boolean {
    if (!event.start_at) {
      return false;
    }

    const start = new Date(
      event.start_at
    ).getTime();

    const diff = start - now;

    return (
      diff >= 0 &&
      diff <= 30 * 60 * 1000
    );
  }

  /**
   * Assistant kártya létrehozása.
   */
  private createAssistantItem(
    event: CalendarEvent,
    now: Date
  ): AssistantItem {
    return {
      id: `meeting-${event.id}`,

      type: "meeting",

      priority: "urgent",

      source: "calendar",

      title: event.title,

      subtitle:
        event.client_name ??
        "Közelgő találkozó",

      reason: getMeetingReason(
        new Date(event.start_at!),
        now
      ),

      dueAt: new Date(
        event.start_at!
      ),

      event,

      completed: false,

      dismissible: false,

      actions:
        createMeetingActions(
          event
        ),
    };
  }
}
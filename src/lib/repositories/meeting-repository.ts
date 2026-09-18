import { supabase } from "@/lib/supabase";

import {
  calendarRepository,
} from "./calendar-repository";

import type {
  CalendarEvent,
} from "@/types/calendar";

import type {
  MeetingCompletionData,
  MeetingWithRelations,
} from "@/types/meeting";

export class MeetingRepository {
  async getCalendarEvents(): Promise<
    CalendarEvent[]
  > {
    return calendarRepository.getCalendarEvents();
  }

  async getById(
    id: string
  ): Promise<
    MeetingWithRelations | null
  > {
    const {
      data,
      error,
    } = await supabase
      .from("tasks")
      .select(
        `
          *,
          case:cases(
            *,
            client:clients(*),
            property:properties(*)
          )
        `
      )
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data as MeetingWithRelations;
  }

  /**
   * Régi API kompatibilitás.
   */
  async getMeeting(
    id: string
  ): Promise<
    MeetingWithRelations | null
  > {
    return this.getById(id);
  }

  async complete(
    input: MeetingCompletionData
  ): Promise<void> {
    const { error } =
      await supabase
        .from("tasks")
        .update({
          status: "done",
          completed_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          input.meetingId
        );

    if (error) {
      throw error;
    }
  }

  /**
   * Régi API kompatibilitás.
   */
  async completeMeeting(
    meetingId: string
  ): Promise<void> {
    return this.complete({
      meetingId,
      caseId: "",
      createCallReminder: false,
      createOfferReminder: false,
    });
  }
}

export const meetingRepository =
  new MeetingRepository();
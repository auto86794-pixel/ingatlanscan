import type {
  CalendarEvent,
} from "./calendar";

export type MeetingWithRelations =
  CalendarEvent;

export type MeetingCompletionData = {
  meetingId: string;
  caseId: string;
  createCallReminder: boolean;
  createOfferReminder: boolean;
};
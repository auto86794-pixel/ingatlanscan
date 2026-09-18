export type TimelineItemType =
  | "client_created"
  | "client_updated"

  | "case_created"
  | "case_updated"
  | "case_closed"

  | "offer_created"
  | "offer_sent"
  | "offer_accepted"
  | "offer_rejected"
  | "offer_expired"

  | "task_created"
  | "task_completed"

  | "meeting_created"
  | "meeting_completed"

  | "note_created"

  | "system";

export interface TimelineItem {
  id: string;

  type: TimelineItemType;

  title: string;

  description?: string | null;

  created_at: string;

  case_id: string;

  icon: string;
}
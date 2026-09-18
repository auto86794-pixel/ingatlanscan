export type TimelineEventType =
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

/**
 * Timeline esemény.
 */
export interface TimelineEvent {
  id: string;

  case_id: string | null;

  client_id: string | null;

  property_id: string | null;

  offer_id: string | null;

  task_id: string | null;

  type: TimelineEventType;

  title: string;

  description: string | null;

  created_by: string | null;

  metadata: Record<string, unknown>;

  created_at: string;
}

/**
 * Új timeline esemény létrehozása.
 */
export interface CreateTimelineEventInput {
  case_id?: string | null;

  client_id?: string | null;

  property_id?: string | null;

  offer_id?: string | null;

  task_id?: string | null;

  type: TimelineEventType;

  title: string;

  description?: string | null;

  created_by?: string | null;

  metadata?: Record<string, unknown>;
}
export type DomainEvent =
  | "client_created"
  | "client_updated"
  | "client_deleted"

  | "case_created"
  | "case_updated"
  | "case_closed"

  | "property_created"
  | "property_updated"

  | "meeting_created"
  | "meeting_completed"

  | "offer_created"
  | "offer_sent"
  | "offer_accepted"
  | "offer_rejected"
  | "offer_expired"

  | "task_created"
  | "task_completed"

  | "note_created"

  | "system";
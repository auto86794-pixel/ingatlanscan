export type FollowUpType =
  | "call"
  | "meeting"
  | "email"
  | "offer";

export interface FollowUp {
  id: string;

  case_id: string;

  type: FollowUpType;

  title: string;

  description: string | null;

  due_at: string;

  completed: boolean;

  created_at: string;
}
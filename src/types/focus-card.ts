import type { AssistantAction } from "./assistant";

export type FocusCardType =
  | "meeting"
  | "follow-up"
  | "task"
  | "offer"
  | "contract"
  | "empty";

export type FocusCard = {
  /**
   * A fókuszkártya típusa.
   */
  type: FocusCardType;

  /**
   * Fő cím.
   */
  title: string;

  /**
   * Alcím.
   */
  subtitle: string;

  /**
   * Opcionális indoklás.
   */
  reason?: string;

  /**
   * Mikor aktuális.
   */
  dueAt?: Date;

  /**
   * Gyors műveletek.
   */
  actions: AssistantAction[];
};
import { TaskStatus, TaskType } from "./task";

export type CalendarView =
  | "month"
  | "week"
  | "day"
  | "agenda";

export type CalendarEvent = {
  /**
   * Esemény azonosító.
   */
  id: string;

  /**
   * Esemény címe.
   */
  title: string;

  /**
   * Feladat típusa.
   */
  type: TaskType;

  /**
   * Kezdés időpontja.
   */
  start_at: string | null;

  /**
   * Befejezés időpontja.
   */
  end_at: string | null;

  /**
   * Állapot.
   */
  status: TaskStatus;

  /**
   * Kapcsolódó ügy.
   */
  case_id?: string | null;
  case_title?: string | null;

  /**
   * Kapcsolódó ügyfél.
   */
  client_id?: string | null;
  client_name?: string | null;
  client_phone?: string | null;
  client_email?: string | null;

  /**
   * Kapcsolódó ingatlan.
   */
  property_id?: string | null;
  property_title?: string | null;

  /**
   * Leírás.
   */
  description?: string | null;

  /**
   * Találkozó helye.
   */
  location?: string | null;

  /**
   * Google Maps cím.
   */
  address?: string | null;

  /**
   * Esemény színe.
   */
  color?: string | null;
};
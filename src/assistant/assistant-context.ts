import type {
  CalendarEvent,
} from "@/types/calendar";

import type {
  Case,
} from "@/types/case";

import type {
  Task,
} from "@/types/task";

/**
 * Assistant Engine bemeneti adatai.
 *
 * Minden Assistant Rule ugyanebből
 * a contextből dolgozik.
 */
export type AssistantContext = {
  /**
   * Aktuális idő.
   */
  now: Date;

  /**
   * Mai naptári események.
   */
  events: CalendarEvent[];

  /**
   * Nyitott feladatok.
   */
  tasks: Task[];

  /**
   * Aktív ügyek.
   */
  cases: Case[];
};
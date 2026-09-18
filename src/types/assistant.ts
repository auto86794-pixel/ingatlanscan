import type { CalendarEvent } from "./calendar";

export type AssistantItemType =
  | "action"
  | "call"
  | "meeting"
  | "warning"
  | "suggestion"
  | "info";

export type AssistantPriority =
  | "urgent"
  | "high"
  | "normal"
  | "low";

export type AssistantSource =
  | "calendar"
  | "task"
  | "case"
  | "contact"
  | "system"
  | "ai";

export type AssistantAction = {
  /**
   * Egyedi azonosító.
   */
  id: string;

  /**
   * Gomb felirata.
   */
  label: string;

  /**
   * Emoji vagy ikon neve.
   */
  icon?: string;

  /**
   * Belső navigáció.
   */
  href?: string;

  /**
   * Külső hivatkozás.
   * (tel:, mailto:, Google Maps stb.)
   */
  external?: string;

  /**
   * Elsődleges művelet.
   */
  primary?: boolean;

  /**
   * Letiltott állapot.
   */
  disabled?: boolean;
};

export type AssistantItem = {
  /**
   * Egyedi azonosító.
   */
  id: string;

  /**
   * Kártya típusa.
   */
  type: AssistantItemType;

  /**
   * Prioritás.
   */
  priority: AssistantPriority;

  /**
   * Adat forrása.
   */
  source: AssistantSource;

  /**
   * Fő cím.
   */
  title: string;

  /**
   * Rövid összefoglaló.
   */
  subtitle: string;

  /**
   * Miért jelent meg ez a javaslat?
   */
  reason: string;

  /**
   * Esedékesség.
   */
  dueAt: Date;

  /**
   * Kártya ikonja.
   */
  icon?: string;

  /**
   * Szín kiemelés.
   */
  color?: string;

  /**
   * Kapcsolódó naptári esemény.
   */
  event?: CalendarEvent;

  /**
   * Gyors műveletek.
   */
  actions: AssistantAction[];

  /**
   * Már végrehajtva.
   */
  completed?: boolean;

  /**
   * Elrejthető.
   */
  dismissible?: boolean;

  /**
   * AI által számolt prioritási pontszám.
   * Minél magasabb, annál előrébb kerül a listában.
   */
  score?: number;

  /**
   * A mai nap elsőként ajánlott teendője.
   */
  recommended?: boolean;

  /**
   * Becsült végrehajtási idő percben.
   */
  estimatedMinutes?: number;

  /**
   * Kapcsolódó ügy azonosító.
   */
  caseId?: string;

  /**
   * Kapcsolódó ügyfél azonosító.
   */
  clientId?: string;

  /**
   * Kapcsolódó ingatlan azonosító.
   */
  propertyId?: string;
};
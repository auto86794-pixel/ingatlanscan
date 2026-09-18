import type {
  AssistantRule,
} from "./rules/rule";

import {
  CaseHealthRule,
} from "./rules/case-health-rule";

import {
  DailySummaryRule,
} from "./rules/daily-summary-rule";

import {
  FollowUpRule,
} from "./rules/follow-up-rule";

import {
  MeetingRule,
} from "./rules/meeting-rule";

import {
  TodayTaskRule,
} from "./rules/today-task-rule";

/**
 * Assistant Rule Registry.
 *
 * Az Assistant Engine kizárólag
 * az itt regisztrált szabályokat futtatja.
 *
 * Új szabály hozzáadásához
 * elegendő itt felvenni.
 */
export const assistantRules: AssistantRule[] = [
  /**
   * Dashboard napi AI összefoglaló.
   */
  new DailySummaryRule(),

  /**
   * Közelgő és aktuális
   * találkozók kezelése.
   */
  new MeetingRule(),

  /**
   * Ma esedékes feladatok.
   */
  new TodayTaskRule(),

  /**
   * Nyitott visszahívási
   * feladatok kezelése.
   */
  new FollowUpRule(),

  /**
   * Figyelmet igénylő ügyek.
   */
  new CaseHealthRule(),

  /**
   * Következő szabályok:
   *
   * new OverdueTaskRule(),
   * new OfferRule(),
   */
];
import type {
  AssistantItem,
} from "@/types/assistant";

import type {
  AssistantContext,
} from "./assistant-context";

import type {
  AssistantRule,
} from "./rules/rule";

const PRIORITY_ORDER = {
  urgent: 0,
  high: 1,
  normal: 2,
  low: 3,
} as const;

/**
 * Assistant Engine.
 *
 * Feladata:
 *
 * - összes szabály futtatása
 * - duplikációk eltávolítása
 * - prioritás szerinti rendezés
 * - idő szerinti rendezés
 * - elkészült elemek kiszűrése
 */
export function runAssistant(
  context: AssistantContext,
  rules: AssistantRule[]
): AssistantItem[] {
  const items: AssistantItem[] = [];

  for (const rule of rules) {
    items.push(
      ...rule.execute(context)
    );
  }

  return removeCompleted(
    removeDuplicates(items)
  ).sort(compareItems);
}

/**
 * Már elvégzett elemek
 * kiszűrése.
 */
function removeCompleted(
  items: AssistantItem[]
): AssistantItem[] {
  return items.filter(
    (item) => !item.completed
  );
}

/**
 * Duplikált Assistant elemek
 * eltávolítása.
 */
function removeDuplicates(
  items: AssistantItem[]
): AssistantItem[] {
  const map = new Map<
    string,
    AssistantItem
  >();

  for (const item of items) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }

  return [...map.values()];
}

/**
 * Rendezés.
 *
 * 1. Prioritás
 * 2. Esedékesség
 */
function compareItems(
  first: AssistantItem,
  second: AssistantItem
): number {
  const priorityCompare =
    PRIORITY_ORDER[first.priority] -
    PRIORITY_ORDER[second.priority];

  if (priorityCompare !== 0) {
    return priorityCompare;
  }

  return (
    first.dueAt.getTime() -
    second.dueAt.getTime()
  );
}
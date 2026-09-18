import type {
  AssistantItem,
} from "@/types/assistant";

/**
 * Dashboard fókusz elem.
 *
 * A HomeFlow "Next Best Action"
 * kiválasztása.
 */
export function getFocusItem(
  items: AssistantItem[]
): AssistantItem | null {
  if (!items.length) {
    return null;
  }

  // 1.
  // Sürgős meeting
  const urgentMeeting =
    items.find(
      (item) =>
        item.type === "meeting" &&
        item.priority === "urgent"
    );

  if (urgentMeeting) {
    return urgentMeeting;
  }

  // 2.
  // Egyéb sürgős elem
  const urgent =
    items.find(
      (item) =>
        item.priority === "urgent"
    );

  if (urgent) {
    return urgent;
  }

  // 3.
  // Magas prioritás
  const high =
    items.find(
      (item) =>
        item.priority === "high"
    );

  if (high) {
    return high;
  }

  // 4.
  // Normál prioritás
  const normal =
    items.find(
      (item) =>
        item.priority === "normal"
    );

  if (normal) {
    return normal;
  }

  // 5.
  // Utolsó lehetőség
  return items[0];
}
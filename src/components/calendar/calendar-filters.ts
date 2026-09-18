import type { CalendarEvent } from "@/types/calendar";

export type EventIndex = Map<
  string,
  CalendarEvent[]
>;

function getDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Eseményindex építése.
 */
export function buildEventIndex(
  events: CalendarEvent[]
): EventIndex {
  const index: EventIndex = new Map();

  for (const event of events) {
    if (!event.start_at) {
      continue;
    }

    const key = getDateKey(
      new Date(event.start_at)
    );

    const items = index.get(key);

    if (items) {
      items.push(event);
    } else {
      index.set(key, [event]);
    }
  }

  return index;
}

/**
 * Aktuális hónap eseményei.
 */
export function getMonthEvents(
  events: CalendarEvent[],
  currentDate: Date
): CalendarEvent[] {
  return events.filter((event) => {
    if (!event.start_at) {
      return false;
    }

    const date = new Date(event.start_at);

    return (
      date.getFullYear() ===
        currentDate.getFullYear() &&
      date.getMonth() ===
        currentDate.getMonth()
    );
  });
}

/**
 * Aktuális hét eseményei.
 */
export function getWeekEvents(
  events: CalendarEvent[],
  weekDays: Date[]
): CalendarEvent[] {
  const keys = new Set(
    weekDays.map(getDateKey)
  );

  return events.filter((event) => {
    if (!event.start_at) {
      return false;
    }

    return keys.has(
      getDateKey(
        new Date(event.start_at)
      )
    );
  });
}

/**
 * Egy nap eseményei.
 */
export function getDayEvents(
  eventIndex: EventIndex,
  date: Date
): CalendarEvent[] {
  return (
    eventIndex.get(
      getDateKey(date)
    ) ?? []
  );
}

/**
 * Egy adott nap adott órájának eseményei.
 */
export function getHourEvents(
  eventIndex: EventIndex,
  date: Date,
  hour: number
): CalendarEvent[] {
  return getDayEvents(
    eventIndex,
    date
  )
    .filter((event) => {
      if (!event.start_at) {
        return false;
      }

      return (
        new Date(
          event.start_at
        ).getHours() === hour
      );
    })
    .sort((a, b) => {
      return (
        new Date(
          a.start_at!
        ).getTime() -
        new Date(
          b.start_at!
        ).getTime()
      );
    });
}
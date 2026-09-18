import type { CalendarEvent } from "@/types/calendar";

const HOUR_HEIGHT = 64;
const MIN_EVENT_HEIGHT = 56;
const DAY_START_HOUR = 8;

export type PositionedEvent = {
  event: CalendarEvent;
  top: number;
  height: number;
  column: number;
  columns: number;
};

/**
 * Egy óra magassága pixelben.
 */
export function getHourHeight() {
  return HOUR_HEIGHT;
}

/**
 * Minimum eseménymagasság.
 */
export function getMinimumEventHeight() {
  return MIN_EVENT_HEIGHT;
}

/**
 * Esemény időtartama percben.
 */
export function getEventDurationMinutes(
  event: CalendarEvent
) {
  if (!event.start_at || !event.end_at) {
    return 60;
  }

  const start = new Date(event.start_at);
  const end = new Date(event.end_at);

  return Math.max(
    1,
    Math.round(
      (end.getTime() - start.getTime()) /
        60000
    )
  );
}

/**
 * Esemény magassága pixelben.
 */
export function getEventHeight(
  event: CalendarEvent
) {
  const minutes =
    getEventDurationMinutes(event);

  return Math.max(
    MIN_EVENT_HEIGHT,
    (minutes / 60) * HOUR_HEIGHT
  );
}

/**
 * Esemény felső pozíciója.
 */
export function getEventTop(
  event: CalendarEvent
) {
  if (!event.start_at) {
    return 0;
  }

  const start = new Date(event.start_at);

  const hour =
    start.getHours() - DAY_START_HOUR;

  const minutes = start.getMinutes();

  return (
    hour * HOUR_HEIGHT +
    (minutes / 60) * HOUR_HEIGHT
  );
}

/**
 * Heti események elrendezése.
 *
 * Jelenleg minden esemény teljes szélességet kap.
 * A későbbi verziókban itt kezeljük majd
 * az átfedéseket és az oszlopokat.
 */
export function layoutWeekEvents(
  events: CalendarEvent[]
): PositionedEvent[] {
  return events
    .slice()
    .sort((a, b) => {
      if (!a.start_at || !b.start_at) {
        return 0;
      }

      return (
        new Date(a.start_at).getTime() -
        new Date(b.start_at).getTime()
      );
    })
    .map((event) => ({
      event,
      top: getEventTop(event),
      height: getEventHeight(event),
      column: 0,
      columns: 1,
    }));
}
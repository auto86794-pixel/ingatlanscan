import type { CalendarEvent } from "@/types/calendar";

export type CollisionLayout = {
  event: CalendarEvent;
  column: number;
  columnCount: number;
  left: number;
  width: number;
};

type TimedEvent = {
  event: CalendarEvent;
  start: number;
  end: number;
};

const DEFAULT_EVENT_DURATION_MINUTES = 60;

/**
 * Az eseményt biztonságosan időintervallummá alakítja.
 *
 * Ha nincs end_at érték, az esemény alapértelmezetten
 * 60 percesnek számít.
 */
function toTimedEvent(
  event: CalendarEvent
): TimedEvent | null {
  if (!event.start_at) {
    return null;
  }

  const startDate = new Date(event.start_at);

  if (Number.isNaN(startDate.getTime())) {
    return null;
  }

  const start = startDate.getTime();

  let end =
    start +
    DEFAULT_EVENT_DURATION_MINUTES *
      60 *
      1000;

  if (event.end_at) {
    const endDate = new Date(event.end_at);

    if (
      !Number.isNaN(endDate.getTime()) &&
      endDate.getTime() > start
    ) {
      end = endDate.getTime();
    }
  }

  return {
    event,
    start,
    end,
  };
}

/**
 * Megvizsgálja, hogy két esemény
 * időben átfedi-e egymást.
 */
export function eventsOverlap(
  first: CalendarEvent,
  second: CalendarEvent
): boolean {
  const firstTimed =
    toTimedEvent(first);

  const secondTimed =
    toTimedEvent(second);

  if (!firstTimed || !secondTimed) {
    return false;
  }

  return (
    firstTimed.start < secondTimed.end &&
    secondTimed.start < firstTimed.end
  );
}

/**
 * Megkeresi egy esemény összes
 * közvetlen időbeli ütközését.
 */
export function getOverlappingEvents(
  event: CalendarEvent,
  events: CalendarEvent[]
): CalendarEvent[] {
  return events.filter(
    (candidate) =>
      candidate.id !== event.id &&
      eventsOverlap(event, candidate)
  );
}

/**
 * Egy összefüggő ütközési csoporton belül
 * kiosztja az események oszlopait.
 */
function layoutCollisionGroup(
  group: TimedEvent[]
): CollisionLayout[] {
  const active: Array<{
    end: number;
    column: number;
  }> = [];

  const assigned: Array<{
    timedEvent: TimedEvent;
    column: number;
  }> = [];

  let maximumColumnCount = 1;

  for (const timedEvent of group) {
    for (
      let index = active.length - 1;
      index >= 0;
      index -= 1
    ) {
      if (
        active[index].end <=
        timedEvent.start
      ) {
        active.splice(index, 1);
      }
    }

    const usedColumns = new Set(
      active.map((item) => item.column)
    );

    let column = 0;

    while (usedColumns.has(column)) {
      column += 1;
    }

    active.push({
      end: timedEvent.end,
      column,
    });

    assigned.push({
      timedEvent,
      column,
    });

    maximumColumnCount = Math.max(
      maximumColumnCount,
      active.length,
      column + 1
    );
  }

  return assigned.map(
    ({ timedEvent, column }) => {
      const width =
        100 / maximumColumnCount;

      return {
        event: timedEvent.event,
        column,
        columnCount:
          maximumColumnCount,
        left: column * width,
        width,
      };
    }
  );
}

/**
 * Az eseményeket ütközési csoportokra bontja,
 * majd kiszámolja a left és width értékeket.
 *
 * Az eredmény százalékos értékeket tartalmaz,
 * amelyeket egyetlen nap oszlopán belül kell használni.
 */
export function layoutOverlappingEvents(
  events: CalendarEvent[]
): CollisionLayout[] {
  const timedEvents = events
    .map(toTimedEvent)
    .filter(
      (
        item
      ): item is TimedEvent =>
        item !== null
    )
    .sort((first, second) => {
      if (first.start !== second.start) {
        return first.start - second.start;
      }

      return first.end - second.end;
    });

  if (timedEvents.length === 0) {
    return [];
  }

  const groups: TimedEvent[][] = [];

  let currentGroup: TimedEvent[] = [];
  let currentGroupEnd = 0;

  for (const timedEvent of timedEvents) {
    if (
      currentGroup.length === 0 ||
      timedEvent.start < currentGroupEnd
    ) {
      currentGroup.push(timedEvent);

      currentGroupEnd = Math.max(
        currentGroupEnd,
        timedEvent.end
      );

      continue;
    }

    groups.push(currentGroup);

    currentGroup = [timedEvent];
    currentGroupEnd = timedEvent.end;
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups.flatMap(
    layoutCollisionGroup
  );
}
import {
  calendarRepository,
} from "@/lib/repositories/calendar-repository";

import type {
  CalendarEvent,
} from "@/types/calendar";

/**
 * Egy dátum helyi napjának kezdete.
 */
function startOfDay(
  date: Date
): Date {
  const result =
    new Date(date);

  result.setHours(
    0,
    0,
    0,
    0
  );

  return result;
}

/**
 * Egy dátum helyi napjának vége.
 */
function endOfDay(
  date: Date
): Date {
  const result =
    new Date(date);

  result.setHours(
    23,
    59,
    59,
    999
  );

  return result;
}

/**
 * Összes naptári esemény.
 */
export async function getCalendarEvents(): Promise<
  CalendarEvent[]
> {
  return calendarRepository.getCalendarEvents();
}

/**
 * Mai események.
 */
export async function getTodayEvents(): Promise<
  CalendarEvent[]
> {
  const now = new Date();

  return calendarRepository.getCalendarEvents({
    start: startOfDay(
      now
    ).toISOString(),

    end: endOfDay(
      now
    ).toISOString(),
  });
}

/**
 * Holnapi események.
 */
export async function getTomorrowEvents(): Promise<
  CalendarEvent[]
> {
  const tomorrow =
    new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  return calendarRepository.getCalendarEvents({
    start: startOfDay(
      tomorrow
    ).toISOString(),

    end: endOfDay(
      tomorrow
    ).toISOString(),
  });
}

/**
 * Következő 7 nap.
 */
export async function getUpcomingEvents(): Promise<
  CalendarEvent[]
> {
  const start =
    new Date();

  const end =
    new Date();

  end.setDate(
    end.getDate() + 7
  );

  return calendarRepository.getCalendarEvents({
    start:
      start.toISOString(),

    end:
      end.toISOString(),
  });
}

/**
 * Időintervallum.
 */
export async function getEventsBetween(
  start: string,
  end: string
): Promise<
  CalendarEvent[]
> {
  const startDate =
    new Date(start);

  const endDate =
    new Date(end);

  if (
    Number.isNaN(
      startDate.getTime()
    ) ||
    Number.isNaN(
      endDate.getTime()
    )
  ) {
    throw new Error(
      "Érvénytelen dátum."
    );
  }

  if (
    endDate < startDate
  ) {
    throw new Error(
      "A záró dátum nem lehet korábbi."
    );
  }

  return calendarRepository.getCalendarEvents({
    start:
      startDate.toISOString(),

    end:
      endDate.toISOString(),
  });
}
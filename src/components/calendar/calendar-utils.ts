export const WEEK_DAYS = [
  "H",
  "K",
  "Sze",
  "Cs",
  "P",
  "Szo",
  "V",
];

export const MONTH_NAMES = [
  "Január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];

export function monthName(date: Date) {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function isSameDay(
  a: Date,
  b: Date
) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(date: Date) {
  return isSameDay(
    date,
    new Date()
  );
}

export function isCurrentMonth(
  date: Date,
  current: Date
) {
  return (
    date.getMonth() === current.getMonth() &&
    date.getFullYear() ===
      current.getFullYear()
  );
}

export function nextMonth(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  );
}

export function previousMonth(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    1
  );
}

export function getMonthGrid(
  current: Date
) {
  const first = new Date(
    current.getFullYear(),
    current.getMonth(),
    1
  );

  const start = new Date(first);

  const day = first.getDay();

  start.setDate(
    first.getDate() -
      (day === 0 ? 6 : day - 1)
  );

  return Array.from(
    { length: 42 },
    (_, index) => {
      const date = new Date(start);

      date.setDate(
        start.getDate() + index
      );

      return date;
    }
  );
}

/**
 * Az aktuális hét napjai
 * (hétfőtől vasárnapig).
 */
export function getWeekDays(
  current: Date
) {
  const monday = new Date(current);

  const day = monday.getDay();

  monday.setDate(
    monday.getDate() -
      (day === 0 ? 6 : day - 1)
  );

  monday.setHours(0, 0, 0, 0);

  return Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date(monday);

      date.setDate(
        monday.getDate() + index
      );

      return date;
    }
  );
}

/**
 * A heti nézet órái.
 * (08:00–20:00)
 */
export function getHours() {
  return Array.from(
    { length: 13 },
    (_, index) => index + 8
  );
}

/**
 * Óra formázása.
 * 8 -> 08:00
 */
export function formatHour(
  hour: number
) {
  return `${String(hour).padStart(
    2,
    "0"
  )}:00`;
}
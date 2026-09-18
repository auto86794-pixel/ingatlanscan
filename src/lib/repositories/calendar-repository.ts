import { supabase } from "@/lib/supabase";

import type {
  CalendarEvent,
} from "@/types/calendar";

import type {
  TaskStatus,
  TaskType,
} from "@/types/task";

type GetCalendarEventsOptions = {
  start?: string;
  end?: string;
};

type ClientRelation = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
};

type PropertyRelation = {
  id: string;
  title: string | null;
  address: string | null;
  city: string | null;
};

type CaseRelation = {
  id: string;
  title: string | null;

  client:
    | ClientRelation
    | ClientRelation[]
    | null;

  property:
    | PropertyRelation
    | PropertyRelation[]
    | null;
};

type CalendarEventRow = {
  id: string;
  title: string;
  type: TaskType;
  start_at: string | null;
  end_at: string | null;
  status: TaskStatus;
  case_id: string | null;
  description: string | null;
  location: string | null;
  color: string | null;

  case:
    | CaseRelation
    | CaseRelation[]
    | null;
};

function getSingleRelation<T>(
  value: T | T[] | null | undefined
): T | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

function getClientName(
  client: ClientRelation | null
): string | null {
  if (!client) {
    return null;
  }

  const name = [
    client.first_name,
    client.last_name,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || null;
}

function getPropertyAddress(
  property: PropertyRelation | null
): string | null {
  if (!property) {
    return null;
  }

  const address = [
    property.city,
    property.address,
  ]
    .filter(Boolean)
    .join(", ")
    .trim();

  return address || null;
}

function mapCalendarEvent(
  row: CalendarEventRow
): CalendarEvent {
  const caseItem =
    getSingleRelation(row.case);

  const client =
    getSingleRelation(
      caseItem?.client
    );

  const property =
    getSingleRelation(
      caseItem?.property
    );

  return {
    id: row.id,
    title: row.title,
    type: row.type,
    start_at: row.start_at,
    end_at: row.end_at,
    status: row.status,

    case_id: row.case_id,
    case_title:
      caseItem?.title ?? null,

    client_id:
      client?.id ?? null,
    client_name:
      getClientName(client),
    client_phone:
      client?.phone ?? null,
    client_email:
      client?.email ?? null,

    property_id:
      property?.id ?? null,
    property_title:
      property?.title ?? null,

    description:
      row.description,
    location:
      row.location,
    address:
      getPropertyAddress(
        property
      ),
    color:
      row.color,
  };
}

/**
 * Calendar Repository.
 */
export class CalendarRepository {
  async getCalendarEvents(
    options: GetCalendarEventsOptions = {}
  ): Promise<CalendarEvent[]> {
    let query =
      supabase
        .from("tasks")
        .select(
          `
          id,
          title,
          type,
          start_at,
          end_at,
          status,
          case_id,
          description,
          location,
          color,

          case:cases!tasks_case_id_fkey(
            id,
            title,

            client:clients!cases_client_id_fkey(
              id,
              first_name,
              last_name,
              phone,
              email
            ),

            property:properties!cases_property_id_fkey(
              id,
              title,
              address,
              city
            )
          )
        `
        )
        .not(
          "start_at",
          "is",
          null
        )
        .order(
          "start_at",
          {
            ascending: true,
          }
        );

    if (options.start) {
      query = query.gte(
        "start_at",
        options.start
      );
    }

    if (options.end) {
      query = query.lte(
        "start_at",
        options.end
      );
    }

    const {
      data,
      error,
    } = await query;

    if (error) {
      console.error(
        "CalendarRepository.getCalendarEvents:",
        error
      );

      throw error;
    }

    const rows =
      (data ??
        []) as CalendarEventRow[];

    return rows.map(
      mapCalendarEvent
    );
  }
}

export const calendarRepository =
  new CalendarRepository();
import { supabase } from "@/lib/supabase";

import type {
  TimelineItem,
  TimelineItemType,
} from "@/types/timeline";

type TimelineRow = {
  id: string;

  case_id: string;

  title: string;

  description: string | null;

  type: string | null;

  created_at: string;
};

type CreateTimelineEventInput = {
  caseId: string;

  type: TimelineItemType;

  title: string;

  description?: string | null;
};

export class TimelineRepository {
  /**
   * Ügy idővonalának lekérése.
   */
  async getCaseTimeline(
    caseId: string
  ): Promise<TimelineItem[]> {
    const { data, error } =
      await supabase
        .from("timeline_events")
        .select(`
          id,
          case_id,
          title,
          description,
          type,
          created_at
        `)
        .eq("case_id", caseId)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    const rows =
      (data ?? []) as TimelineRow[];

    return rows.map((row) => ({
      id: row.id,

      case_id: row.case_id,

      title: row.title,

      description: row.description,

      created_at: row.created_at,

      type: normalizeType(
        row.type
      ),

      icon: getIcon(
        row.type
      ),
    }));
  }

  /**
   * Legutóbbi aktivitások.
   */
  async getRecent(
    limit = 10
  ): Promise<TimelineItem[]> {
    const { data, error } =
      await supabase
        .from("timeline_events")
        .select(`
          id,
          case_id,
          title,
          description,
          type,
          created_at
        `)
        .order("created_at", {
          ascending: false,
        })
        .limit(limit);

    if (error) {
      throw error;
    }

    const rows =
      (data ?? []) as TimelineRow[];

    return rows.map((row) => ({
      id: row.id,

      case_id: row.case_id,

      title: row.title,

      description: row.description,

      created_at: row.created_at,

      type: normalizeType(
        row.type
      ),

      icon: getIcon(
        row.type
      ),
    }));
  }

  /**
   * Új idővonal esemény létrehozása.
   */
  async createTimelineEvent(
    input: CreateTimelineEventInput
  ): Promise<void> {
    const { error } =
      await supabase
        .from("timeline_events")
        .insert({
          case_id: input.caseId,

          type: input.type,

          title: input.title,

          description:
            input.description ?? null,
        });

    if (error) {
      throw error;
    }
  }
}

function normalizeType(
  type: string | null
): TimelineItemType {
  switch (type) {
    case "client_created":
    case "client_updated":

    case "case_created":
    case "case_updated":
    case "case_closed":

    case "offer_created":
    case "offer_sent":
    case "offer_accepted":
    case "offer_rejected":
    case "offer_expired":

    case "task_created":
    case "task_completed":

    case "meeting_created":
    case "meeting_completed":

    case "note_created":

    case "system":
      return type;

    default:
      return "system";
  }
}

function getIcon(
  type: string | null
): string {
  switch (type) {
    case "client_created":
    case "client_updated":
      return "👤";

    case "case_created":
    case "case_updated":
    case "case_closed":
      return "📁";

    case "offer_created":
    case "offer_sent":
    case "offer_accepted":
    case "offer_rejected":
    case "offer_expired":
      return "📄";

    case "task_created":
    case "task_completed":
      return "✅";

    case "meeting_created":
    case "meeting_completed":
      return "🤝";

    case "note_created":
      return "📝";

    default:
      return "📌";
  }
}

/**
 * Singleton.
 */
export const timelineRepository =
  new TimelineRepository();
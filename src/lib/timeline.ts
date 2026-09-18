import { supabase } from "@/lib/supabase";

import {
  CreateTimelineEventInput,
  TimelineEvent,
} from "@/types/timeline-event";

/**
 * Új timeline esemény létrehozása.
 */
export async function createTimelineEvent(
  input: CreateTimelineEventInput
): Promise<TimelineEvent> {
  const { data, error } = await supabase
    .from("timeline_events")
    .insert({
      case_id: input.case_id ?? null,
      client_id: input.client_id ?? null,
      property_id: input.property_id ?? null,
      offer_id: input.offer_id ?? null,
      task_id: input.task_id ?? null,

      type: input.type,
      title: input.title,
      description: input.description ?? null,

      created_by: input.created_by ?? null,

      metadata: input.metadata ?? {},
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Ügy timeline.
 */
export async function getCaseTimeline(
  caseId: string
): Promise<TimelineEvent[]> {
  const { data, error } = await supabase
    .from("timeline_events")
    .select("*")
    .eq("case_id", caseId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

/**
 * Ügyfél timeline.
 */
export async function getClientTimeline(
  clientId: string
): Promise<TimelineEvent[]> {
  const { data, error } = await supabase
    .from("timeline_events")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

/**
 * Dashboard legutóbbi eseményei.
 */
export async function getRecentTimeline(
  limit = 20
): Promise<TimelineEvent[]> {
  const { data, error } = await supabase
    .from("timeline_events")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}
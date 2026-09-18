import { supabase } from "@/lib/supabase";

import type {
  FollowUp,
} from "@/types/follow-up";

/**
 * Follow-up Repository.
 */
export class FollowUpRepository {
  /**
   * Ügy follow-up feladatainak lekérése.
   */
  async getByCase(
    caseId: string
  ): Promise<FollowUp[]> {
    const { data, error } =
      await supabase
        .from("follow_ups")
        .select("*")
        .eq("case_id", caseId)
        .order("due_at", {
          ascending: true,
        });

    if (error) {
      throw error;
    }

    return (data ?? []) as FollowUp[];
  }

  /**
   * Összes nyitott follow-up.
   *
   * Assistant és Dashboard
   * használja.
   */
  async getOpen(): Promise<
    FollowUp[]
  > {
    const { data, error } =
      await supabase
        .from("follow_ups")
        .select("*")
        .eq("completed", false)
        .order("due_at", {
          ascending: true,
        });

    if (error) {
      throw error;
    }

    return (data ??
      []) as FollowUp[];
  }

  /**
   * Nyitott follow-upok száma.
   */
  async getOpenCount(): Promise<number> {
    const {
      count,
      error,
    } = await supabase
      .from("follow_ups")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("completed", false);

    if (error) {
      throw error;
    }

    return count ?? 0;
  }

  /**
   * Új follow-up létrehozása.
   */
  async create(
    followUp: Omit<
      FollowUp,
      "id" | "created_at"
    >
  ): Promise<FollowUp> {
    const { data, error } =
      await supabase
        .from("follow_ups")
        .insert(followUp)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as FollowUp;
  }
}

/**
 * Singleton.
 */
export const followUpRepository =
  new FollowUpRepository();
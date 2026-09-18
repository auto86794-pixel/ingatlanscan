import { supabase } from "@/lib/supabase";

import type {
  Case,
  CaseWithClient,
  CreateCaseInput,
  UpdateCaseInput,
} from "@/types/case";

export type CaseFilters = {
  search?: string;
  status?: string;
  priority?: string;
};

export class CaseRepository {
  /**
   * Összes ügy.
   */
  async getAll(
    filters?: CaseFilters
  ): Promise<CaseWithClient[]> {
    let query = supabase
      .from("cases")
      .select(`
        *,
        clients(*),
        properties(*)
      `);

    if (filters?.search?.trim()) {
      query = query.or(
        [
          `title.ilike.%${filters.search}%`,
          `type.ilike.%${filters.search}%`,
        ].join(",")
      );
    }

    if (filters?.status) {
      query = query.eq(
        "status",
        filters.status
      );
    }

    if (filters?.priority) {
      query = query.eq(
        "priority",
        filters.priority
      );
    }

    const { data, error } =
      await query.order(
        "case_number",
        {
          ascending: false,
        }
      );

    if (error) {
      throw error;
    }

    return (data ?? []) as CaseWithClient[];
  }

  /**
   * Legutóbb létrehozott ügyek.
   */
  async getRecent(
    limit = 5
  ): Promise<CaseWithClient[]> {
    const { data, error } =
      await supabase
        .from("cases")
        .select(`
          *,
          clients(*),
          properties(*)
        `)
        .order("created_at", {
          ascending: false,
        })
        .limit(limit);

    if (error) {
      throw error;
    }

    return (data ?? []) as CaseWithClient[];
  }

  /**
   * Pipeline ügyek.
   */
  async getPipelineCases(): Promise<
    CaseWithClient[]
  > {
    const { data, error } =
      await supabase
        .from("cases")
        .select(`
          *,
          clients(*),
          properties(*)
        `)
        .order("pipeline_stage")
        .order("updated_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (data ?? []) as CaseWithClient[];
  }

  /**
   * Egy ügy kapcsolódó adatokkal.
   */
  async getById(
    id: string
  ): Promise<CaseWithClient | null> {
    const { data, error } =
      await supabase
        .from("cases")
        .select(`
          *,
          clients(*),
          properties(*)
        `)
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as CaseWithClient;
  }

  /**
   * Egy ügy kapcsolódó ügyféllel
   * és ingatlannal.
   */
  async getWithClient(
    id: string
  ): Promise<CaseWithClient | null> {
    return this.getById(id);
  }

  /**
   * Aktív ügyek száma.
   */
  async getCount(): Promise<number> {
    const {
      count,
      error,
    } = await supabase
      .from("cases")
      .select("*", {
        count: "exact",
        head: true,
      })
      .neq("status", "closed");

    if (error) {
      throw error;
    }

    return count ?? 0;
  }

  /**
   * Új ügy.
   */
  async create(
    input: CreateCaseInput
  ): Promise<Case> {
    const { data, error } =
      await supabase
        .from("cases")
        .insert(input)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Case;
  }

  /**
   * Ügy módosítása.
   */
  async update(
    id: string,
    input: UpdateCaseInput
  ): Promise<Case> {
    const { data, error } =
      await supabase
        .from("cases")
        .update(input)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Case;
  }

  /**
   * Pipeline állapot frissítése.
   */
  async updatePipelineStage(
    id: string,
    pipelineStage: string
  ): Promise<Case> {
    const { data, error } =
      await supabase
        .from("cases")
        .update({
          pipeline_stage: pipelineStage,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Case;
  }

  /**
   * Ügy törlése.
   */
  async delete(
    id: string
  ): Promise<void> {
    const { error } =
      await supabase
        .from("cases")
        .delete()
        .eq("id", id);

    if (error) {
      throw error;
    }
  }
}

/**
 * Singleton.
 */
export const caseRepository =
  new CaseRepository();
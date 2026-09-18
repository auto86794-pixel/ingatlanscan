import { supabase } from "@/lib/supabase";

import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "@/types/task";

/**
 * Task Repository.
 *
 * A feladatok adatbázis műveletei.
 */
export class TaskRepository {
  /**
   * Összes feladat.
   */
  async getAll(): Promise<Task[]> {
    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .order("sort_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (data ?? []) as Task[];
  }

  /**
   * Adott ügy feladatai.
   */
  async getByCase(
    caseId: string
  ): Promise<Task[]> {
    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .eq("case_id", caseId)
        .order("status", {
          ascending: true,
        })
        .order("due_date", {
          ascending: true,
          nullsFirst: false,
        })
        .order("sort_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (data ?? []) as Task[];
  }

  /**
   * Legutóbbi feladatok.
   */
  async getRecent(
    limit = 5
  ): Promise<Task[]> {
    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(limit);

    if (error) {
      throw error;
    }

    return (data ?? []) as Task[];
  }

  /**
   * Egy feladat.
   */
  async getById(
    id: string
  ): Promise<Task | null> {
    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as Task;
  }

  /**
   * Nyitott feladatok száma.
   */
  async getOpenCount(): Promise<number> {
    const {
      count,
      error,
    } = await supabase
      .from("tasks")
      .select("*", {
        count: "exact",
        head: true,
      })
      .not(
        "status",
        "in",
        "(done,cancelled)"
      );

    if (error) {
      throw error;
    }

    return count ?? 0;
  }

  /**
   * Mai feladatok.
   */
  async getTodayTasks(): Promise<Task[]> {
    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .gte(
          "due_date",
          `${today}T00:00:00`
        )
        .lte(
          "due_date",
          `${today}T23:59:59`
        )
        .not(
          "status",
          "in",
          "(done,cancelled)"
        )
        .order("due_date", {
          ascending: true,
        });

    if (error) {
      throw error;
    }

    return (data ?? []) as Task[];
  }

  /**
   * Új feladat.
   */
  async create(
    input: CreateTaskInput
  ): Promise<Task> {
    const { data, error } =
      await supabase
        .from("tasks")
        .insert(input)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Task;
  }

  /**
   * Feladat módosítása.
   */
  async update(
    id: string,
    input: UpdateTaskInput
  ): Promise<Task> {
    const { data, error } =
      await supabase
        .from("tasks")
        .update(input)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Task;
  }

  /**
   * Feladat törlése.
   */
  async delete(
    id: string
  ): Promise<void> {
    const { error } =
      await supabase
        .from("tasks")
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
export const taskRepository =
  new TaskRepository();
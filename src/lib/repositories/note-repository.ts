import { supabase } from "@/lib/supabase";

import type {
  CreateNoteInput,
  Note,
  UpdateNoteInput,
} from "@/types/note";

/**
 * Note Repository.
 *
 * Kizárólag adatbázis műveletek.
 */
export class NoteRepository {
  /**
   * Egy ügy összes jegyzete.
   */
  async getByCase(
    caseId: string
  ): Promise<Note[]> {
    const { data, error } =
      await supabase
        .from("notes")
        .select("*")
        .eq("case_id", caseId)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (data ?? []) as Note[];
  }

  /**
   * Egy jegyzet lekérése.
   */
  async getById(
    id: string
  ): Promise<Note | null> {
    const { data, error } =
      await supabase
        .from("notes")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as Note;
  }

  /**
   * Jegyzet létrehozása.
   */
  async create(
    input: CreateNoteInput
  ): Promise<Note> {
    const { data, error } =
      await supabase
        .from("notes")
        .insert(input)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Note;
  }

  /**
   * Jegyzet módosítása.
   */
  async update(
    id: string,
    input: UpdateNoteInput
  ): Promise<Note> {
    const { data, error } =
      await supabase
        .from("notes")
        .update(input)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Note;
  }

  /**
   * Jegyzet törlése.
   */
  async delete(
    id: string
  ): Promise<void> {
    const { error } =
      await supabase
        .from("notes")
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
export const noteRepository =
  new NoteRepository();
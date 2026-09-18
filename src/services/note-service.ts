import {
  activityService,
} from "@/services/activity-service";

import {
  noteRepository,
} from "@/lib/repositories/note-repository";

import type {
  CreateNoteInput,
  Note,
  UpdateNoteInput,
} from "@/types/note";

/**
 * Note Service.
 *
 * A jegyzetek üzleti logikája.
 */
export class NoteService {
  /**
   * Egy ügy összes jegyzete.
   */
  async getCaseNotes(
    caseId: string
  ): Promise<Note[]> {
    return noteRepository.getByCase(
      caseId
    );
  }

  /**
   * Jegyzet lekérése.
   */
  async getNote(
    id: string
  ): Promise<Note | null> {
    return noteRepository.getById(id);
  }

  /**
   * Jegyzet létrehozása.
   */
  async createNote(
    input: CreateNoteInput
  ): Promise<Note> {
    const note =
      await noteRepository.create(
        input
      );

    await activityService.log({
  caseId: note.case_id,

  type: "note_created",

  title: "Új jegyzet",

  description:
    note.content.length > 80
      ? `${note.content.slice(0, 80)}...`
      : note.content,
});
    

    return note;
  }

  /**
   * Jegyzet módosítása.
   */
  async updateNote(
    id: string,
    input: UpdateNoteInput
  ): Promise<Note> {
    return noteRepository.update(
      id,
      input
    );
  }

  /**
   * Jegyzet törlése.
   */
  async deleteNote(
    id: string
  ): Promise<void> {
    await noteRepository.delete(id);
  }
}

/**
 * Singleton.
 */
export const noteService =
  new NoteService();
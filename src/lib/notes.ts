import { noteService } from "@/services/note-service";

import type {
  CreateNoteInput,
  Note,
  UpdateNoteInput,
} from "@/types/note";

/**
 * Egy ügy összes jegyzetének lekérése.
 */
export async function getCaseNotes(
  caseId: string
): Promise<Note[]> {
  return noteService.getCaseNotes(
    caseId
  );
}

/**
 * Egy jegyzet lekérése.
 */
export async function getNote(
  id: string
): Promise<Note | null> {
  return noteService.getNote(id);
}

/**
 * Jegyzet létrehozása.
 */
export async function createNote(
  input: CreateNoteInput
): Promise<Note> {
  return noteService.createNote(
    input
  );
}

/**
 * Jegyzet módosítása.
 */
export async function updateNote(
  id: string,
  input: UpdateNoteInput
): Promise<Note> {
  return noteService.updateNote(
    id,
    input
  );
}

/**
 * Jegyzet törlése.
 */
export async function deleteNote(
  id: string
): Promise<void> {
  return noteService.deleteNote(
    id
  );
}
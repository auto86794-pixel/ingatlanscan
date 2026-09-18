export type Note = {
  /**
   * Egyedi azonosító.
   */
  id: string;

  /**
   * Kapcsolódó ügy.
   */
  case_id: string;

  /**
   * Jegyzet szövege.
   */
  content: string;

  /**
   * Létrehozás ideje.
   */
  created_at: string | null;

  /**
   * Módosítás ideje.
   */
  updated_at: string | null;
};

export type CreateNoteInput = {
  /**
   * Kapcsolódó ügy.
   */
  case_id: string;

  /**
   * Jegyzet szövege.
   */
  content: string;
};

export type UpdateNoteInput = {
  /**
   * Jegyzet szövege.
   */
  content?: string;
};
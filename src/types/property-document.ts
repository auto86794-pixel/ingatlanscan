/**
 * Dokumentum típusok.
 */
export type PropertyDocumentType =
  | "title_deed"
  | "floor_plan"
  | "energy_certificate"
  | "agency_contract"
  | "authorization"
  | "other";

/**
 * Ingatlan dokumentum.
 */
export interface PropertyDocument {
  id: string;

  property_id: string;

  type: PropertyDocumentType;

  title: string;

  file_name: string;

  url: string;

  file_size: number | null;

  mime_type: string | null;

  created_by: string | null;

  updated_by: string | null;

  created_at: string;

  updated_at: string;
}

/**
 * Új dokumentum létrehozása.
 */
export interface CreatePropertyDocumentInput {
  property_id: string;

  type: PropertyDocumentType;

  title: string;

  file_name: string;

  url: string;

  file_size?: number;

  mime_type?: string;
}

/**
 * Dokumentum módosítása.
 */
export interface UpdatePropertyDocumentInput {
  type?: PropertyDocumentType;

  title?: string;

  file_name?: string;

  url?: string;

  file_size?: number;

  mime_type?: string;
}

/**
 * Dokumentum feltöltése.
 */
export interface UploadPropertyDocumentInput {
  property_id: string;

  type: PropertyDocumentType;

  title: string;

  file: File;
}
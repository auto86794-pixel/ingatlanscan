// src/types/property-image.ts

export interface PropertyImage {
  id: string;

  property_id: string;

  url: string;

  file_name: string | null;

  mime_type: string | null;

  file_size: number | null;

  width: number | null;

  height: number | null;

  is_cover: boolean;

  sort_order: number;

  alt_text: string | null;

  created_at: string | null;

  updated_at: string | null;
}

export interface CreatePropertyImageInput {
  property_id: string;

  url: string;

  file_name?: string | null;

  mime_type?: string | null;

  file_size?: number | null;

  width?: number | null;

  height?: number | null;

  is_cover?: boolean;

  sort_order?: number;

  alt_text?: string | null;
}

export interface UpdatePropertyImageInput {
  url?: string;

  file_name?: string | null;

  mime_type?: string | null;

  file_size?: number | null;

  width?: number | null;

  height?: number | null;

  is_cover?: boolean;

  sort_order?: number;

  alt_text?: string | null;
}
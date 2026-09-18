import type { Client } from "@/types/client";

/**
 * Ingatlan.
 */
export interface Property {
  id: string;

  /**
   * Belső referencia.
   */
  reference: string | null;

  /**
   * Ingatlan címe.
   */
  title: string;

  /**
   * Státusz.
   */
  status: string | null;

  /**
   * Ingatlan típusa.
   */
  property_type: string | null;

  /**
   * Város.
   */
  city: string | null;

  /**
   * Kerület.
   */
  district: string | null;

  /**
   * Irányítószám.
   */
  postal_code: string | null;

  /**
   * Pontos cím.
   */
  address: string | null;

  /**
   * Ár.
   */
  price: number | null;

  /**
   * Alapterület.
   */
  area: number | null;

  /**
   * Szobák száma.
   */
  rooms: number | null;

  /**
   * Emelet.
   */
  floor: string | null;

  /**
   * Állapot.
   */
  condition: string | null;

  /**
   * Fűtés.
   */
  heating: string | null;

  /**
   * Leírás.
   */
  description: string | null;

  /**
   * Tulajdonos.
   */
  owner_client_id: string | null;

  /**
   * Borítókép URL.
   */
  main_image_url: string | null;

  /**
   * Aktív.
   */
  is_active: boolean;

  /**
   * Létrehozás.
   */
  created_at: string | null;

  /**
   * Módosítás.
   */
  updated_at: string | null;
}

/**
 * Ingatlan tulajdonossal.
 */
export interface PropertyWithOwner extends Property {
  clients: Client | null;
}

/**
 * Új ingatlan.
 */
export interface CreatePropertyInput {
  reference?: string | null;

  title: string;

  status?: string | null;

  property_type?: string | null;

  city?: string | null;

  district?: string | null;

  postal_code?: string | null;

  address?: string | null;

  price?: number | null;

  area?: number | null;

  rooms?: number | null;

  floor?: string | null;

  condition?: string | null;

  heating?: string | null;

  description?: string | null;

  owner_client_id?: string | null;

  /**
   * Borítókép.
   */
  main_image_url?: string | null;

  is_active?: boolean;
}

/**
 * Ingatlan módosítása.
 */
export interface UpdatePropertyInput {
  reference?: string | null;

  title?: string;

  status?: string | null;

  property_type?: string | null;

  city?: string | null;

  district?: string | null;

  postal_code?: string | null;

  address?: string | null;

  price?: number | null;

  area?: number | null;

  rooms?: number | null;

  floor?: string | null;

  condition?: string | null;

  heating?: string | null;

  description?: string | null;

  owner_client_id?: string | null;

  /**
   * Borítókép.
   */
  main_image_url?: string | null;

  is_active?: boolean;
}
import type {
  CaseWithClient,
} from "@/types/case";

/**
 * Ajánlat státuszai.
 */
export type OfferStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired";

/**
 * Ajánlat.
 */
export interface Offer {
  id: string;

  case_id: string;

  version: number;

  status: OfferStatus;

  title: string;

  notes: string | null;

  valid_until: string | null;

  sent_at: string | null;

  accepted_at: string | null;

  rejected_at: string | null;

  created_at: string;

  updated_at: string;
}

/**
 * Ajánlat ügy adatokkal.
 */
export interface OfferWithCase
  extends Offer {
  /**
   * Kapcsolódó ügy.
   *
   * Az ügyfél és az ingatlan adatait is
   * tartalmazza.
   */
  case: CaseWithClient | null;
}

/**
 * Új ajánlat létrehozása.
 */
export interface CreateOfferInput {
  case_id: string;

  /**
   * Automatikusan kerül kitöltésre
   * az OfferService-ben.
   */
  version?: number;

  title: string;

  notes?: string | null;

  valid_until?: string | null;
}

/**
 * Ajánlat módosítása.
 */
export interface UpdateOfferInput {
  title?: string;

  notes?: string | null;

  status?: OfferStatus;

  valid_until?: string | null;

  sent_at?: string | null;

  accepted_at?: string | null;

  rejected_at?: string | null;
}
import type {
  OfferStatus,
} from "@/types/offer";

/**
 * Ajánlat listaelem.
 *
 * Kifejezetten az ajánlatlista
 * megjelenítéséhez használt típus.
 *
 * Nem adatbázis modell.
 */
export interface OfferListItem {
  /**
   * Ajánlat azonosító.
   */
  id: string;

  /**
   * Ajánlat címe.
   */
  title: string;

  /**
   * Ügyfél neve.
   */
  clientName: string;

  /**
   * Ingatlan neve.
   */
  propertyName: string;

  /**
   * Ajánlat összege.
   */
  amount: number;

  /**
   * Verzió.
   */
  version: number;

  /**
   * Állapot.
   */
  status: OfferStatus;

  /**
   * Lejárat.
   */
  expiresAt: string | null;
}
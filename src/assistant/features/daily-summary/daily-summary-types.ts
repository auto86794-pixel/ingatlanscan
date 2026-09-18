/**
 * Dashboard napi összefoglalója.
 *
 * Ez az objektum a napi állapotot írja le,
 * és több megjelenítő (Hero, Dashboard,
 * Widgetek stb.) is felhasználhatja.
 */
export type DailySummary = {
  /**
   * Köszönés.
   */
  greeting: string;

  /**
   * AI ajánlás.
   */
  recommendation: string;

  /**
   * Mai találkozók száma.
   */
  meetings: number;

  /**
   * Nyitott feladatok száma.
   */
  tasks: number;

  /**
   * Visszahívások száma.
   */
  followUps: number;

  /**
   * Lejárt feladatok száma.
   */
  overdue: number;
};
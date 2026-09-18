/**
 * Ügy egészségi állapota.
 */
export type CaseHealthStatus =
  | "healthy"
  | "warning"
  | "critical";

/**
 * Egy ügy kiértékelésének eredménye.
 */
export type CaseHealth = {
  /**
   * Ügy azonosító.
   */
  caseId: string;

  /**
   * 0–100 közötti pontszám.
   */
  score: number;

  /**
   * Egészségi állapot.
   */
  status: CaseHealthStatus;

  /**
   * Miért kapta ezt az állapotot?
   */
  reason: string;
};
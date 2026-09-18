import type { Client } from "@/types/client";
import type { Property } from "@/types/property";

export interface Case {
  id: string;

  case_number: number;

  title: string;

  type: string;

  status: string;

  /**
   * Pipeline állapot.
   */
  pipeline_stage: string;

  priority: string | null;

  description: string | null;

  assigned_to: string | null;

  client_id: string | null;

  property_id: string | null;

  opened_at: string | null;

  closed_at: string | null;

  created_at: string | null;

  updated_at: string | null;
}

export interface CaseWithClient
  extends Case {
  /**
   * Kapcsolódó ügyfél.
   */
  clients: Client | null;

  /**
   * Kapcsolódó ingatlan.
   */
  properties: Property | null;
}

export interface CreateCaseInput {
  title: string;

  type: string;

  /**
   * Pipeline állapot.
   * Alapértelmezés: new
   */
  pipeline_stage?: string;

  priority?: string | null;

  description?: string | null;

  assigned_to?: string | null;

  client_id?: string | null;

  property_id?: string | null;
}

export interface UpdateCaseInput {
  title?: string;

  type?: string;

  status?: string;

  /**
   * Pipeline állapot.
   */
  pipeline_stage?: string;

  priority?: string | null;

  description?: string | null;

  assigned_to?: string | null;

  client_id?: string | null;

  property_id?: string | null;
}
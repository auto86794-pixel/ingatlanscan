import type { Case } from "@/types/case";

export interface Client {
  id: string;

  first_name: string;
  last_name: string;

  email: string | null;
  phone: string | null;
  city: string | null;

  status: string | null;
  source: string | null;

  property_type: string | null;

  budget_min: number | null;
  budget_max: number | null;

  area_min: number | null;
  area_max: number | null;

  rooms_min: number | null;
  rooms_max: number | null;

  district: string | null;

  property_condition: string | null;

  notes: string | null;

  created_at: string | null;
  updated_at: string | null;
}

export interface ClientWithCases extends Client {
  cases: Pick<
    Case,
    | "id"
    | "case_number"
    | "title"
    | "type"
    | "status"
    | "priority"
  >[];
}

export interface CreateClientInput {
  first_name: string;
  last_name: string;

  email?: string;
  phone?: string;
  city?: string;

  status?: string;
  source?: string;

  property_type?: string;

  budget_min?: number;
  budget_max?: number;

  area_min?: number;
  area_max?: number;

  rooms_min?: number;
  rooms_max?: number;

  district?: string;

  property_condition?: string;

  notes?: string;
}

export interface UpdateClientInput {
  first_name?: string;
  last_name?: string;

  email?: string | null;
  phone?: string | null;
  city?: string | null;

  status?: string | null;
  source?: string | null;

  property_type?: string | null;

  budget_min?: number | null;
  budget_max?: number | null;

  area_min?: number | null;
  area_max?: number | null;

  rooms_min?: number | null;
  rooms_max?: number | null;

  district?: string | null;

  property_condition?: string | null;

  notes?: string | null;
}
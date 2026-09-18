import { supabase } from "@/lib/supabase";

import type {
  Client,
  ClientWithCases,
  CreateClientInput,
  UpdateClientInput,
} from "@/types/client";

export type ClientFilters = {
  search?: string;
  city?: string;
  status?: string;
};

/**
 * Client Repository.
 *
 * Az ügyfelek adatbázis műveletei.
 */
export class ClientRepository {
  /**
   * Összes ügyfél.
   */
  async getAll(
    filters?: ClientFilters
  ): Promise<Client[]> {
    let query = supabase
      .from("clients")
      .select("*");

    if (filters?.search) {
      query = query.or(
        [
          `first_name.ilike.%${filters.search}%`,
          `last_name.ilike.%${filters.search}%`,
          `email.ilike.%${filters.search}%`,
          `phone.ilike.%${filters.search}%`,
        ].join(",")
      );
    }

    if (filters?.city) {
      query = query.ilike(
        "city",
        `%${filters.city}%`
      );
    }

    if (filters?.status) {
      query = query.eq(
        "status",
        filters.status
      );
    }

    const { data, error } =
      await query.order("last_name", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return data as Client[];
  }

  /**
   * Egy ügyfél.
   */
  async getById(
    id: string
  ): Promise<Client> {
    const { data, error } =
      await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as Client;
  }

  /**
   * Ügyfél ügyekkel.
   */
  async getWithCases(
    id: string
  ): Promise<ClientWithCases> {
    const { data, error } =
      await supabase
        .from("clients")
        .select(`
          *,
          cases (
            id,
            case_number,
            title,
            type,
            status,
            priority
          )
        `)
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as ClientWithCases;
  }

  /**
   * Új ügyfél.
   */
  async create(
    input: CreateClientInput
  ): Promise<Client> {
    const { data, error } =
      await supabase
        .from("clients")
        .insert(input)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Client;
  }

  /**
   * Ügyfél módosítása.
   */
  async update(
    id: string,
    input: UpdateClientInput
  ): Promise<Client> {
    const { data, error } =
      await supabase
        .from("clients")
        .update(input)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Client;
  }

  /**
   * Ügyfél törlése.
   */
  async delete(
    id: string
  ): Promise<void> {
    const { error } =
      await supabase
        .from("clients")
        .delete()
        .eq("id", id);

    if (error) {
      throw error;
    }
  }
}

/**
 * Singleton.
 */
export const clientRepository =
  new ClientRepository();
import { supabase } from "@/lib/supabase";

import type {
  Property,
  PropertyWithOwner,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "@/types/property";

export type PropertyFilters = {
  search?: string;
  city?: string;
  status?: string;
};

export const propertyRepository = {
  async getAll(
    filters?: PropertyFilters
  ): Promise<Property[]> {
    let query = supabase
      .from("properties")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (filters?.search?.trim()) {
      query = query.or(
        `address.ilike.%${filters.search.trim()}%,reference.ilike.%${filters.search.trim()}%`
      );
    }

    if (filters?.city?.trim()) {
      query = query.ilike(
        "city",
        `%${filters.city.trim()}%`
      );
    }

    if (filters?.status) {
      query = query.eq(
        "status",
        filters.status
      );
    }

    const { data, error } =
      await query;

    if (error) {
      throw error;
    }

    return (data ?? []) as Property[];
  },

  async getById(
    id: string
  ): Promise<Property> {
    const { data, error } =
      await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as Property;
  },

  async getWithOwner(
    id: string
  ): Promise<PropertyWithOwner> {
    const { data, error } =
      await supabase
        .from("properties")
        .select(`
          *,
          clients(*)
        `)
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as PropertyWithOwner;
  },

  async create(
    property: CreatePropertyInput
  ): Promise<Property> {
    const { data, error } =
      await supabase
        .from("properties")
        .insert(property)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Property;
  },

  async update(
    id: string,
    property: UpdatePropertyInput
  ): Promise<Property> {
    const { data, error } =
      await supabase
        .from("properties")
        .update(property)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Property;
  },

  async delete(
    id: string
  ): Promise<void> {
    const { error } =
      await supabase
        .from("properties")
        .delete()
        .eq("id", id);

    if (error) {
      throw error;
    }
  },
};
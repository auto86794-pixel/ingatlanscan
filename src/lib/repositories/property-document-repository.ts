import { supabase } from "@/lib/supabase";

import type {
  CreatePropertyDocumentInput,
  PropertyDocument,
  UpdatePropertyDocumentInput,
} from "@/types/property-document";

/**
 * Property Document Repository.
 */
export class PropertyDocumentRepository {
  /**
   * Ingatlan dokumentumai.
   */
  async getByProperty(
    propertyId: string
  ): Promise<PropertyDocument[]> {
    const { data, error } =
      await supabase
        .from("property_documents")
        .select("*")
        .eq(
          "property_id",
          propertyId
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Dokumentum lekérése.
   */
  async getById(
    id: string
  ): Promise<PropertyDocument> {
    const { data, error } =
      await supabase
        .from("property_documents")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Dokumentum létrehozása.
   */
  async create(
    input: CreatePropertyDocumentInput
  ): Promise<PropertyDocument> {
    const { data, error } =
      await supabase
        .from("property_documents")
        .insert(input)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Dokumentum módosítása.
   */
  async update(
    id: string,
    input: UpdatePropertyDocumentInput
  ): Promise<PropertyDocument> {
    const { data, error } =
      await supabase
        .from("property_documents")
        .update(input)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Dokumentum törlése.
   */
  async delete(
    id: string
  ): Promise<void> {
    const { error } =
      await supabase
        .from("property_documents")
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
export const propertyDocumentRepository =
  new PropertyDocumentRepository();
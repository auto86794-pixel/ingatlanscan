import { supabase } from "@/lib/supabase";

import type {
  CreatePropertyImageInput,
  PropertyImage,
  UpdatePropertyImageInput,
} from "@/types/property-image";

/**
 * Property Image Repository.
 */
export class PropertyImageRepository {
  /**
   * Ingatlan összes képe.
   */
  async getByProperty(
    propertyId: string
  ): Promise<PropertyImage[]> {
    const { data, error } =
      await supabase
        .from("property_images")
        .select("*")
        .eq(
          "property_id",
          propertyId
        )
        .order(
          "sort_order",
          {
            ascending: true,
          }
        );

    if (error) {
      throw error;
    }

    return (
      data ?? []
    ) as PropertyImage[];
  }

  /**
   * Egy kép.
   */
  async getById(
    id: string
  ): Promise<PropertyImage> {
    const { data, error } =
      await supabase
        .from("property_images")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as PropertyImage;
  }

  /**
   * Új kép létrehozása.
   */
  async create(
    input: CreatePropertyImageInput
  ): Promise<PropertyImage> {
    const { data, error } =
      await supabase
        .from("property_images")
        .insert(input)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as PropertyImage;
  }

  /**
   * Kép módosítása.
   */
  async update(
    id: string,
    input: UpdatePropertyImageInput
  ): Promise<PropertyImage> {
    const { data, error } =
      await supabase
        .from("property_images")
        .update(input)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as PropertyImage;
  }

  /**
   * Kép törlése.
   */
  async delete(
    id: string
  ): Promise<void> {
    const { error } =
      await supabase
        .from("property_images")
        .delete()
        .eq("id", id);

    if (error) {
      throw error;
    }
  }

  /**
   * Borítókép beállítása.
   */
  async setCover(
    propertyId: string,
    imageId: string
  ): Promise<void> {
    const { error: resetError } =
      await supabase
        .from("property_images")
        .update({
          is_cover: false,
        })
        .eq(
          "property_id",
          propertyId
        );

    if (resetError) {
      throw resetError;
    }

    const { error } =
      await supabase
        .from("property_images")
        .update({
          is_cover: true,
        })
        .eq("id", imageId);

    if (error) {
      throw error;
    }
  }
}

/**
 * Singleton.
 */
export const propertyImageRepository =
  new PropertyImageRepository();
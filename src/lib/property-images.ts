// src/lib/property-images.ts

import { supabase } from "@/lib/supabase";

import type {
  PropertyImage,
  CreatePropertyImageInput,
  UpdatePropertyImageInput,
} from "@/types/property-image";

/**
 * Ingatlan összes képének lekérése.
 */
export async function getPropertyImages(
  propertyId: string
): Promise<PropertyImage[]> {
  const { data, error } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", propertyId)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as PropertyImage[];
}

/**
 * Egy kép lekérése.
 */
export async function getPropertyImage(
  id: string
): Promise<PropertyImage | null> {
  const { data, error } = await supabase
    .from("property_images")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data as PropertyImage;
}

/**
 * Borítókép lekérése.
 */
export async function getCoverPropertyImage(
  propertyId: string
): Promise<PropertyImage | null> {
  const { data, error } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", propertyId)
    .eq("is_cover", true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as PropertyImage | null;
}

/**
 * Új kép létrehozása.
 */
export async function createPropertyImage(
  input: CreatePropertyImageInput
): Promise<PropertyImage> {
  const { data, error } = await supabase
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
export async function updatePropertyImage(
  id: string,
  input: UpdatePropertyImageInput
): Promise<PropertyImage> {
  const { data, error } = await supabase
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
export async function deletePropertyImage(
  id: string
): Promise<void> {
  const { error } = await supabase
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
export async function setMainPropertyImage(
  imageId: string
): Promise<void> {
  const image = await getPropertyImage(imageId);

  if (!image) {
    throw new Error("A kép nem található.");
  }

  await supabase
    .from("property_images")
    .update({
      is_cover: false,
    })
    .eq("property_id", image.property_id);

  const { error } = await supabase
    .from("property_images")
    .update({
      is_cover: true,
    })
    .eq("id", imageId);

  if (error) {
    throw error;
  }
}
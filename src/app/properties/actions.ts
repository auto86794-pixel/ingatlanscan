"use server";

import { revalidatePath } from "next/cache";

import {
  propertyRepository,
} from "@/lib/repositories/property-repository";

import {
  propertyImageService,
} from "@/services/property-image-service";

import type {
  CreatePropertyInput,
  UpdatePropertyInput,
} from "@/types/property";

/**
 * Ingatlan kép feltöltése.
 */
export async function uploadPropertyImageAction(
  propertyId: string,
  file: File
): Promise<void> {
  await propertyImageService.uploadImage({
    property_id: propertyId,
    file,
  });

  revalidatePath("/properties");
  revalidatePath(
    `/properties/${propertyId}`
  );
}

/**
 * Borítókép beállítása.
 */
export async function setCoverPropertyImageAction(
  propertyId: string,
  imageId: string
): Promise<void> {
  await propertyImageService.setCoverImage(
    propertyId,
    imageId
  );

  revalidatePath("/properties");
  revalidatePath(
    `/properties/${propertyId}`
  );
}

/**
 * Kép törlése.
 */
export async function deletePropertyImageAction(
  imageId: string
): Promise<void> {
  await propertyImageService.deleteImage(
    imageId
  );

  revalidatePath("/properties");
}

/**
 * Új ingatlan létrehozása.
 */
export async function createPropertyAction(
  input: CreatePropertyInput
): Promise<string> {
  const property =
    await propertyRepository.create(
      input
    );

  revalidatePath("/properties");

  return property.id;
}

/**
 * Ingatlan módosítása.
 */
export async function updatePropertyAction(
  id: string,
  input: UpdatePropertyInput
): Promise<string> {
  await propertyRepository.update(
    id,
    input
  );

  revalidatePath("/properties");
  revalidatePath(
    `/properties/${id}`
  );

  return id;
}

/**
 * Ingatlan törlése.
 */
export async function deletePropertyAction(
  id: string
): Promise<void> {
  await propertyRepository.delete(
    id
  );

  revalidatePath("/properties");
}
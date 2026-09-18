// src/lib/property-image-storage.ts

import { storageService } from "@/lib/storage/storage-service";

import {
  createPropertyImage,
  deletePropertyImage,
  getPropertyImage,
  setMainPropertyImage,
} from "@/lib/property-images";

/**
 * Property képek bucket neve.
 */
const BUCKET = "property-images";

/**
 * Property kép feltöltése.
 */
export async function uploadPropertyImage(
  propertyId: string,
  file: File
) {
  const extension =
    file.name.split(".").pop() ?? "jpg";

  const path =
    `${propertyId}/${crypto.randomUUID()}.${extension}`;

  const url =
    await storageService.upload({
      bucket: BUCKET,
      path,
      file,
    });

  return createPropertyImage({
    property_id: propertyId,
    url,
    file_name: file.name,
    mime_type: file.type,
    file_size: file.size,
    is_cover: false,
  });
}

/**
 * Borítókép beállítása.
 */
export async function setCoverImage(
  imageId: string
) {
  return setMainPropertyImage(imageId);
}

/**
 * Property kép törlése.
 */
export async function removePropertyImage(
  imageId: string
) {
  const image =
    await getPropertyImage(imageId);

  if (!image) {
    throw new Error(
      "A kép nem található."
    );
  }

  const publicPrefix =
    `/storage/v1/object/public/${BUCKET}/`;

  const index =
    image.url.indexOf(publicPrefix);

  if (index !== -1) {
    const path =
      image.url.substring(
        index + publicPrefix.length
      );

    await storageService.delete(
      BUCKET,
      path
    );
  }

  await deletePropertyImage(imageId);
}
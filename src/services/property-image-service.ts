import {
  propertyImageRepository,
} from "@/lib/repositories/property-image-repository";

import {
  storageService,
} from "@/lib/storage/storage-service";

import type {
  CreatePropertyImageInput,
  PropertyImage,
  UpdatePropertyImageInput,
} from "@/types/property-image";

/**
 * Feltöltési bemenet.
 */
export interface UploadPropertyImageInput {
  property_id: string;

  file: File;

  is_cover?: boolean;

  sort_order?: number;
}

/**
 * Property Image Service.
 *
 * Az ingatlan képek üzleti logikája.
 */
export class PropertyImageService {
  /**
   * Ingatlan összes képe.
   */
  async getImages(
    propertyId: string
  ): Promise<PropertyImage[]> {
    return propertyImageRepository.getByProperty(
      propertyId
    );
  }

  /**
   * Egy kép.
   */
  async getImage(
    id: string
  ): Promise<PropertyImage> {
    return propertyImageRepository.getById(id);
  }

  /**
   * Új kép létrehozása.
   */
  async createImage(
    input: CreatePropertyImageInput
  ): Promise<PropertyImage> {
    return propertyImageRepository.create(input);
  }

  /**
   * Kép feltöltése.
   */
  async uploadImage(
    input: UploadPropertyImageInput
  ): Promise<PropertyImage> {
    const extension =
      input.file.name.split(".").pop() ??
      "jpg";

    const path =
      `${input.property_id}/${crypto.randomUUID()}.${extension}`;

    const url =
      await storageService.upload({
        bucket: "property-images",
        path,
        file: input.file,
      });

    return propertyImageRepository.create({
      property_id: input.property_id,
      url,
      file_name: input.file.name,
      mime_type: input.file.type,
      file_size: input.file.size,
      is_cover:
        input.is_cover ?? false,
      sort_order:
        input.sort_order ?? 0,
    });
  }

  /**
   * Kép módosítása.
   */
  async updateImage(
    id: string,
    input: UpdatePropertyImageInput
  ): Promise<PropertyImage> {
    return propertyImageRepository.update(
      id,
      input
    );
  }

  /**
   * Kép törlése.
   */
  async deleteImage(
    id: string
  ): Promise<void> {
    const image =
      await propertyImageRepository.getById(
        id
      );

    const marker =
      "/property-images/";

    const url =
      new URL(image.url);

    const index =
      url.pathname.indexOf(marker);

    if (index >= 0) {
      const path =
        url.pathname.substring(
          index + marker.length
        );

      await storageService.delete(
        "property-images",
        path
      );
    }

    await propertyImageRepository.delete(
      id
    );
  }

  /**
   * Borítókép beállítása.
   */
  async setCoverImage(
    propertyId: string,
    imageId: string
  ): Promise<void> {
    await propertyImageRepository.setCover(
      propertyId,
      imageId
    );
  }
}

/**
 * Singleton.
 */
export const propertyImageService =
  new PropertyImageService();
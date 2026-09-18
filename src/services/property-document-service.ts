import {
  propertyDocumentRepository,
} from "@/lib/repositories/property-document-repository";

import {
  storageService,
} from "@/lib/storage/storage-service";

import type {
  PropertyDocument,
  UploadPropertyDocumentInput,
} from "@/types/property-document";

/**
 * Property Documents bucket.
 */
const BUCKET =
  "property-documents";

/**
 * Property Document Service.
 */
export class PropertyDocumentService {
  /**
   * Ingatlan dokumentumai.
   */
  async getDocuments(
    propertyId: string
  ): Promise<PropertyDocument[]> {
    return propertyDocumentRepository.getByProperty(
      propertyId
    );
  }

  /**
   * Dokumentum feltöltése.
   */
  async uploadDocument({
    property_id,
    type,
    title,
    file,
  }: UploadPropertyDocumentInput): Promise<PropertyDocument> {
    const extension =
      file.name.split(".").pop() ??
      "pdf";

    const fileName =
      `${crypto.randomUUID()}.${extension}`;

    const path =
      `${property_id}/${fileName}`;

    const url =
      await storageService.upload({
        bucket: BUCKET,
        path,
        file,
      });

    return propertyDocumentRepository.create({
      property_id,
      type,
      title,
      file_name: file.name,
      url,
      file_size: file.size,
      mime_type:
        file.type || undefined,
    });
  }

  /**
   * Dokumentum törlése.
   */
  async deleteDocument(
    id: string
  ): Promise<void> {
    const document =
      await propertyDocumentRepository.getById(
        id
      );

    const path =
      document.url.split(
        `/storage/v1/object/public/${BUCKET}/`
      )[1];

    await storageService.delete(
      BUCKET,
      path
    );

    await propertyDocumentRepository.delete(
      id
    );
  }
}

/**
 * Singleton.
 */
export const propertyDocumentService =
  new PropertyDocumentService();
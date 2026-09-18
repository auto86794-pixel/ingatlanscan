"use server";

import { revalidatePath } from "next/cache";

import {
  propertyDocumentService,
} from "@/services/property-document-service";

/**
 * Dokumentum feltöltése.
 */
export async function uploadPropertyDocumentAction(
  propertyId: string,
  type: string,
  title: string,
  file: File
): Promise<void> {
  await propertyDocumentService.uploadDocument({
    property_id: propertyId,
    type: type as
      | "title_deed"
      | "floor_plan"
      | "energy_certificate"
      | "agency_contract"
      | "authorization"
      | "other",
    title,
    file,
  });

  revalidatePath("/properties");
  revalidatePath(
    `/properties/${propertyId}`
  );
}

/**
 * Dokumentum törlése.
 */
export async function deletePropertyDocumentAction(
  propertyId: string,
  documentId: string
): Promise<void> {
  await propertyDocumentService.deleteDocument(
    documentId
  );

  revalidatePath("/properties");
  revalidatePath(
    `/properties/${propertyId}`
  );
}
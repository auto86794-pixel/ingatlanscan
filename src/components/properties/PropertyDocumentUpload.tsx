"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  uploadPropertyDocumentAction,
} from "@/app/properties/documents/actions";

import FileUpload from "@/components/storage/FileUpload";

import type {
  PropertyDocumentType,
} from "@/types/property-document";

type PropertyDocumentUploadProps = {
  propertyId: string;

  type?: PropertyDocumentType;

  title?: string;
};

/**
 * Property Document Upload.
 */
export default function PropertyDocumentUpload({
  propertyId,
  type = "other",
  title = "Dokumentum",
}: PropertyDocumentUploadProps) {
  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleSelect(
    file: File
  ) {
    startTransition(
      async () => {
        try {
          await uploadPropertyDocumentAction(
            propertyId,
            type,
            title,
            file
          );

          router.refresh();
        } catch (error) {
          console.error(error);

          alert(
            "A dokumentum feltöltése sikertelen."
          );
        }
      }
    );
  }

  return (
    <FileUpload
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      disabled={isPending}
      title="Dokumentumok"
      description="PDF, DOC, DOCX, JPG vagy PNG dokumentum feltöltése."
      buttonLabel={
        isPending
          ? "Feltöltés..."
          : "Dokumentum kiválasztása"
      }
      onSelect={handleSelect}
    />
  );
}
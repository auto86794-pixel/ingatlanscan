"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  File,
  FileImage,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

import {
  deletePropertyDocumentAction,
} from "@/app/properties/documents/actions";

import FileCard from "@/components/storage/FileCard";

import type {
  PropertyDocument,
} from "@/types/property-document";

type PropertyDocumentCardProps = {
  propertyId: string;

  document: PropertyDocument;
};

/**
 * Property Document Card.
 */
export default function PropertyDocumentCard({
  propertyId,
  document,
}: PropertyDocumentCardProps) {
  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleDownload() {
    window.open(
      document.url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function handleDelete() {
    const confirmed =
      window.confirm(
        "Biztosan törölni szeretnéd ezt a dokumentumot?"
      );

    if (!confirmed) {
      return;
    }

    startTransition(
      async () => {
        try {
          await deletePropertyDocumentAction(
            propertyId,
            document.id
          );

          router.refresh();
        } catch (error) {
          console.error(error);

          alert(
            "A dokumentum törlése sikertelen."
          );
        }
      }
    );
  }

  function getIcon() {
    const mime =
      document.mime_type ?? "";

    if (mime.includes("pdf")) {
      return (
        <FileText className="h-6 w-6" />
      );
    }

    if (
      mime.includes("image")
    ) {
      return (
        <FileImage className="h-6 w-6" />
      );
    }

    if (
      mime.includes("excel") ||
      mime.includes("spreadsheet") ||
      mime.includes("sheet")
    ) {
      return (
        <FileSpreadsheet className="h-6 w-6" />
      );
    }

    return (
      <File className="h-6 w-6" />
    );
  }

  function formatFileSize(
    bytes: number | null
  ) {
    if (!bytes) {
      return null;
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (
      bytes <
      1024 * 1024
    ) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      1024 /
      1024
    ).toFixed(1)} MB`;
  }

  const createdAt =
    document.created_at
      ? new Date(
          document.created_at
        ).toLocaleDateString(
          "hu-HU"
        )
      : null;

  const fileSize =
    formatFileSize(
      document.file_size
    );

  const meta = [
    fileSize,
    createdAt,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <FileCard
      title={document.title}
      subtitle={
        document.file_name
      }
      meta={meta}
      icon={getIcon()}
      onDownload={
        handleDownload
      }
      onDelete={
        handleDelete
      }
      deleting={isPending}
    />
  );
}
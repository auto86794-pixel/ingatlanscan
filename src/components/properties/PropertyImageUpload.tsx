"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  uploadPropertyImageAction,
} from "@/app/properties/actions";

import Button from "@/components/ui/Button";

type PropertyImageUploadProps = {
  propertyId: string;
};

/**
 * Property Image Upload.
 */
export default function PropertyImageUpload({
  propertyId,
}: PropertyImageUploadProps) {
  const router = useRouter();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function openPicker() {
    inputRef.current?.click();
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    startTransition(async () => {
      try {
        await uploadPropertyImageAction(
          propertyId,
          file
        );

        router.refresh();
      } catch (error) {
        console.error(
          "Image upload failed:",
          error
        );

        if (error instanceof Error) {
          alert(
            `Hiba: ${error.message}`
          );
        } else {
          alert(
            `Ismeretlen hiba:\n${JSON.stringify(
              error,
              null,
              2
            )}`
          );
        }
      }
    });

    event.target.value = "";
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8">
      <div className="space-y-4 text-center">
        <div className="text-5xl">
          📷
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Ingatlan képek
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            JPG, PNG vagy WEBP
            feltöltése.
          </p>
        </div>

        <Button
          type="button"
          onClick={openPicker}
          disabled={isPending}
        >
          {isPending
            ? "Feltöltés..."
            : "Kép kiválasztása"}
        </Button>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
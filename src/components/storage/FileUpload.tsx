"use client";

import { useRef } from "react";

import Button from "@/components/ui/Button";

type FileUploadProps = {
  accept?: string;

  disabled?: boolean;

  title?: string;

  description?: string;

  buttonLabel?: string;

  onSelect: (
    file: File
  ) => void;
};

/**
 * Általános fájl feltöltő komponens.
 */
export default function FileUpload({
  accept = "*/*",
  disabled = false,
  title = "Fájl feltöltése",
  description = "Válassz egy fájlt a feltöltéshez.",
  buttonLabel = "Fájl kiválasztása",
  onSelect,
}: FileUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  function openPicker() {
    if (disabled) {
      return;
    }

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

    onSelect(file);

    event.target.value = "";
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8">
      <div className="space-y-4 text-center">
        <div className="text-5xl">
          📁
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {description}
          </p>
        </div>

        <Button
          type="button"
          onClick={openPicker}
          disabled={disabled}
        >
          {buttonLabel}
        </Button>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept={accept}
          onChange={
            handleChange
          }
        />
      </div>
    </div>
  );
}
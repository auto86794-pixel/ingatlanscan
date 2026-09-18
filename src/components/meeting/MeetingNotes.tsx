"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

import Button from "@/components/ui/Button";

type MeetingNotesProps = {
  initialValue?: string | null;
};

export default function MeetingNotes({
  initialValue,
}: MeetingNotesProps) {
  const [value, setValue] =
    useState(initialValue ?? "");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-500" />

          <h2 className="text-lg font-semibold">
            Jegyzet
          </h2>
        </div>

        <span className="text-sm text-slate-500">
          {value.length} karakter
        </span>
      </div>

      <textarea
        value={value}
        onChange={(event) =>
          setValue(
            event.target.value
          )
        }
        rows={10}
        placeholder="Írd ide a találkozó jegyzeteit..."
        className="w-full rounded-xl border border-slate-300 p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          disabled
        >
          Mentés
        </Button>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        A mentés a következő commitban
        kerül bekötésre.
      </p>
    </section>
  );
}
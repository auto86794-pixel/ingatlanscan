"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";

import {
  createNote,
  updateNote,
} from "@/lib/notes";

import type {
  Note,
} from "@/types/note";

type NoteFormProps = {
  caseId: string;

  initialData?: Note;
};

export default function NoteForm({
  caseId,
  initialData,
}: NoteFormProps) {
  const router = useRouter();

  const isEditing =
    Boolean(initialData);

  const [content, setContent] =
    useState(
      initialData?.content ?? ""
    );

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    setLoading(true);

    try {
      if (isEditing && initialData) {
        await updateNote(
          initialData.id,
          {
            content,
          }
        );
      } else {
        await createNote({
          case_id: caseId,
          content,
        });

        setContent("");
      }

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <textarea
        id="note-content"
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        rows={5}
        placeholder="Jegyzet..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={
            loading ||
            !content.trim()
          }
        >
          {loading
            ? "Mentés..."
            : isEditing
            ? "Jegyzet mentése"
            : "Jegyzet hozzáadása"}
        </Button>
      </div>
    </form>
  );
}
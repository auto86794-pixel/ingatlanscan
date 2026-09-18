import { FileText } from "lucide-react";

import EmptyState from "@/components/ui/EmptyState";

import type { Note } from "@/types/note";

type NotesListProps = {
  notes: Note[];
};

export default function NotesList({
  notes,
}: NotesListProps) {
  if (notes.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title="Még nincs jegyzet"
        description="Az ügyhöz tartozó jegyzetek itt fognak megjelenni."
      />
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Jegyzet
                </div>

                <div className="text-xs text-slate-500">
                  {formatDate(
                    note.created_at
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {note.content}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(
  value: string | null
): string {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString(
    "hu-HU",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}
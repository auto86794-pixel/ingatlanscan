"use client";

import Link from "next/link";

type CaseQuickActionsProps = {
  caseId: string;
  clientPhone?: string | null;
  address?: string | null;
};

export default function CaseQuickActions({
  caseId,
  clientPhone,
  address,
}: CaseQuickActionsProps) {
  function scrollToNotes() {
    document
      .getElementById("case-notes")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setTimeout(() => {
      document
        .getElementById("note-content")
        ?.focus();
    }, 350);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        ⚡ Gyors műveletek
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`/meetings/new?case=${caseId}`}
          className="rounded-xl bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700"
        >
          📅 Találkozó
        </Link>

        {clientPhone && (
          <a
            href={`tel:${clientPhone}`}
            className="rounded-xl bg-slate-100 px-4 py-3 text-center font-medium hover:bg-slate-200"
          >
            📞 Hívás
          </a>
        )}

        {address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-slate-100 px-4 py-3 text-center font-medium hover:bg-slate-200"
          >
            🧭 Navigáció
          </a>
        )}

        <Link
          href={`/tasks/new?case=${caseId}`}
          className="rounded-xl bg-slate-100 px-4 py-3 text-center font-medium hover:bg-slate-200"
        >
          ✅ Feladat
        </Link>

        <button
          type="button"
          onClick={scrollToNotes}
          className="rounded-xl bg-slate-100 px-4 py-3 text-center font-medium transition hover:bg-slate-200"
        >
          📝 Jegyzet
        </button>

        <Link
          href={`/offers/new?case=${caseId}`}
          className="rounded-xl bg-slate-100 px-4 py-3 text-center font-medium hover:bg-slate-200"
        >
          📄 Ajánlat
        </Link>
      </div>
    </section>
  );
}
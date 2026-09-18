"use client";

import { FilePlus2, FileText } from "lucide-react";

import Button from "@/components/ui/Button";

type MeetingOfferProps = {
  hasOffer?: boolean;
};

export default function MeetingOffer({
  hasOffer = false,
}: MeetingOfferProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-500" />

          <h2 className="text-lg font-semibold">
            Ajánlat
          </h2>
        </div>

        <Button
          type="button"
          disabled={hasOffer}
        >
          <FilePlus2 className="h-4 w-4" />
          Ajánlat készítése
        </Button>
      </div>

      {hasOffer ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="font-medium text-green-700">
            Már készült ajánlat ehhez a
            találkozóhoz.
          </div>

          <p className="mt-2 text-sm text-green-600">
            A következő sprintben innen
            közvetlenül megnyitható,
            szerkeszthető és elküldhető lesz.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-slate-300" />

          <p className="mt-4 text-slate-600">
            Ehhez a találkozóhoz még nem
            készült ajánlat.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Az ajánlatkészítő a következő
            sprintben kerül bekötésre.
          </p>
        </div>
      )}
    </section>
  );
}
"use client";

import { Camera, Plus } from "lucide-react";

import Button from "@/components/ui/Button";

type MeetingPhotosProps = {
  photos?: string[];
};

export default function MeetingPhotos({
  photos = [],
}: MeetingPhotosProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-slate-500" />

          <h2 className="text-lg font-semibold">
            Fotók
          </h2>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled
        >
          <Plus className="h-4 w-4" />
          Fotó hozzáadása
        </Button>
      </div>

      {photos.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-10 text-center">
          <Camera className="mx-auto h-12 w-12 text-slate-300" />

          <p className="mt-4 text-slate-600">
            Még nincs feltöltött fotó.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            A fotófeltöltés a következő
            sprintben készül el.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {photos.map(
            (photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Fotó ${index + 1}`}
                className="aspect-square rounded-xl border border-slate-200 object-cover"
              />
            )
          )}
        </div>
      )}
    </section>
  );
}
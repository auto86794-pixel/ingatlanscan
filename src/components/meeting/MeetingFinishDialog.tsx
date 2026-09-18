"use client";

import { useState } from "react";

type MeetingFinishDialogProps = {
  open: boolean;

  onClose: () => void;

  onComplete: (
    options: {
      createCallReminder: boolean;
      createOfferReminder: boolean;
      createMeetingReminder: boolean;
    }
  ) => Promise<void>;
};

export default function MeetingFinishDialog({
  open,
  onClose,
  onComplete,
}: MeetingFinishDialogProps) {
  const [
    createCallReminder,
    setCreateCallReminder,
  ] = useState(true);

  const [
    createOfferReminder,
    setCreateOfferReminder,
  ] = useState(false);

  const [
    createMeetingReminder,
    setCreateMeetingReminder,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  if (!open) {
    return null;
  }

  async function handleFinish() {
    setLoading(true);

    try {
      await onComplete({
        createCallReminder,
        createOfferReminder,
        createMeetingReminder,
      });

      onClose();
    } catch (error) {
      console.error(
        "Meeting completion failed:",
        error
      );

      // TODO:
      // Toast notification
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold">
          Találkozó lezárása
        </h2>

        <p className="mt-2 text-slate-500">
          Mit készítsen elő
          automatikusan a HomeFlow?
        </p>

        <div className="mt-6 space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                createCallReminder
              }
              onChange={(e) =>
                setCreateCallReminder(
                  e.target.checked
                )
              }
            />

            <span>
              📞 Visszahívás
              3 nap múlva
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                createOfferReminder
              }
              onChange={(e) =>
                setCreateOfferReminder(
                  e.target.checked
                )
              }
            />

            <span>
              📄 Ajánlat
              küldése
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                createMeetingReminder
              }
              onChange={(e) =>
                setCreateMeetingReminder(
                  e.target.checked
                )
              }
            />

            <span>
              📅 Új találkozó
              szervezése
            </span>
          </label>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 transition hover:bg-slate-100 disabled:opacity-50"
          >
            Mégse
          </button>

          <button
            type="button"
            onClick={handleFinish}
            disabled={loading}
            className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {loading
              ? "Mentés..."
              : "Találkozó lezárása"}
          </button>
        </div>
      </div>
    </div>
  );
}
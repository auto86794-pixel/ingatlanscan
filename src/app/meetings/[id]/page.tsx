import { notFound } from "next/navigation";

import MeetingHeader from "@/components/meeting/MeetingHeader";

import { meetingRepository } from "@/lib/repositories/meeting-repository";

type MeetingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;

  const meeting =
    await meetingRepository.getMeeting(id);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <MeetingHeader
        event={meeting}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            👤 Ügyfél
          </h2>

          <p className="text-slate-700">
            {meeting.client_name ??
              "-"}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {meeting.client_email ??
              "-"}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {meeting.client_phone ??
              "-"}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            🏠 Ingatlan
          </h2>

          <p className="text-slate-700">
            {meeting.property_title ??
              "-"}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {meeting.address ??
              "-"}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            📞 Gyors műveletek
          </h2>

          <div className="space-y-3">
            <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white">
              📞 Hívás
            </button>

            <button className="w-full rounded-xl bg-slate-100 px-4 py-3 font-medium">
              🧭 Navigáció
            </button>

            <button className="w-full rounded-xl bg-slate-100 px-4 py-3 font-medium">
              📄 Ügy megnyitása
            </button>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          📝 Jegyzet
        </h2>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          📷 Fotók
        </h2>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          📄 Ajánlat
        </h2>
      </section>

      <section className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <button className="w-full rounded-xl bg-green-600 px-5 py-4 text-lg font-semibold text-white transition hover:bg-green-700">
          ✅ Találkozó lezárása
        </button>
      </section>
    </div>
  );
}
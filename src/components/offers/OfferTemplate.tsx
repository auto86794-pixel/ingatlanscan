import type {
  OfferWithCase,
} from "@/types/offer";

type OfferTemplateProps = {
  offer: OfferWithCase;
};

export default function OfferTemplate({
  offer,
}: OfferTemplateProps) {
  return (
    <div className="mx-auto max-w-4xl bg-white p-10 text-black">
      <header className="border-b pb-6">
        <h1 className="text-3xl font-bold">
          HOMEFLOW
        </h1>

        <p className="mt-2 text-lg text-slate-600">
          Ingatlan értékesítési ajánlat
        </p>
      </header>

      <section className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <h2 className="mb-3 text-lg font-semibold">
            Ajánlat
          </h2>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Verzió</dt>

              <dd>
                V{offer.version}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt>Státusz</dt>

              <dd>
                {offer.status}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt>Érvényes</dt>

              <dd>
                {offer.valid_until ??
                  "-"}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt>Létrehozva</dt>

              <dd>
                {new Date(
                  offer.created_at
                ).toLocaleDateString(
                  "hu-HU"
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">
            Kapcsolódó ügy
          </h2>

          {offer.case ? (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Ügyszám</dt>

                <dd>
                  {`HF-${String(
                    offer.case.case_number
                  ).padStart(
                    6,
                    "0"
                  )}`}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt>Cím</dt>

                <dd>
                  {offer.case.title}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt>Típus</dt>

                <dd>
                  {offer.case.type}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt>Prioritás</dt>

                <dd>
                  {offer.case.priority}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-slate-500">
              Nincs kapcsolódó ügy.
            </p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">
          Megjegyzések
        </h2>

        <div className="min-h-40 rounded-lg border border-slate-200 p-4 whitespace-pre-wrap">
          {offer.notes ||
            "Nincs megjegyzés."}
        </div>
      </section>

      <footer className="mt-16 border-t pt-8">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <div className="mt-12 border-t border-slate-400 pt-2 text-center text-sm">
              Ügyfél aláírás
            </div>
          </div>

          <div>
            <div className="mt-12 border-t border-slate-400 pt-2 text-center text-sm">
              HomeFlow
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
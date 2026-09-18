import Link from "next/link";

import {
  clientRepository,
} from "@/lib/repositories/client-repository";

import CaseForm from "@/components/cases/CaseForm";

import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

export default async function NewCasePage() {
  const clients =
    await clientRepository.getAll();

  return (
    <div className="space-y-6">
      <PageTitle
        title="Új ügy"
        subtitle="Hozz létre egy új ügyet."
        action={
          <Link
            href="/cases"
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-200"
          >
            ← Vissza
          </Link>
        }
      />

      <Card>
        <CaseForm
          clients={clients}
        />
      </Card>
    </div>
  );
}
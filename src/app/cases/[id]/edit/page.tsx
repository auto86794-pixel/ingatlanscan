import Link from "next/link";
import { notFound } from "next/navigation";

import CaseForm from "@/components/cases/CaseForm";

import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import {
  clientRepository,
} from "@/lib/repositories/client-repository";

type EditCasePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCasePage({
  params,
}: EditCasePageProps) {
  const { id } = await params;

  const [item, clients] =
    await Promise.all([
      caseRepository
        .getById(id)
        .catch(() => null),

      clientRepository.getAll(),
    ]);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageTitle
        title="Ügy szerkesztése"
        subtitle={`HF-${String(
          item.case_number
        ).padStart(6, "0")}`}
        action={
          <Link
            href={`/cases/${item.id}`}
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-200"
          >
            ← Vissza
          </Link>
        }
      />

      <Card>
        <CaseForm
          initialData={item}
          clients={clients}
        />
      </Card>
    </div>
  );
}
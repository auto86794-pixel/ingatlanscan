import Link from "next/link";
import { notFound } from "next/navigation";

import { getTask } from "@/lib/tasks";

import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import Card from "@/components/ui/Card";
import DetailSection from "@/components/ui/DetailSection";
import InfoRow from "@/components/ui/InfoRow";
import PageTitle from "@/components/ui/PageTitle";

type TaskDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TaskDetailPage({
  params,
}: TaskDetailPageProps) {
  const { id } = await params;

  const task = await getTask(id);

  if (!task) {
    notFound();
  }

  const relatedCase =
    task.case_id
      ? await caseRepository
          .getById(task.case_id)
          .catch(() => null)
      : null;

  return (
    <div className="space-y-6">
      <PageTitle
        title={task.title}
        subtitle="Feladat adatlap"
        action={
          <div className="flex gap-3">
            <Link
              href="/tasks"
              className="rounded-xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-300"
            >
              ← Vissza
            </Link>

            <Link
              href={`/tasks/${task.id}/edit`}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Szerkesztés
            </Link>
          </div>
        }
      />

      <Card>
        <DetailSection title="Feladat adatai">
          <InfoRow
            label="Feladat"
            value={task.title}
          />

          <InfoRow
            label="Státusz"
            value={task.status}
          />

          <InfoRow
            label="Prioritás"
            value={task.priority}
          />

          <InfoRow
            label="Határidő"
            value={task.due_date ?? "-"}
          />

          <InfoRow
            label="Kapcsolódó ügy"
            value={
              relatedCase
                ? `HF-${String(
                    relatedCase.case_number
                  ).padStart(
                    6,
                    "0"
                  )} - ${
                    relatedCase.title
                  }`
                : "-"
            }
          />

          <InfoRow
            label="Leírás"
            value={
              task.description ?? "-"
            }
          />

          <InfoRow
            label="Létrehozva"
            value={
              task.created_at
                ? new Date(
                    task.created_at
                  ).toLocaleString(
                    "hu-HU"
                  )
                : "-"
            }
          />

          <InfoRow
            label="Utolsó módosítás"
            value={
              task.updated_at
                ? new Date(
                    task.updated_at
                  ).toLocaleString(
                    "hu-HU"
                  )
                : "-"
            }
          />
        </DetailSection>
      </Card>
    </div>
  );
}
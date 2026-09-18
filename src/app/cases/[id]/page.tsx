import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Pencil,
} from "lucide-react";

import { getCaseNotes } from "@/lib/notes";
import { caseRepository } from "@/lib/repositories/case-repository";
import { getCaseTasks } from "@/lib/tasks";
import { timelineService } from "@/services/timeline-service";

import CaseQuickActions from "@/components/cases/CaseQuickActions";
import CaseTimeline from "@/components/cases/CaseTimeline";
import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";
import TasksList from "@/components/tasks/TasksList";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DetailSection from "@/components/ui/DetailSection";
import HeroCard from "@/components/ui/HeroCard";
import InfoRow from "@/components/ui/InfoRow";
import PageTitle from "@/components/ui/PageTitle";
import PriorityBadge from "@/components/ui/PriorityBadge";
import StatusBadge from "@/components/ui/StatusBadge";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CaseDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const item = await caseRepository
    .getWithClient(id)
    .catch(() => null);

  if (!item) {
    notFound();
  }

  const [timeline, notes, tasks] =
    await Promise.all([
      timelineService.getCaseTimeline(id),
      getCaseNotes(id),
      getCaseTasks(id),
    ]);

  return (
    <div className="space-y-8">
      <PageTitle
        title={formatCaseNumber(item.case_number)}
        subtitle="Ügy adatlap"
        action={
          <div className="flex flex-wrap gap-3">
            <Button
              href="/cases"
              variant="secondary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Vissza
            </Button>

            <Button
              href={`/cases/${item.id}/edit`}
              variant="outline"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Szerkesztés
            </Button>
          </div>
        }
      />

      <HeroCard
        badge={
          <div className="flex items-center gap-2 text-blue-100">
            <BriefcaseBusiness className="h-5 w-5" />

            <span className="text-sm font-semibold uppercase tracking-wide">
              Aktív ügy
            </span>
          </div>
        }
        title={item.title}
        description="Az ügy legfontosabb adatai és kapcsolódó információi egy helyen."
        aside={
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-blue-100">
                Ügyszám
              </div>

              <div className="mt-1 text-xl font-semibold">
                {formatCaseNumber(item.case_number)}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusBadge status={item.status} />
              <PriorityBadge priority={item.priority} />
            </div>

            <Badge variant="default">
              {item.type}
            </Badge>
          </div>
        }
      />

      <CaseQuickActions
        caseId={item.id}
        clientPhone={item.clients?.phone}
        address={
          item.properties
            ? [
                item.properties.city,
                item.properties.address,
              ]
                .filter(Boolean)
                .join(", ")
            : null
        }
      />

      <DetailSection title="Általános adatok">
        <InfoRow
          label="Ügyszám"
          value={formatCaseNumber(item.case_number)}
        />

        <InfoRow
          label="Cím"
          value={item.title}
        />

        <InfoRow
          label="Típus"
          value={item.type}
        />

        <InfoRow
          label="Státusz"
          value={<StatusBadge status={item.status} />}
        />

        <InfoRow
          label="Prioritás"
          value={<PriorityBadge priority={item.priority} />}
        />
      </DetailSection>

      <DetailSection title="Leírás">
        <p className="whitespace-pre-wrap text-slate-700">
          {item.description ?? "Nincs megadva leírás."}
        </p>
      </DetailSection>

      <DetailSection title="Kapcsolódó ügyfél">
        {item.clients ? (
          <div className="space-y-3">
            <Link
              href={`/clients/${item.clients.id}`}
              className="text-lg font-semibold text-blue-600 hover:text-blue-700"
            >
              {item.clients.first_name}{" "}
              {item.clients.last_name}
            </Link>

            <InfoRow
              label="Telefon"
              value={
                item.clients.phone ??
                "Nincs telefonszám megadva"
              }
            />

            <InfoRow
              label="E-mail"
              value={
                item.clients.email ??
                "Nincs e-mail cím megadva"
              }
            />
          </div>
        ) : (
          <p className="text-slate-500">
            Még nincs ügyfél hozzárendelve.
          </p>
        )}
      </DetailSection>

      <DetailSection title="Kapcsolódó ingatlan">
        {item.properties ? (
          <div className="space-y-3">
            <InfoRow
              label="Név"
              value={
                item.properties.title ??
                "Nincs megadva"
              }
            />

            <InfoRow
              label="Cím"
              value={
                [
                  item.properties.city,
                  item.properties.address,
                ]
                  .filter(Boolean)
                  .join(", ") ||
                "Nincs cím"
              }
            />

            <InfoRow
              label="Státusz"
              value={
                item.properties.status ??
                "Nincs megadva"
              }
            />
          </div>
        ) : (
          <p className="text-slate-500">
            Még nincs ingatlan hozzárendelve.
          </p>
        )}
      </DetailSection>

      <DetailSection title="Feladatok">
        <TasksList
          tasks={tasks}
          caseId={item.id}
        />
      </DetailSection>

      <div id="case-notes">
        <DetailSection title="Jegyzetek">
          <div className="space-y-6">
            <NoteForm caseId={item.id} />

            <NotesList notes={notes} />
          </div>
        </DetailSection>
      </div>

      <CaseTimeline items={timeline} />
    </div>
  );
}

function formatCaseNumber(
  caseNumber: number
): string {
  return `HF-${String(caseNumber).padStart(6, "0")}`;
}
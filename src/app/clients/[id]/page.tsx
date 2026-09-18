import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  FileText,
  Mail,
  MapPin,
  MessageSquareText,
  Pencil,
  Phone,
  UserRound,
  WalletCards,
} from "lucide-react";

import { clientRepository } from "@/lib/repositories/client-repository";

import type { ClientWithCases } from "@/types/client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import DetailSection from "@/components/ui/DetailSection";
import EmptyState from "@/components/ui/EmptyState";
import HeroCard from "@/components/ui/HeroCard";
import InfoRow from "@/components/ui/InfoRow";
import StatusBadge from "@/components/ui/StatusBadge";
import DeleteClientButton from "@/components/client/DeleteClientButton";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClientDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  let client: ClientWithCases;

  try {
    client = await clientRepository.getWithCases(id);
  } catch {
    notFound();
  }

  const fullName =
    `${client.last_name} ${client.first_name}`;

  const initials = getInitials(
    client.first_name,
    client.last_name
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-7 sm:space-y-8">
      <Link
        href="/clients"
        className={[
          "group inline-flex items-center gap-2",
          "rounded-xl px-1 py-1",
          "text-sm font-semibold text-slate-500",
          "transition-colors duration-200",
          "hover:text-blue-600",
        ].join(" ")}
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />

        Vissza az ügyfelekhez
      </Link>

      <HeroCard
        badge={
          <div className="flex items-center gap-3">
            <div
              className={[
                "flex h-12 w-12 items-center justify-center",
                "rounded-2xl border border-white/20",
                "bg-white/15 text-base font-black text-white",
                "shadow-lg backdrop-blur-xl",
              ].join(" ")}
            >
              {initials}
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Ügyfél adatlap
              </div>

              <div className="mt-0.5 text-sm font-medium text-white/80">
                HomeFlow CRM
              </div>
            </div>
          </div>
        }
        title={fullName}
        description="Az ügyfél legfontosabb adatai, elérhetőségei és kapcsolódó ügyei egy helyen."
        aside={
          <div className="flex w-full flex-col gap-4 lg:w-auto lg:items-end">
            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <Badge variant="blue">
                {client.cases.length} ügy
              </Badge>

              {client.status && (
                <StatusBadge status={client.status} />
              )}
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              <Button
                href={`/clients/${client.id}/edit`}
                variant="outline"
              >
                <Pencil className="mr-2 h-4 w-4" />

                Szerkesztés
              </Button>

              <DeleteClientButton
                id={client.id}
                name={fullName}
              />
            </div>
          </div>
        }
      />

      <DetailSection
        title="Általános adatok"
        description="Az ügyfél legfontosabb elérhetőségei és preferenciái."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <InfoRow
            label="Név"
            value={fullName}
            icon={
              <UserRound className="h-4 w-4" />
            }
          />

          <InfoRow
            label="Telefon"
            value={client.phone ?? "Nincs megadva"}
            icon={
              <Phone className="h-4 w-4" />
            }
          />

          <InfoRow
            label="E-mail"
            value={client.email ?? "Nincs megadva"}
            icon={
              <Mail className="h-4 w-4" />
            }
          />

          <InfoRow
            label="Város"
            value={client.city ?? "Nincs megadva"}
            icon={
              <MapPin className="h-4 w-4" />
            }
          />

          <InfoRow
            label="Státusz"
            value={
              client.status ? (
                <StatusBadge status={client.status} />
              ) : (
                "Nincs megadva"
              )
            }
          />

          <InfoRow
            label="Forrás"
            value={client.source ?? "Nincs megadva"}
          />

          <InfoRow
            label="Ingatlan típusa"
            value={
              client.property_type ?? "Nincs megadva"
            }
            icon={
              <Building2 className="h-4 w-4" />
            }
          />

          <InfoRow
            label="Költségkeret"
            value={formatBudget(client)}
            icon={
              <WalletCards className="h-4 w-4" />
            }
          />
        </div>
      </DetailSection>

      <DetailSection
        title="Megjegyzések"
        description="Az ügyféllel kapcsolatos belső feljegyzések."
      >
        <div
          className={[
            "relative overflow-hidden rounded-[24px]",
            "border border-slate-200/80",
            "bg-gradient-to-br from-slate-50 via-white to-blue-50/50",
            "p-5 sm:p-6",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div
              className={[
                "flex h-11 w-11 shrink-0 items-center justify-center",
                "rounded-2xl bg-blue-100 text-blue-600",
              ].join(" ")}
            >
              <MessageSquareText className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Belső feljegyzés
              </div>

              <div className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700 sm:text-base">
                {client.notes || "Nincs megjegyzés."}
              </div>
            </div>
          </div>
        </div>
      </DetailSection>

      <DetailSection
        title="Kapcsolódó ügyek"
        description="Az ügyfélhez tartozó összes ügy."
      >
        {client.cases.length > 0 ? (
          <div className="overflow-x-auto">
            <DataTable>
              <DataTable.Head>
                <tr>
                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    Ügyszám
                  </th>

                  <th className="min-w-[220px] px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    Cím
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    Típus
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    Státusz
                  </th>
                </tr>
              </DataTable.Head>

              <DataTable.Body>
                {client.cases.map((item) => (
                  <tr
                    key={item.id}
                    className={[
                      "group transition-colors duration-200",
                      "hover:bg-blue-50/50",
                    ].join(" ")}
                  >
                    <td className="whitespace-nowrap px-6 py-5">
                      <Link
                        href={`/cases/${item.id}`}
                        className={[
                          "inline-flex rounded-lg",
                          "font-bold text-blue-600",
                          "transition-colors duration-200",
                          "hover:text-blue-700",
                        ].join(" ")}
                      >
                        {`HF-${String(
                          item.case_number
                        ).padStart(6, "0")}`}
                      </Link>
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-800">
                      {item.title}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                      {item.type}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </DataTable.Body>
            </DataTable>
          </div>
        ) : (
          <EmptyState
            icon={
              <FileText className="h-6 w-6" />
            }
            title="Nincsenek kapcsolódó ügyek"
            description="Ehhez az ügyfélhez még nincs egyetlen ügy sem hozzárendelve."
          />
        )}
      </DetailSection>
    </div>
  );
}

function getInitials(
  firstName: string,
  lastName: string
): string {
  return `${lastName.charAt(0)}${firstName.charAt(0)}`
    .toUpperCase();
}

function formatBudget(
  client: ClientWithCases
): string {
  if (
    client.budget_min == null &&
    client.budget_max == null
  ) {
    return "Nincs megadva";
  }

  const formatter = new Intl.NumberFormat("hu-HU");

  if (
    client.budget_min != null &&
    client.budget_max != null
  ) {
    return `${formatter.format(
      client.budget_min
    )} – ${formatter.format(
      client.budget_max
    )} Ft`;
  }

  if (client.budget_min != null) {
    return `${formatter.format(
      client.budget_min
    )} Ft-tól`;
  }

  return `${formatter.format(
    client.budget_max ?? 0
  )} Ft-ig`;
}
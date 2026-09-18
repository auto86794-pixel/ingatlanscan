import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FolderSearch,
  Tag,
  UserRound,
} from "lucide-react";

import DataTable from "@/components/ui/DataTable";
import PriorityBadge from "@/components/ui/PriorityBadge";
import StatusBadge from "@/components/ui/StatusBadge";

import type { CaseWithClient } from "@/types/case";

type CaseTableProps = {
  cases: CaseWithClient[];
};

export default function CaseTable({
  cases,
}: CaseTableProps) {
  if (cases.length === 0) {
    return (
      <DataTable.Empty
        icon={<FolderSearch className="h-6 w-6" />}
        title="Nincs találat"
        description="Próbálj más keresési vagy szűrési feltételeket."
      />
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <DataTable>
          <DataTable.Head>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ügyszám
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ügy
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ügyfél
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Típus
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Státusz
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Prioritás
              </th>

              <th className="w-16 px-6 py-4">
                <span className="sr-only">
                  Megnyitás
                </span>
              </th>
            </tr>
          </DataTable.Head>

          <DataTable.Body>
            {cases.map((item) => {
              const href = `/cases/${item.id}`;

              return (
                <tr
                  key={item.id}
                  className="group transition-colors duration-200 hover:bg-blue-50/40"
                >
                  <td className="px-6 py-5">
                    <Link
                      href={href}
                      className="inline-flex rounded-lg bg-blue-50 px-2.5 py-1.5 font-mono text-sm font-semibold text-blue-700 transition-colors group-hover:bg-blue-100"
                    >
                      {formatCaseNumber(item.case_number)}
                    </Link>
                  </td>

                  <td className="px-6 py-5">
                    <Link
                      href={href}
                      className="block max-w-xs"
                    >
                      <div className="truncate font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                        {item.title}
                      </div>
                    </Link>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <UserRound className="h-4 w-4 shrink-0 text-slate-400" />

                      <span className="truncate">
                        {getClientName(item)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Tag className="h-4 w-4 shrink-0 text-slate-400" />

                      <span>
                        {item.type}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-6 py-5">
                    <PriorityBadge priority={item.priority} />
                  </td>

                  <td className="px-6 py-5 text-right">
                    <Link
                      href={href}
                      aria-label={`${item.title} megnyitása`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-white hover:text-blue-600 hover:shadow-sm group-hover:translate-x-0.5"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </DataTable.Body>
        </DataTable>
      </div>

      <div className="space-y-4 lg:hidden">
        {cases.map((item) => (
          <Link
            key={item.id}
            href={`/cases/${item.id}`}
            className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="inline-flex rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-semibold text-blue-700">
                  {formatCaseNumber(item.case_number)}
                </div>

                <h3 className="mt-3 truncate font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                  {item.title}
                </h3>
              </div>

              <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600" />
            </div>

            <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <UserRound className="h-4 w-4 shrink-0 text-slate-400" />

                <span className="truncate">
                  {getClientName(item, "Nincs ügyfél")}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <BriefcaseBusiness className="h-4 w-4 shrink-0 text-slate-400" />

                <span>
                  {item.type}
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <StatusBadge status={item.status} />
              <PriorityBadge priority={item.priority} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

function formatCaseNumber(
  caseNumber: number
): string {
  return `HF-${String(caseNumber).padStart(6, "0")}`;
}

function getClientName(
  item: CaseWithClient,
  fallback = "—"
): string {
  if (!item.clients) {
    return fallback;
  }

  return `${item.clients.first_name} ${item.clients.last_name}`;
}
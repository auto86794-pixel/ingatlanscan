import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Users,
} from "lucide-react";

import type { Client } from "@/types/client";

import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";

type ClientTableProps = {
  clients: Client[];
};

export default function ClientTable({
  clients,
}: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <DataTable.Empty
        icon={<Users className="h-6 w-6" />}
        title="Nincs ügyfél"
        description="Még nincs rögzített ügyfél."
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
                Ügyfél
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Telefon
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                E-mail
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Város
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Státusz
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Keret
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ingatlan
              </th>

              <th className="w-16 px-6 py-4">
                <span className="sr-only">
                  Megnyitás
                </span>
              </th>
            </tr>
          </DataTable.Head>

          <DataTable.Body>
            {clients.map((client) => {
              const href = `/clients/${client.id}`;

              return (
                <tr
                  key={client.id}
                  className="group transition-colors duration-200 hover:bg-blue-50/40"
                >
                  <td className="px-6 py-5">
                    <Link
                      href={href}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <UserRound className="h-5 w-5" />
                      </div>

                      <div>
                        <div className="font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                          {client.last_name} {client.first_name}
                        </div>
                      </div>
                    </Link>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-4 w-4 text-slate-400" />
                      {client.phone ?? "-"}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="max-w-[220px] truncate">
                        {client.email ?? "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {client.city ?? "-"}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <Badge
                      variant={getStatusVariant(
                        client.status
                      )}
                    >
                      {client.status ?? "-"}
                    </Badge>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {formatBudget(client)}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      {client.property_type ?? "-"}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <Link
                      href={href}
                      aria-label="Ügyfél megnyitása"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 opacity-0 transition-all duration-200 hover:bg-white hover:text-blue-600 hover:shadow-sm group-hover:translate-x-0.5 group-hover:opacity-100"
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
        {clients.map((client) => (
          <Link
            key={client.id}
            href={`/clients/${client.id}`}
            className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {client.last_name} {client.first_name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {client.email ?? "Nincs e-mail"}
                  </p>
                </div>
              </div>

              <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600" />
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="h-4 w-4 text-slate-400" />
                {client.phone ?? "-"}
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400" />
                {client.city ?? "-"}
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant={getStatusVariant(
                    client.status
                  )}
                >
                  {client.status ?? "-"}
                </Badge>

                <span className="text-slate-500">
                  {client.property_type ?? "-"}
                </span>
              </div>

              <div className="text-slate-600">
                <span className="font-medium">
                  Keret:
                </span>{" "}
                {formatBudget(client)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

function formatBudget(client: Client): string {
  if (
    client.budget_min == null &&
    client.budget_max == null
  ) {
    return "-";
  }

  return `${(
    client.budget_min ?? 0
  ).toLocaleString("hu-HU")} – ${(
    client.budget_max ?? 0
  ).toLocaleString("hu-HU")} Ft`;
}

function getStatusVariant(
  status: string | null
):
  | "default"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple" {
  switch (status?.toLowerCase()) {
    case "aktív":
    case "active":
      return "green";

    case "érdeklődő":
    case "lead":
      return "blue";

    case "inaktív":
    case "inactive":
      return "yellow";

    case "lezárt":
    case "closed":
      return "red";

    default:
      return "default";
  }
}
import {
  Calendar,
  Eye,
  FileText,
  Home,
  User,
} from "lucide-react";

import type {
  OfferListItem,
} from "@/types/offer-list";

import type {
  OfferStatus,
} from "@/types/offer";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";

type OfferTableProps = {
  offers: OfferListItem[];
};

export default function OfferTable({
  offers,
}: OfferTableProps) {
  if (offers.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="h-10 w-10" />}
        title="Nincs ajánlat"
        description="Még nem készült egyetlen ajánlat sem."
      />
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <DataTable>
          <thead>
            <tr>
              <th>Ajánlat</th>
              <th>Ügyfél</th>
              <th>Ingatlan</th>
              <th>Összeg</th>
              <th>Státusz</th>
              <th>Lejárat</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td>
                  <div className="font-medium text-slate-900">
                    {offer.title}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {formatVersion(
                      offer.version
                    )}
                  </div>
                </td>

                <td>{offer.clientName}</td>

                <td>{offer.propertyName}</td>

                <td className="font-medium text-slate-900">
                  {formatPrice(
                    offer.amount
                  )}
                </td>

                <td>
                  {renderStatus(
                    offer.status
                  )}
                </td>

                <td>
                  {formatDate(
                    offer.expiresAt
                  )}
                </td>

                <td className="text-right">
                  <Button
                    href={`/offers/${offer.id}`}
                    variant="outline"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Megnyitás
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>

      <div className="space-y-4 lg:hidden">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900">
                  {offer.title}
                </h3>

                <div className="mt-1 text-xs text-slate-500">
                  {formatVersion(
                    offer.version
                  )}
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 shrink-0" />

                    <span className="truncate">
                      {offer.clientName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 shrink-0" />

                    <span className="truncate">
                      {offer.propertyName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0" />

                    <span>
                      {formatDate(
                        offer.expiresAt
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-lg font-semibold text-slate-900">
                  {formatPrice(
                    offer.amount
                  )}
                </div>
              </div>

              <div className="shrink-0">
                {renderStatus(
                  offer.status
                )}
              </div>
            </div>

            <div className="mt-5">
              <Button
                href={`/offers/${offer.id}`}
                className="w-full"
                variant="outline"
              >
                <Eye className="mr-2 h-4 w-4" />
                Megnyitás
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function renderStatus(
  status: OfferStatus
) {
  switch (status) {
    case "draft":
      return (
        <Badge variant="yellow">
          Piszkozat
        </Badge>
      );

    case "sent":
      return (
        <Badge variant="blue">
          Elküldve
        </Badge>
      );

    case "accepted":
      return (
        <Badge variant="green">
          Elfogadva
        </Badge>
      );

    case "rejected":
      return (
        <Badge variant="red">
          Elutasítva
        </Badge>
      );

    case "expired":
      return (
        <Badge variant="purple">
          Lejárt
        </Badge>
      );
  }
}

function formatPrice(
  value: number
): string {
  return `${value.toLocaleString(
    "hu-HU"
  )} Ft`;
}

function formatVersion(
  version: number
): string {
  return `v${version}`;
}

function formatDate(
  value?: string | null
): string {
  if (!value) {
    return "Nincs megadva";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "-";
  }

  return new Intl.DateTimeFormat(
    "hu-HU",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).format(date);
}
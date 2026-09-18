import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Home,
  Pencil,
  User,
} from "lucide-react";

import { offerService } from "@/services/offer-service";

import OfferQuickActions from "@/components/offers/OfferQuickActions";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DetailSection from "@/components/ui/DetailSection";
import HeroCard from "@/components/ui/HeroCard";
import InfoRow from "@/components/ui/InfoRow";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OfferDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const offer =
    await offerService
      .getOfferWithCase(id)
      .catch(() => null);

  if (!offer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link
        href="/offers"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Vissza az ajánlatokhoz
      </Link>

      <HeroCard
        badge={
          <Badge
            variant={statusVariant(
              offer.status
            )}
          >
            {statusLabel(
              offer.status
            )}
          </Badge>
        }
        title={offer.title}
        description="Ajánlat részletei és aktuális állapota."
        aside={
          <Button
            href={`/offers/${offer.id}/edit`}
            variant="outline"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Szerkesztés
          </Button>
        }
      >
        <div className="flex flex-wrap gap-5 text-sm text-blue-100">
          <span>
            Verzió #{offer.version}
          </span>

          {offer.valid_until && (
            <span>
              Érvényes:
              {" "}
              {offer.valid_until}
            </span>
          )}
        </div>
      </HeroCard>

      <OfferQuickActions
        offerId={offer.id}
        status={offer.status}
      />

      <DetailSection
        title="Ajánlat adatai"
      >
        <InfoRow
          label="Cím"
          value={offer.title}
        />

        <InfoRow
          label="Verzió"
          value={offer.version}
        />

        <InfoRow
          label="Státusz"
          value={
            <Badge
              variant={statusVariant(
                offer.status
              )}
            >
              {statusLabel(
                offer.status
              )}
            </Badge>
          }
        />

        <InfoRow
          label="Érvényes"
          value={
            offer.valid_until ??
            "Nincs megadva"
          }
        />

        <InfoRow
          label="Létrehozva"
          value={
            offer.created_at
          }
        />
      </DetailSection>

      <DetailSection
        title="Kapcsolódó ügy"
      >
        {offer.case ? (
          <>
            <InfoRow
              label="Ügy"
              value={offer.case.title}
              icon={
                <FileText className="h-4 w-4" />
              }
            />

            <InfoRow
              label="Státusz"
              value={
                offer.case.status
              }
            />

            <InfoRow
              label="Típus"
              value={
                offer.case.type
              }
            />
          </>
        ) : (
          <p className="text-slate-500">
            Nincs kapcsolódó ügy.
          </p>
        )}
      </DetailSection>

      <DetailSection
        title="Kapcsolódó ügyfél"
      >
        {offer.case?.clients ? (
          <>
            <InfoRow
              label="Név"
              value={`${offer.case.clients.first_name} ${offer.case.clients.last_name}`}
              icon={
                <User className="h-4 w-4" />
              }
            />

            <InfoRow
              label="Telefon"
              value={
                offer.case.clients
                  .phone ??
                "Nincs megadva"
              }
            />

            <InfoRow
              label="E-mail"
              value={
                offer.case.clients
                  .email ??
                "Nincs megadva"
              }
            />
          </>
        ) : (
          <p className="text-slate-500">
            Nincs ügyfél.
          </p>
        )}
      </DetailSection>

      <DetailSection
        title="Kapcsolódó ingatlan"
      >
        {offer.case?.properties ? (
          <>
            <InfoRow
              label="Név"
              value={
                offer.case
                  .properties.title
              }
              icon={
                <Home className="h-4 w-4" />
              }
            />

            <InfoRow
              label="Cím"
              value={[
                offer.case
                  .properties.city,
                offer.case
                  .properties
                  .address,
              ]
                .filter(Boolean)
                .join(", ")}
            />

            <InfoRow
              label="Státusz"
              value={
                offer.case
                  .properties
                  .status ??
                "Nincs megadva"
              }
            />
          </>
        ) : (
          <p className="text-slate-500">
            Nincs ingatlan.
          </p>
        )}
      </DetailSection>

      <DetailSection
        title="Megjegyzések"
      >
        <p className="whitespace-pre-wrap text-slate-700">
          {offer.notes ??
            "Nincs megjegyzés."}
        </p>
      </DetailSection>
    </div>
  );
}

function statusLabel(
  status: string
) {
  switch (status) {
    case "draft":
      return "Piszkozat";
    case "sent":
      return "Elküldve";
    case "accepted":
      return "Elfogadva";
    case "rejected":
      return "Elutasítva";
    case "expired":
      return "Lejárt";
    default:
      return status;
  }
}

function statusVariant(
  status: string
):
  | "default"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple" {
  switch (status) {
    case "draft":
      return "yellow";
    case "sent":
      return "blue";
    case "accepted":
      return "green";
    case "rejected":
      return "red";
    case "expired":
      return "purple";
    default:
      return "default";
  }
}
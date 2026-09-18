import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BedDouble,
  Building2,
  FileText,
  Flame,
  ImageIcon,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Ruler,
  UserRound,
  Wallet,
} from "lucide-react";

import { propertyRepository } from "@/lib/repositories/property-repository";

import { propertyDocumentService } from "@/services/property-document-service";
import { propertyImageService } from "@/services/property-image-service";

import PropertyDocumentList from "@/components/properties/PropertyDocumentList";
import PropertyDocumentUpload from "@/components/properties/PropertyDocumentUpload";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyImageUpload from "@/components/properties/PropertyImageUpload";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DetailSection from "@/components/ui/DetailSection";
import HeroCard from "@/components/ui/HeroCard";
import InfoRow from "@/components/ui/InfoRow";

type PropertyDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;

  const property = await propertyRepository
    .getWithOwner(id)
    .catch(() => null);

  if (!property) {
    notFound();
  }

  const [images, documents] = await Promise.all([
    propertyImageService.getImages(property.id),
    propertyDocumentService.getDocuments(property.id),
  ]);

  return (
    <div className="space-y-8">
      <Link
        href="/properties"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Vissza az ingatlanokhoz
      </Link>

      <HeroCard
        title={property.title}
        description={
          property.reference
            ? `Referencia: ${property.reference}`
            : "Ingatlan adatlap és kapcsolódó információk."
        }
        aside={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            {property.status && (
              <Badge variant="blue">
                {property.status}
              </Badge>
            )}

            <Button
              href={`/properties/${property.id}/edit`}
              variant="outline"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Szerkesztés
            </Button>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-blue-100">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {property.city ?? "Nincs megadott város"}
          </span>

          <span className="inline-flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {property.property_type ?? "Nincs megadott típus"}
          </span>

          <span className="inline-flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            {formatPrice(property.price)}
          </span>
        </div>
      </HeroCard>

      <DetailSection
        title="Képek"
        description="Az ingatlan fotóinak feltöltése és kezelése."
      >
        <div className="space-y-6">
          <PropertyImageUpload propertyId={property.id} />

          <PropertyGallery images={images} />
        </div>
      </DetailSection>

      <DetailSection
        title="Dokumentumok"
        description="Az ingatlanhoz kapcsolódó fájlok és dokumentumok."
      >
        <div className="space-y-6">
          <PropertyDocumentUpload propertyId={property.id} />

          <PropertyDocumentList
            propertyId={property.id}
            documents={documents}
          />
        </div>
      </DetailSection>

      <DetailSection
        title="Alapadatok"
        description="Az ingatlan legfontosabb üzleti és műszaki adatai."
      >
        <InfoRow
          label="Belső azonosító"
          value={property.reference ?? "Nincs megadva"}
          icon={<FileText className="h-4 w-4" />}
        />

        <InfoRow
          label="Státusz"
          value={
            property.status ? (
              <Badge variant="blue">
                {property.status}
              </Badge>
            ) : (
              "Nincs megadva"
            )
          }
        />

        <InfoRow
          label="Ingatlan típusa"
          value={property.property_type ?? "Nincs megadva"}
          icon={<Building2 className="h-4 w-4" />}
        />

        <InfoRow
          label="Ár"
          value={formatPrice(property.price)}
          icon={<Wallet className="h-4 w-4" />}
        />

        <InfoRow
          label="Alapterület"
          value={
            property.area != null
              ? `${property.area} m²`
              : "Nincs megadva"
          }
          icon={<Ruler className="h-4 w-4" />}
        />

        <InfoRow
          label="Szobák"
          value={property.rooms ?? "Nincs megadva"}
          icon={<BedDouble className="h-4 w-4" />}
        />
      </DetailSection>

      <DetailSection
        title="Elhelyezkedés"
        description="Az ingatlan címe és területi adatai."
      >
        <InfoRow
          label="Város"
          value={property.city ?? "Nincs megadva"}
          icon={<MapPin className="h-4 w-4" />}
        />

        <InfoRow
          label="Kerület"
          value={property.district ?? "Nincs megadva"}
        />

        <InfoRow
          label="Irányítószám"
          value={property.postal_code ?? "Nincs megadva"}
        />

        <InfoRow
          label="Cím"
          value={property.address ?? "Nincs megadva"}
          icon={<Building2 className="h-4 w-4" />}
        />
      </DetailSection>

      <DetailSection
        title="Műszaki adatok"
        description="Az ingatlan állapotára és felszereltségére vonatkozó információk."
      >
        <InfoRow
          label="Emelet"
          value={property.floor ?? "Nincs megadva"}
          icon={<Building2 className="h-4 w-4" />}
        />

        <InfoRow
          label="Állapot"
          value={property.condition ?? "Nincs megadva"}
        />

        <InfoRow
          label="Fűtés"
          value={property.heating ?? "Nincs megadva"}
          icon={<Flame className="h-4 w-4" />}
        />
      </DetailSection>

      <DetailSection
        title="Tulajdonos"
        description="Az ingatlanhoz kapcsolódó ügyfél elérhetőségei."
      >
        <InfoRow
          label="Ügyfél"
          value={
            property.clients
              ? `${property.clients.last_name} ${property.clients.first_name}`
              : "Nincs hozzárendelve"
          }
          icon={<UserRound className="h-4 w-4" />}
        />

        <InfoRow
          label="Telefon"
          value={property.clients?.phone ?? "Nincs megadva"}
          icon={<Phone className="h-4 w-4" />}
        />

        <InfoRow
          label="E-mail"
          value={property.clients?.email ?? "Nincs megadva"}
          icon={<Mail className="h-4 w-4" />}
        />
      </DetailSection>

      <DetailSection
        title="Leírás"
        description="Az ingatlan részletes bemutatása és belső megjegyzései."
      >
        <div className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
          {property.description || "Nincs leírás."}
        </div>
      </DetailSection>
    </div>
  );
}

function formatPrice(price: number | null): string {
  if (price == null) {
    return "Nincs megadva";
  }

  return `${price.toLocaleString("hu-HU")} Ft`;
}
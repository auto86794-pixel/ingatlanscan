import Link from "next/link";
import { notFound } from "next/navigation";

import { getPropertyWithOwner } from "@/lib/properties";

import Card from "@/components/ui/Card";
import DetailSection from "@/components/ui/DetailSection";
import InfoRow from "@/components/ui/InfoRow";
import PageTitle from "@/components/ui/PageTitle";

type PropertyDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;

  const property = await getPropertyWithOwner(id).catch(
    () => null
  );

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageTitle
        title={property.title}
        subtitle={property.reference ?? "Ingatlan adatlap"}
        action={
          <Link
            href={`/properties/${property.id}/edit`}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Szerkesztés
          </Link>
        }
      />

      <Card>
        <DetailSection title="Alapadatok">
          <InfoRow
            label="Belső azonosító"
            value={property.reference ?? "-"}
          />

          <InfoRow
            label="Státusz"
            value={property.status ?? "-"}
          />

          <InfoRow
            label="Ingatlan típusa"
            value={property.property_type ?? "-"}
          />

          <InfoRow
            label="Ár"
            value={
              property.price != null
                ? `${property.price.toLocaleString(
                    "hu-HU"
                  )} Ft`
                : "-"
            }
          />

          <InfoRow
            label="Alapterület"
            value={
              property.area != null
                ? `${property.area} m²`
                : "-"
            }
          />

          <InfoRow
            label="Szobák"
            value={property.rooms ?? "-"}
          />
        </DetailSection>
      </Card>

      <Card>
        <DetailSection title="Elhelyezkedés">
          <InfoRow
            label="Város"
            value={property.city ?? "-"}
          />

          <InfoRow
            label="Kerület"
            value={property.district ?? "-"}
          />

          <InfoRow
            label="Irányítószám"
            value={property.postal_code ?? "-"}
          />

          <InfoRow
            label="Cím"
            value={property.address ?? "-"}
          />
        </DetailSection>
      </Card>

      <Card>
        <DetailSection title="Műszaki adatok">
          <InfoRow
            label="Emelet"
            value={property.floor ?? "-"}
          />

          <InfoRow
            label="Állapot"
            value={property.condition ?? "-"}
          />

          <InfoRow
            label="Fűtés"
            value={property.heating ?? "-"}
          />
        </DetailSection>
      </Card>

      <Card>
        <DetailSection title="Tulajdonos">
          <InfoRow
            label="Ügyfél"
            value={
              property.clients
                ? `${property.clients.last_name} ${property.clients.first_name}`
                : "-"
            }
          />

          <InfoRow
            label="Telefon"
            value={property.clients?.phone ?? "-"}
          />

          <InfoRow
            label="Email"
            value={property.clients?.email ?? "-"}
          />
        </DetailSection>
      </Card>

      <Card>
        <DetailSection title="Leírás">
          <div className="whitespace-pre-wrap text-slate-700">
            {property.description || "Nincs leírás."}
          </div>
        </DetailSection>
      </Card>
    </div>
  );
}
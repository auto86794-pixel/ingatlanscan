import { notFound } from "next/navigation";

import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import {
  offerRepository,
} from "@/lib/repositories/offer-repository";

import OfferForm from "@/components/offers/OfferForm";
import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

type EditOfferPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditOfferPage({
  params,
}: EditOfferPageProps) {
  const { id } = await params;

  const [
    offer,
    cases,
  ] = await Promise.all([
    offerRepository.getById(id),
    caseRepository.getAll(),
  ]);

  if (!offer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageTitle
        title="Ajánlat szerkesztése"
        subtitle="Az ajánlat adatainak módosítása"
      />

      <Card>
        <OfferForm
          initialData={offer}
          cases={cases}
        />
      </Card>
    </div>
  );
}
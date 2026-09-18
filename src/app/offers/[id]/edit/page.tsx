import { notFound } from "next/navigation";

import { offerService } from "@/services/offer-service";
import { caseRepository } from "@/lib/repositories/case-repository";

import OfferForm from "@/components/offers/OfferForm";
import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditOfferPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [offer, cases] =
    await Promise.all([
      offerService
        .getOffer(id)
        .catch(() => null),
      caseRepository.getAll(),
    ]);

  if (!offer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageTitle
        title="Ajánlat szerkesztése"
        subtitle={`Verzió #${offer.version}`}
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
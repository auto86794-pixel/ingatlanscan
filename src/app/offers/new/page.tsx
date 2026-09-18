import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import OfferForm from "@/components/offers/OfferForm";
import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

export default async function NewOfferPage() {
  const cases =
    await caseRepository.getAll();

  return (
    <div className="space-y-6">
      <PageTitle
        title="Új ajánlat"
        subtitle="Új ajánlat létrehozása"
      />

      <Card>
        <OfferForm
          cases={cases}
        />
      </Card>
    </div>
  );
}
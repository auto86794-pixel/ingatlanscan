import { Plus } from "lucide-react";

import { offerService } from "@/services/offer-service";

import OfferTable from "@/app/offers/OfferTable";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

/**
 * Ajánlatok.
 */
export default async function OffersPage() {
  const offers =
    await offerService.getOffers();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Ajánlatok"
        description="Értékesítési ajánlatok kezelése."
        actions={
          <Button
            href="/offers/new"
            variant="primary"
          >
            <Plus className="mr-2 h-4 w-4" />
            Új ajánlat
          </Button>
        }
      >
        <Badge variant="blue">
          {offers.length} ajánlat
        </Badge>
      </PageHeader>

      <OfferTable offers={offers} />
    </div>
  );
}
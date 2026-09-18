import {
  clientRepository,
} from "@/lib/repositories/client-repository";

import PropertyForm from "@/components/properties/PropertyForm";
import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

export default async function NewPropertyPage() {
  const clients =
    await clientRepository.getAll();

  return (
    <div className="space-y-6">
      <PageTitle
        title="Új ingatlan"
        subtitle="Új ingatlan rögzítése"
      />

      <Card>
        <PropertyForm
          clients={clients}
        />
      </Card>
    </div>
  );
}
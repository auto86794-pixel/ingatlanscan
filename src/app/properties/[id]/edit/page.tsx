import { notFound } from "next/navigation";

import { getProperty } from "@/lib/properties";

import {
  clientRepository,
} from "@/lib/repositories/client-repository";

import PropertyForm from "@/components/properties/PropertyForm";
import PageTitle from "@/components/ui/PageTitle";
import Card from "@/components/ui/Card";

type EditPropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;

  const [property, clients] =
    await Promise.all([
      getProperty(id).catch(
        () => null
      ),

      clientRepository.getAll(),
    ]);

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageTitle
        title="Ingatlan szerkesztése"
        subtitle={
          property.reference ??
          property.title
        }
      />

      <Card>
        <PropertyForm
          initialData={property}
          clients={clients}
        />
      </Card>
    </div>
  );
}
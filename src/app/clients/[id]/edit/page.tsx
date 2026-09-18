import { notFound } from "next/navigation";

import {
  clientRepository,
} from "@/lib/repositories/client-repository";

import ClientForm from "@/components/client/ClientForm";
import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

type EditClientPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditClientPage({
  params,
}: EditClientPageProps) {
  const { id } = await params;

  const client =
    await clientRepository
      .getById(id)
      .catch(() => null);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageTitle
        title={`${client.last_name} ${client.first_name}`}
        subtitle="Ügyfél szerkesztése"
      />

      <Card>
        <ClientForm
          initialData={client}
        />
      </Card>
    </div>
  );
}
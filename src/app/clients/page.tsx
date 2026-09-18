import { Users } from "lucide-react";

import { clientService } from "@/services/client-service";

import ClientTable from "@/components/client/ClientTable";
import ClientsToolbar from "@/components/client/ClientsToolbar";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    city?: string;
    status?: string;
  }>;
};

export default async function ClientsPage({
  searchParams,
}: PageProps) {
  const filters = await searchParams;

  const clients =
    await clientService.getClients({
      search: filters.search,
      city: filters.city,
      status: filters.status,
    });

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <PageHeader
          title="Ügyfelek"
          description="Kezeld és keresd ügyfeleidet egy modern, gyors és átlátható felületen."
          actions={
            <div className="flex items-center gap-3">
              <Badge variant="blue">
                {clients.length} ügyfél
              </Badge>

              <Button
                href="/clients/new"
                variant="primary"
              >
                <Users className="mr-2 h-4 w-4" />
                Új ügyfél
              </Button>
            </div>
          }
        />

        <ClientsToolbar
          search={filters.search}
          city={filters.city}
          status={filters.status}
        />

        <ClientTable
          clients={clients}
        />
      </div>
    </main>
  );
}
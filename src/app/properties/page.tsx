import { Building2 } from "lucide-react";

import { propertyService } from "@/services/property-service";

import PropertiesToolbar from "@/components/properties/PropertiesToolbar";
import PropertyTable from "@/components/properties/PropertyTable";

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

export default async function PropertiesPage({
  searchParams,
}: PageProps) {
  const filters = await searchParams;

  const properties =
    await propertyService.getProperties({
      search: filters.search,
      city: filters.city,
      status: filters.status,
    });

  return (
    <main className="space-y-8">
      <PageHeader
        title="Ingatlanok"
        description="Kezeld és keresd ingatlanjaidat egy gyors, áttekinthető felületen."
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="blue">
              {properties.length} ingatlan
            </Badge>

            <Button
              href="/properties/new"
              variant="primary"
            >
              <Building2 className="mr-2 h-4 w-4" />
              Új ingatlan
            </Button>
          </div>
        }
      />

      <PropertiesToolbar
        search={filters.search}
        city={filters.city}
        status={filters.status}
      />

      <PropertyTable
        properties={properties}
      />
    </main>
  );
}
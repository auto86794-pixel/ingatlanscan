import { BriefcaseBusiness } from "lucide-react";

import CaseTable from "@/components/cases/CaseTable";
import CasesToolbar from "@/components/cases/CasesToolbar";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

import { caseService } from "@/services/case-service";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    priority?: string;
  }>;
};

export default async function CasesPage({
  searchParams,
}: PageProps) {
  const filters = await searchParams;

  const cases = await caseService.getCases({
    search: filters.search,
    status: filters.status,
    priority: filters.priority,
  });

  return (
    <main className="space-y-8">
      <PageHeader
        title="Ügyek"
        description="Kezeld az aktív, függőben lévő és lezárt ügyeket egyetlen áttekinthető felületen."
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="blue">
              {cases.length} ügy
            </Badge>

            <Button
              href="/cases/new"
              variant="primary"
            >
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              Új ügy
            </Button>
          </div>
        }
      />

      <CasesToolbar
        search={filters.search}
        status={filters.status}
        priority={filters.priority}
      />

      <CaseTable cases={cases} />
    </main>
  );
}
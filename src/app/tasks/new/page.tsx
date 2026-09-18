import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import TaskForm from "@/components/tasks/TaskForm";
import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

type NewTaskPageProps = {
  searchParams: Promise<{
    start_at?: string;
  }>;
};

export default async function NewTaskPage({
  searchParams,
}: NewTaskPageProps) {
  const resolvedSearchParams =
    await searchParams;

  const cases =
    await caseRepository.getAll();

  return (
    <div className="space-y-6">
      <PageTitle
        title="Új feladat"
        subtitle="Új feladat rögzítése"
      />

      <Card>
        <TaskForm
          cases={cases}
          initialStartAt={
            resolvedSearchParams.start_at
          }
        />
      </Card>
    </div>
  );
}
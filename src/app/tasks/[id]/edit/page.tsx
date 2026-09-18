import { notFound } from "next/navigation";

import { getTask } from "@/lib/tasks";

import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import TaskForm from "@/components/tasks/TaskForm";
import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

type EditTaskPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTaskPage({
  params,
}: EditTaskPageProps) {
  const { id } = await params;

  const task = await getTask(id);

  if (!task) {
    notFound();
  }

  const cases =
    await caseRepository.getAll();

  return (
    <div className="space-y-6">
      <PageTitle
        title="Feladat szerkesztése"
        subtitle={task.title}
      />

      <Card>
        <TaskForm
          initialData={task}
          cases={cases}
        />
      </Card>
    </div>
  );
}
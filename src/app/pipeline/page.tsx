import PipelineBoard from "@/components/pipeline/PipelineBoard";
import PageTitle from "@/components/ui/PageTitle";

import { getPipelineItems } from "@/services/pipeline-service";

export default async function PipelinePage() {
  const items = await getPipelineItems();

  return (
    <div className="space-y-8">
      <PageTitle
        title="Pipeline"
        subtitle="Az ügyek vizuális áttekintése Kanban nézetben."
      />

      <PipelineBoard items={items} />
    </div>
  );
}
import { caseRepository } from "@/lib/repositories/case-repository";

import type {
  CaseWithClient,
} from "@/types/case";

import type {
  PipelineCard,
  PipelineColumnId,
} from "@/types/pipeline";

function mapCaseToPipelineCard(
  item: CaseWithClient
): PipelineCard {
  return {
    id: item.id,

    case: item,

    clientName:
      item.clients
        ? `${item.clients.first_name} ${item.clients.last_name}`
        : "Nincs ügyfél",

    propertyTitle:
      item.properties?.title ?? undefined,

    price:
      item.properties?.price ?? null,

    updatedAt:
      item.updated_at,
  };
}

/**
 * Pipeline kártyák lekérése.
 */
export async function getPipelineItems(): Promise<
  PipelineCard[]
> {
  const cases =
    await caseRepository.getPipelineCases();

  return cases.map(
    mapCaseToPipelineCard
  );
}

/**
 * Pipeline állapot módosítása.
 */
export async function updatePipelineStage(
  id: string,
  stage: PipelineColumnId
) {
  return caseRepository.updatePipelineStage(
    id,
    stage
  );
}
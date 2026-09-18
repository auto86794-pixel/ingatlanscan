import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import { createTimelineEvent } from "@/lib/timeline";

import type {
  Case,
  CaseWithClient,
  CreateCaseInput,
  UpdateCaseInput,
} from "@/types/case";

/**
 * Régi API kompatibilitási wrapper.
 */

export async function createCase(
  data: CreateCaseInput
): Promise<Case> {
  const item =
    await caseRepository.create(data);

  await createTimelineEvent({
    case_id: item.id,

    client_id: item.client_id,

    type: "case_created",

    title: "Új ügy létrehozva",

    description:
      item.title,

    metadata: {
      case_number:
        item.case_number,
    },
  });

  return item;
}

export async function getCases(): Promise<
  CaseWithClient[]
> {
  return caseRepository.getAll();
}

export async function getCase(
  id: string
): Promise<CaseWithClient | null> {
  return caseRepository.getById(
    id
  );
}

export async function getCaseWithClient(
  id: string
): Promise<CaseWithClient | null> {
  return caseRepository.getWithClient(
    id
  );
}

export async function updateCase(
  id: string,
  data: UpdateCaseInput
): Promise<Case> {
  return caseRepository.update(
    id,
    data
  );
}

export async function deleteCase(
  id: string
): Promise<void> {
  return caseRepository.delete(
    id
  );
}
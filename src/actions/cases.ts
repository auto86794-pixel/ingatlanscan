"use server";

import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import type {
  CreateCaseInput,
} from "@/types/case";

export async function createCase(
  data: CreateCaseInput
): Promise<boolean> {
  await caseRepository.create({
    ...data,
    priority:
      data.priority ?? null,
    description:
      data.description ?? null,
  });

  return true;
}
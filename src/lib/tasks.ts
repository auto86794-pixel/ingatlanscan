import {
  taskRepository,
} from "@/lib/repositories/task-repository";

import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from "@/types/task";

/**
 * Régi API kompatibilitási wrapper.
 */

export async function getTasks(): Promise<
  Task[]
> {
  return taskRepository.getAll();
}

/**
 * Adott ügy feladatainak lekérése.
 */
export async function getCaseTasks(
  caseId: string
): Promise<Task[]> {
  return taskRepository.getByCase(
    caseId
  );
}

/**
 * Egy feladat lekérése.
 */
export async function getTask(
  id: string
): Promise<Task | null> {
  return taskRepository.getById(
    id
  );
}

/**
 * Új feladat.
 */
export async function createTask(
  input: CreateTaskInput
): Promise<Task> {
  return taskRepository.create(
    input
  );
}

/**
 * Feladat módosítása.
 */
export async function updateTask(
  id: string,
  input: UpdateTaskInput
): Promise<Task> {
  return taskRepository.update(
    id,
    input
  );
}

/**
 * Feladat törlése.
 */
export async function deleteTask(
  id: string
): Promise<void> {
  return taskRepository.delete(
    id
  );
}
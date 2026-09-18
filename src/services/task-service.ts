import { taskRepository } from "@/lib/repositories/task-repository";

import { activityService } from "@/services/activity-service";

import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@/types/task";

export const taskService = {
  async getTasks() {
    return taskRepository.getAll();
  },

  async getTask(id: string) {
    return taskRepository.getById(id);
  },

  async createTask(
    data: CreateTaskInput
  ) {
    const task =
      await taskRepository.create(data);

    if (task.case_id) {
      await activityService.log({
        caseId: task.case_id,

        type: "task_created",

        title: "Feladat létrehozva",

        description: task.title,
      });
    }

    return task;
  },

  async updateTask(
    id: string,
    data: UpdateTaskInput
  ) {
    const task =
      await taskRepository.update(
        id,
        data
      );

    if (
      data.status === "done" &&
      task.case_id
    ) {
      await activityService.log({
        caseId: task.case_id,

        type: "task_completed",

        title: "Feladat befejezve",

        description: task.title,
      });
    }

    return task;
  },

  async deleteTask(
    id: string
  ) {
    return taskRepository.delete(id);
  },
};
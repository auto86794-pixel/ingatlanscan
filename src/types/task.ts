export type TaskStatus =
  | "todo"
  | "in_progress"
  | "waiting"
  | "done"
  | "cancelled";

export type TaskPriority =
  | "low"
  | "normal"
  | "high"
  | "urgent";

export type TaskType =
  | "task"
  | "meeting"
  | "call"
  | "visit";

export interface Task {
  id: string;

  title: string;

  description: string | null;

  type: TaskType;

  status: TaskStatus;

  priority: TaskPriority;

  due_date: string | null;

  start_at: string | null;

  end_at: string | null;

  completed_at: string | null;

  case_id: string | null;

  sort_order: number;

  created_at: string;

  updated_at: string;
}

export interface CreateTaskInput {
  title: string;

  description?: string | null;

  type?: TaskType;

  status?: TaskStatus;

  priority?: TaskPriority;

  due_date?: string | null;

  start_at?: string | null;

  end_at?: string | null;

  completed_at?: string | null;

  case_id?: string | null;

  sort_order?: number;
}

export interface UpdateTaskInput {
  title?: string;

  description?: string | null;

  type?: TaskType;

  status?: TaskStatus;

  priority?: TaskPriority;

  due_date?: string | null;

  start_at?: string | null;

  end_at?: string | null;

  completed_at?: string | null;

  case_id?: string | null;

  sort_order?: number;
}
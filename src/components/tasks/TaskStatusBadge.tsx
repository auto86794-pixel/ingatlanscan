import type {
  TaskStatus,
} from "@/types/task";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<
  TaskStatus,
  {
    label: string;
    className: string;
  }
> = {
  todo: {
    label: "Teendő",
    className:
      "bg-slate-100 text-slate-700",
  },
  in_progress: {
    label: "Folyamatban",
    className:
      "bg-blue-100 text-blue-700",
  },
  waiting: {
    label: "Várakozik",
    className:
      "bg-amber-100 text-amber-700",
  },
  done: {
    label: "Kész",
    className:
      "bg-emerald-100 text-emerald-700",
  },
  cancelled: {
    label: "Törölve",
    className:
      "bg-red-100 text-red-700",
  },
};

export default function TaskStatusBadge({
  status,
}: TaskStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
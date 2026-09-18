import type {
  TaskPriority,
} from "@/types/task";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

const priorityConfig: Record<
  TaskPriority,
  {
    label: string;
    className: string;
  }
> = {
  low: {
    label: "Alacsony",
    className:
      "bg-slate-100 text-slate-700",
  },
  normal: {
    label: "Normál",
    className:
      "bg-blue-100 text-blue-700",
  },
  high: {
    label: "Magas",
    className:
      "bg-orange-100 text-orange-700",
  },
  urgent: {
    label: "Sürgős",
    className:
      "bg-red-100 text-red-700",
  },
};

export default function TaskPriorityBadge({
  priority,
}: TaskPriorityBadgeProps) {
  const config =
    priorityConfig[priority];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
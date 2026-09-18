type PriorityBadgeProps = {
  priority: string | null;
};

export default function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  const value =
    priority?.toLowerCase() ?? "";

  switch (value) {
    case "high":
    case "magas":
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          🔴 Magas
        </span>
      );

    case "medium":
    case "közepes":
      return (
        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          🟠 Közepes
        </span>
      );

    case "low":
    case "alacsony":
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          🟢 Alacsony
        </span>
      );

    case "urgent":
    case "sürgős":
      return (
        <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
          🚨 Sürgős
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {priority ?? "-"}
        </span>
      );
  }
}
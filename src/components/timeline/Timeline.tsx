import type { TimelineItem } from "@/types/timeline";

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({
  items,
}: TimelineProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
        Még nincs idővonal esemény.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">
            {item.icon}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-medium text-slate-900">
                {item.title}
              </h3>

              <span className="text-xs text-slate-500 whitespace-nowrap">
                {new Date(
                  item.created_at
                ).toLocaleString("hu-HU")}
              </span>
            </div>

            {item.description && (
              <p className="mt-2 text-sm text-slate-600">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
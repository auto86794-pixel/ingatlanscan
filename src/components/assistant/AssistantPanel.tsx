"use client";

import Link from "next/link";

import type {
  AssistantAction,
  AssistantItem,
} from "@/types/assistant";

type AssistantPanelProps = {
  items: AssistantItem[];
};

export default function AssistantPanel({
  items,
}: AssistantPanelProps) {
  if (items.length === 0) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎉</div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Minden rendben!
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Ma jelenleg nincs olyan feladat, amely azonnali figyelmet igényel.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const visibleItems = items.slice(0, 3);
  const hiddenCount =
    items.length - visibleItems.length;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            📋 A mai teendőid
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Ezekkel érdemes kezdened a napot.
          </p>
        </div>

        <div className="self-start rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          {items.length} teendő
        </div>
      </header>

      <div className="space-y-4">
        {visibleItems.map((item) => (
          <AssistantItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-600">
          Még <strong>{hiddenCount}</strong> további ajánlás vár rád.
        </div>
      )}
    </section>
  );
}

type AssistantItemCardProps = {
  item: AssistantItem;
};

function AssistantItemCard({
  item,
}: AssistantItemCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {item.title}
          </h3>

          {item.subtitle && (
            <p className="mt-1 text-sm text-slate-600">
              {item.subtitle}
            </p>
          )}

          <p className="mt-3 text-sm text-slate-500">
            {item.reason}
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {item.priority}
        </span>
      </div>

      {item.actions.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {item.actions.map((action) => (
            <ActionButton
              key={action.id}
              action={action}
            />
          ))}
        </div>
      )}
    </article>
  );
}

type ActionButtonProps = {
  action: AssistantAction;
};

function ActionButton({
  action,
}: ActionButtonProps) {
  const className = [
    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition",
    action.primary
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
  ].join(" ");

  if (action.href) {
    return (
      <Link
        href={action.href}
        className={className}
      >
        {action.icon && <span>{action.icon}</span>}
        {action.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      disabled={action.disabled}
    >
      {action.icon && <span>{action.icon}</span>}
      {action.label}
    </button>
  );
}
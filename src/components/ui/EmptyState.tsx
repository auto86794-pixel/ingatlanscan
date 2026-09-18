import type { ReactNode } from "react";

type EmptyStateProps = {
  /**
   * Opcionális ikon.
   */
  icon?: ReactNode;

  /**
   * Fő cím.
   */
  title: string;

  /**
   * Opcionális leírás.
   */
  description?: string;

  /**
   * Opcionális művelet.
   */
  action?: ReactNode;

  /**
   * Extra Tailwind osztályok.
   */
  className?: string;
};

export default function EmptyState({
  icon = "📄",
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={[
        "rounded-2xl",
        "border-2",
        "border-dashed",
        "border-slate-300",
        "bg-slate-50/40",
        "px-8",
        "py-12",
        "text-center",
        className,
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
        <div className="text-3xl">{icon}</div>
      </div>

      <h3 className="mt-6 text-lg font-semibold text-slate-900">
        {title}
      </h3>

      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-8 flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
}
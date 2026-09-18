import type { ReactNode } from "react";

type InfoRowProps = {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export default function InfoRow({
  label,
  value,
  icon,
  className,
}: InfoRowProps) {
  return (
    <div
      className={[
        "grid gap-2 border-b border-slate-100 py-4 last:border-b-0 md:grid-cols-3 md:gap-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        {icon && (
          <span className="flex h-4 w-4 items-center justify-center text-slate-400">
            {icon}
          </span>
        )}

        <span>{label}</span>
      </div>

      <div className="break-words text-sm font-medium leading-6 text-slate-900 md:col-span-2">
        {value}
      </div>
    </div>
  );
}
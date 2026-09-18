import type { ReactNode } from "react";

type FormActionsProps = {
  children: ReactNode;

  className?: string;
};

/**
 * Űrlap műveleti gombjai.
 *
 * Mentés, Mégse stb.
 */
export default function FormActions({
  children,
  className = "",
}: FormActionsProps) {
  return (
    <div
      className={[
        "flex flex-wrap items-center justify-end gap-3",
        "border-t border-slate-200 pt-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
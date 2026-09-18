import type { ReactNode } from "react";

type FormGridProps = {
  children: ReactNode;

  columns?: 1 | 2;

  className?: string;
};

/**
 * Egységes rács elrendezés
 * minden HomeFlow űrlaphoz.
 */
export default function FormGrid({
  children,
  columns = 2,
  className = "",
}: FormGridProps) {
  return (
    <div
      className={[
        "grid gap-6",
        columns === 1
          ? "grid-cols-1"
          : "grid-cols-1 lg:grid-cols-2",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
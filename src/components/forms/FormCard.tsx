import type { ReactNode } from "react";

type FormCardProps = {
  children: ReactNode;

  className?: string;
};

/**
 * Egységes kártya minden HomeFlow űrlaphoz.
 */
export default function FormCard({
  children,
  className = "",
}: FormCardProps) {
  return (
    <div
      className={[
        "rounded-2xl",
        "border",
        "border-slate-200",
        "bg-white",
        "p-6",
        "shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
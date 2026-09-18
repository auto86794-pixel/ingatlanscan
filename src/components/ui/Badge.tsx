import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple";

type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;

  /**
   * Színváltozat.
   */
  variant?: BadgeVariant;

  /**
   * Méret.
   */
  size?: BadgeSize;

  /**
   * Extra Tailwind osztályok.
   */
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default:
    "border border-slate-200 bg-slate-100 text-slate-700",

  blue:
    "border border-blue-200 bg-blue-100 text-blue-700",

  green:
    "border border-emerald-200 bg-emerald-100 text-emerald-700",

  yellow:
    "border border-amber-200 bg-amber-100 text-amber-700",

  red:
    "border border-red-200 bg-red-100 text-red-700",

  purple:
    "border border-violet-200 bg-violet-100 text-violet-700",
};

const sizes: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full font-semibold",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
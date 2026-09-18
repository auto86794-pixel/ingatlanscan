import type { SelectHTMLAttributes } from "react";

type SelectSize = "sm" | "md" | "lg";

type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  /**
   * Design System méret.
   */
  size?: SelectSize;

  /**
   * Hibás állapot.
   */
  error?: boolean;
};

export default function Select({
  className = "",
  size = "md",
  error = false,
  disabled = false,
  children,
  ...props
}: SelectProps) {
  const sizeClass = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-base",
  };

  return (
    <select
      {...props}
      disabled={disabled}
      className={[
        "w-full",
        "rounded-xl",
        "border",
        "bg-white",
        "shadow-sm",
        "outline-none",
        "transition-all duration-200",

        sizeClass[size],

        error
          ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
          : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100",

        disabled
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "",

        className,
      ].join(" ")}
    >
      {children}
    </select>
  );
}
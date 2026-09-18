import type {
  TextareaHTMLAttributes,
} from "react";

type TextareaSize = "sm" | "md" | "lg";

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> & {
  /**
   * Design System méret.
   */
  size?: TextareaSize;

  /**
   * Hibás állapot.
   */
  error?: boolean;
};

export default function Textarea({
  className = "",
  size = "md",
  error = false,
  disabled = false,
  ...props
}: TextareaProps) {
  const sizeClass = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-base",
  };

  return (
    <textarea
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
        "placeholder:text-slate-400",
        "resize-y",

        sizeClass[size],

        error
          ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
          : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100",

        disabled
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "",

        className,
      ].join(" ")}
    />
  );
}
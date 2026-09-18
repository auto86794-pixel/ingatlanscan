import type {
  HTMLAttributes,
  ReactNode,
} from "react";

type CardVariant =
  | "default"
  | "flat"
  | "premium";

type CardPadding =
  | "none"
  | "sm"
  | "md"
  | "lg";

type CardProps =
  HTMLAttributes<HTMLElement> & {
    children: ReactNode;
    className?: string;
    variant?: CardVariant;
    padding?: CardPadding;
    hover?: boolean;
  };

export default function Card({
  children,
  className = "",
  variant = "default",
  padding = "lg",
  hover = false,
  ...props
}: CardProps) {
  const variantClass = {
    default:
      "border border-slate-200 bg-white shadow-sm",

    flat:
      "border border-slate-200 bg-slate-50",

    premium:
      "border border-amber-700/30 bg-stone-900 text-stone-100 shadow-xl",
  };

  const paddingClass = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <section
      {...props}
      className={[
        "rounded-2xl",
        "transition-all duration-200",

        variantClass[variant],

        paddingClass[padding],

        hover
          ? "hover:-translate-y-0.5 hover:shadow-md"
          : "",

        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger";

type ButtonSize =
  | "sm"
  | "md";

interface ButtonProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "disabled"
  > {
  children: ReactNode;

  href?: string;

  type?:
    | "button"
    | "submit"
    | "reset";

  variant?: ButtonVariant;

  size?: ButtonSize;

  className?: string;

  onClick?: () => void;
}

const variants: Record<
  ButtonVariant,
  string
> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700",

  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

const sizes: Record<
  ButtonSize,
  string
> = {
  sm:
    "rounded-lg px-3 py-2 text-sm",

  md:
    "rounded-xl px-5 py-3 text-sm",
};

const baseClass =
  "inline-flex items-center justify-center font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50";

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  const classes = [
    baseClass,
    variants[variant],
    sizes[size],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
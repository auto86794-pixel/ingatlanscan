import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ActionButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger";

type ActionButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;

    icon?: ReactNode;

    variant?: ActionButtonVariant;

    fullWidth?: boolean;

    loading?: boolean;
  };

export default function ActionButton({
  children,
  icon,
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled,
  className = "",
  ...props
}: ActionButtonProps) {
  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200",

    success:
      "bg-green-600 text-white hover:bg-green-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      disabled={
        disabled || loading
      }
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-xl",
        "px-5",
        "py-3",
        "font-medium",
        "transition",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        fullWidth
          ? "w-full"
          : "",
        variantClasses[
          variant
        ],
        className,
      ].join(" ")}
    >
      {loading ? (
        <>
          <span>
            ⏳
          </span>

          <span>
            Betöltés...
          </span>
        </>
      ) : (
        <>
          {icon && (
            <span>{icon}</span>
          )}

          <span>
            {children}
          </span>
        </>
      )}
    </button>
  );
}
import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;

  children: ReactNode;

  description?: string;

  error?: string;

  required?: boolean;
};

/**
 * Egységes mező minden HomeFlow űrlaphoz.
 */
export default function FormField({
  label,
  children,
  description,
  error,
  required = false,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}

      {description && (
        <p className="text-xs text-slate-500">
          {description}
        </p>
      )}

      {error && (
        <p className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
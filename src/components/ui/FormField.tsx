import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;

  htmlFor?: string;

  required?: boolean;

  helperText?: string;

  error?: string;

  children: ReactNode;
};

export default function FormField({
  label,
  htmlFor,
  required = false,
  helperText,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-900"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {children}

      {error ? (
        <p className="text-sm text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-sm text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
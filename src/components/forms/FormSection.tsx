import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;

  description?: string;

  children: ReactNode;
};

/**
 * Űrlap szekció.
 */
export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
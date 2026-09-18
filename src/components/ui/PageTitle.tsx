import { ReactNode } from "react";

type PageTitleProps = {
  title: string;

  subtitle?: string;

  action?: ReactNode;
};

export default function PageTitle({
  title,
  subtitle,
  action,
}: PageTitleProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
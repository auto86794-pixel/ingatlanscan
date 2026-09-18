import type { ReactNode } from "react";

interface HeroCardProps {
  badge?: ReactNode;
  title: string;
  description: string;
  aside?: ReactNode;
  children?: ReactNode;
}

export default function HeroCard({
  badge,
  title,
  description,
  aside,
  children,
}: HeroCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          {badge && (
            <div className="mb-4">
              {badge}
            </div>
          )}

          <h2 className="text-3xl font-bold tracking-tight">
            {title}
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-blue-100">
            {description}
          </p>

          {children && (
            <div className="mt-6">
              {children}
            </div>
          )}
        </div>

        {aside && (
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur lg:min-w-72">
            {aside}
          </div>
        )}
      </div>
    </div>
  );
}
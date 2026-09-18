import type { ReactNode } from "react";

type ToolbarProps = {
  children: ReactNode;
};

export default function Toolbar({
  children,
}: ToolbarProps) {
  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        {children}
      </div>
    </div>
  );
}
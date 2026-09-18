import type { ReactNode } from "react";

type TableRowProps = {
  children: ReactNode;
};

export default function TableRow({
  children,
}: TableRowProps) {
  return (
    <tr className="border-b transition hover:bg-slate-50">
      {children}
    </tr>
  );
}
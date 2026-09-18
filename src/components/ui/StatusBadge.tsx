type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles: Record<string, string> = {
    Új: "bg-gray-100 text-gray-700",
    Folyamatban: "bg-blue-100 text-blue-700",
    Függőben: "bg-yellow-100 text-yellow-700",
    Lezárt: "bg-green-100 text-green-700",
    Törölve: "bg-red-100 text-red-700",
  };

  const className =
    styles[status] ?? "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${className}`}
    >
      {status}
    </span>
  );
}
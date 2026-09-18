import Card from "@/components/ui/Card";

type DashboardStatCardProps = {
  /**
   * Ikon.
   */
  icon: string;

  /**
   * Widget címe.
   */
  title: string;

  /**
   * Megjelenített érték.
   */
  value: number | string;
};

export default function DashboardStatCard({
  icon,
  title,
  value,
}: DashboardStatCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="text-3xl">
        {icon}
      </div>

      <div>
        <h2 className="text-sm font-medium text-slate-500">
          {title}
        </h2>

        <p className="mt-2 text-4xl font-bold text-slate-900">
          {value}
        </p>
      </div>
    </Card>
  );
}
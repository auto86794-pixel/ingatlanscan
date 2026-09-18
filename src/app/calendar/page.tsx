import { getCalendarEvents } from "@/lib/calendar";

import Calendar from "@/components/calendar/Calendar";
import PageTitle from "@/components/ui/PageTitle";

export default async function CalendarPage() {
  const events = await getCalendarEvents();

  return (
    <div className="space-y-8">
      <PageTitle
        title="Naptár"
        subtitle="Események és feladatok"
      />

      <Calendar events={events} />
    </div>
  );
}
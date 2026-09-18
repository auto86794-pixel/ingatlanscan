import AssistantHero from "@/components/dashboard/assistant-hero/AssistantHero";
import DashboardStatOverview from "@/components/dashboard/DashboardStatOverview";
import LatestPropertiesSection from "@/components/dashboard/LatestPropertiesSection";
import NextMeetingSection from "@/components/dashboard/NextMeetingSection";
import QuickActionsSection from "@/components/dashboard/QuickActionsSection";
import RecentActivitySection from "@/components/dashboard/RecentActivitySection";
import TodayTasksSection from "@/components/dashboard/TodayTasksSection";

import { dashboardService } from "@/services/dashboard-service";

export default async function DashboardPage() {
  const dashboard =
    await dashboardService.getDashboard();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-sky-50 to-slate-100">
      {/* Háttér fényfoltok */}
      <div className="absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />

        <div className="absolute right-0 top-0 h-[32rem] w-[32rem] rounded-full bg-blue-200/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-200/15 blur-3xl" />
      </div>

      {/* Finom mintázat */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.045)_1px,transparent_0)] bg-[size:32px_32px] opacity-40" />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 xl:px-12">
        <div className="space-y-12">
          {dashboard.hero && (
            <AssistantHero
              model={dashboard.hero}
            />
          )}

          <DashboardStatOverview
            stats={dashboard.stats}
            nextMeeting={dashboard.nextMeeting}
          />

          <QuickActionsSection />

          <div className="grid gap-8 2xl:grid-cols-[1.7fr_1fr]">
            <TodayTasksSection />

            <NextMeetingSection />
          </div>

          <div className="grid gap-8 2xl:grid-cols-[1.45fr_1fr]">
            <LatestPropertiesSection />

            <RecentActivitySection
              activities={
                dashboard.recentActivities
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
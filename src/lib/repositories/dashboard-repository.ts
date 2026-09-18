import {
  assistantContextBuilder,
} from "@/assistant/assistant-context-builder";

import {
  runAssistant,
} from "@/assistant/assistant-engine";

import {
  assistantRules,
} from "@/assistant/assistant-registry";

import {
  caseRepository,
} from "@/lib/repositories/case-repository";

import {
  taskRepository,
} from "@/lib/repositories/task-repository";

import {
  offerService,
} from "@/services/offer-service";

import type {
  CalendarEvent,
} from "@/types/calendar";

import type {
  DashboardActivity,
  DashboardData,
  DashboardStats,
} from "@/types/dashboard";

/**
 * Dashboard Repository.
 *
 * A Dashboard összes adatát
 * egyetlen helyről szolgáltatja.
 */
export class DashboardRepository {
  /**
   * Dashboard adatainak betöltése.
   */
  async getDashboard(): Promise<DashboardData> {
    const context =
      await assistantContextBuilder.build();

    const {
      now,
      events: todayEvents,
    } = context;

    const assistantItems =
      runAssistant(
        context,
        assistantRules
      );

    const nextMeeting =
      todayEvents.find((event) => {
        if (!event.start_at) {
          return false;
        }

        return (
          new Date(
            event.start_at
          ) >= now
        );
      }) ?? null;

    const [
      stats,
      todayTasks,
      recentActivities,
    ] = await Promise.all([
      this.buildStats(
        todayEvents,
        now
      ),
      taskRepository.getTodayTasks(),
      this.buildRecentActivities(),
    ]);

    return {
      todayEvents,
      todayTasks,
      recentActivities,
      nextMeeting,
      assistantItems,
      stats,
    };
  }

  /**
   * Legutóbbi aktivitások.
   */
  private async buildRecentActivities(): Promise<
    DashboardActivity[]
  > {
    const [
      recentCases,
      recentTasks,
    ] = await Promise.all([
      caseRepository.getRecent(5),
      taskRepository.getRecent(5),
    ]);

    const activities: DashboardActivity[] = [
      ...recentCases.map((item) => ({
        id: item.id,
        type: "case" as const,
        icon: "📂",
        title: item.title,
        subtitle: item.clients
          ? `${item.clients.first_name} ${item.clients.last_name}`
          : "Ügy",
        createdAt:
          item.created_at,
        href: `/cases/${item.id}`,
      })),

      ...recentTasks.map((item) => ({
        id: item.id,
        type: "task" as const,
        icon: "✅",
        title: item.title,
        subtitle:
          item.status ??
          "Feladat",
        createdAt:
          item.created_at,
        href: `/tasks/${item.id}`,
      })),
    ];

    return activities
      .sort(
        (a, b) =>
          new Date(
            b.createdAt ?? 0
          ).getTime() -
          new Date(
            a.createdAt ?? 0
          ).getTime()
      )
      .slice(0, 10);
  }

  /**
   * Dashboard statisztikák
   * összeállítása.
   */
  private async buildStats(
    events: CalendarEvent[],
    now: Date
  ): Promise<DashboardStats> {
    const [
      activeCases,
      openFollowUps,
      pendingOffers,
    ] = await Promise.all([
      caseRepository.getCount(),
      taskRepository.getOpenCount(),
      offerService.getPendingOfferCount(),
    ]);

    return {
      activeCases,

      meetingsToday:
        events.length,

      upcomingMeetings:
        events.filter(
          (event) =>
            event.start_at &&
            new Date(
              event.start_at
            ) >= now
        ).length,

      completedMeetings: 0,

      openFollowUps,

      pendingOffers,
    };
  }
}

/**
 * Singleton.
 */
export const dashboardRepository =
  new DashboardRepository();
import {
  assistantContextBuilder,
} from "@/assistant/assistant-context-builder";

import {
  dailySummaryBuilder,
} from "@/assistant/features/daily-summary/daily-summary-builder";

import {
  assistantHeroPresenter,
} from "@/assistant/presenters/assistant-hero-presenter";

import {
  dashboardRepository,
} from "@/lib/repositories/dashboard-repository";

import {
  timelineService,
} from "@/services/timeline-service";

import type {
  DashboardActivity,
  DashboardData,
} from "@/types/dashboard";

/**
 * Dashboard Service.
 *
 * A Dashboard üzleti logikájáért felel.
 */
export class DashboardService {
  /**
   * Dashboard adatainak betöltése.
   */
  async getDashboard(): Promise<DashboardData> {
    const [
      dashboard,
      timeline,
    ] = await Promise.all([
      dashboardRepository.getDashboard(),
      timelineService.getRecentTimeline(10),
    ]);

    const recentActivities: DashboardActivity[] =
      timeline.map((item) => ({
        id: item.id,

        type:
          item.type.startsWith("task")
            ? "task"
            : item.type.startsWith("offer")
            ? "offer"
            : "case",

        icon: item.icon,

        title: item.title,

        subtitle:
          item.description ?? "",

        createdAt:
          item.created_at,

        href: `/cases/${item.case_id}`,
      }));

    /**
     * Assistant Context
     */
    const context =
      await assistantContextBuilder.build();

    /**
     * Daily Summary
     */
    const summary =
      dailySummaryBuilder.build(
        context
      );

    /**
     * Hero ViewModel
     */
    const hero =
      assistantHeroPresenter.build(
        summary
      );

    return {
      ...dashboard,
      recentActivities,
      hero,
    };
  }
}

/**
 * Singleton.
 */
export const dashboardService =
  new DashboardService();
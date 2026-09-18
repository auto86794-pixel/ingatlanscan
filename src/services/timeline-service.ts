import {
  timelineRepository,
} from "@/lib/repositories/timeline-repository";

import type {
  TimelineItem,
  TimelineItemType,
} from "@/types/timeline";

/**
 * Timeline Service.
 *
 * Az idővonal üzleti logikájáért felel.
 */
export class TimelineService {
  /**
   * Ügy idővonalának lekérése.
   */
  async getCaseTimeline(
    caseId: string
  ): Promise<TimelineItem[]> {
    return timelineRepository.getCaseTimeline(
      caseId
    );
  }

  /**
   * Legutóbbi aktivitások lekérése.
   */
  async getRecentTimeline(
    limit = 10
  ): Promise<TimelineItem[]> {
    return timelineRepository.getRecent(
      limit
    );
  }

  /**
   * Új idővonal esemény létrehozása.
   */
  async createTimelineEvent(input: {
    caseId: string;

    type: TimelineItemType;

    title: string;

    description?: string | null;
  }): Promise<void> {
    return timelineRepository.createTimelineEvent(
      input
    );
  }
}

/**
 * Singleton.
 */
export const timelineService =
  new TimelineService();
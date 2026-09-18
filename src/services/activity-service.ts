import { timelineService } from "@/services/timeline-service";

import type {
  TimelineItemType,
} from "@/types/timeline";

export type LogActivityInput = {
  caseId: string;

  type: TimelineItemType;

  title: string;

  description?: string | null;
};

/**
 * Központi aktivitás szolgáltatás.
 *
 * Minden rendszeresemény ezen keresztül
 * kerül naplózásra.
 */
export class ActivityService {
  async log(
    input: LogActivityInput
  ): Promise<void> {
    await timelineService.createTimelineEvent({
      caseId: input.caseId,

      type: input.type,

      title: input.title,

      description:
        input.description ?? null,
    });
  }
}

/**
 * Singleton.
 */
export const activityService =
  new ActivityService();
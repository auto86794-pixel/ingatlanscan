import {
  followUpEngine,
} from "@/services/follow-up-engine";

import {
  followUpRepository,
} from "@/lib/repositories/follow-up-repository";

import {
  meetingRepository,
} from "@/lib/repositories/meeting-repository";

import {
  timelineRepository,
} from "@/lib/repositories/timeline-repository";

type CompleteMeetingInput = {
  /**
   * Találkozó azonosítója.
   */
  meetingId: string;

  /**
   * Kapcsolódó ügy.
   */
  caseId: string;

  /**
   * Hozzon létre visszahívási emlékeztetőt.
   */
  createCallReminder?: boolean;

  /**
   * Hozzon létre ajánlatküldési emlékeztetőt.
   */
  createOfferReminder?: boolean;
};

/**
 * Meeting Completion Service.
 *
 * A találkozó lezárásának
 * teljes üzleti folyamata.
 */
export class MeetingCompletionService {
  async complete(
    input: CompleteMeetingInput
  ): Promise<void> {
    /**
     * 1.
     * Találkozó lezárása.
     */
    await meetingRepository.completeMeeting(
      input.meetingId
    );

    /**
     * 2.
     * Timeline esemény.
     */
    await timelineRepository.createTimelineEvent({
      caseId: input.caseId,

      type: "meeting_completed",

      title: "Találkozó lezárva",

      description:
        "A találkozó sikeresen lezárult.",
    });

    /**
     * 3.
     * Visszahívási emlékeztető.
     */
    if (input.createCallReminder) {
      const followUp =
        followUpEngine.createCallReminder(
          input.caseId
        );

      await followUpRepository.create(
        followUp
      );

      await timelineRepository.createTimelineEvent({
        caseId: input.caseId,

        type: "task_created",

        title:
          "Visszahívási emlékeztető létrehozva",

        description:
          "Automatikusan létrehozva a találkozó lezárásakor.",
      });
    }

    /**
     * 4.
     * Ajánlatküldési emlékeztető.
     */
    if (input.createOfferReminder) {
      const followUp =
        followUpEngine.createOfferReminder(
          input.caseId
        );

      await followUpRepository.create(
        followUp
      );

      await timelineRepository.createTimelineEvent({
        caseId: input.caseId,

        type: "task_created",

        title:
          "Ajánlatküldési emlékeztető létrehozva",

        description:
          "Automatikusan létrehozva a találkozó lezárásakor.",
      });
    }

    /**
     * TODO
     *
     * Dashboard refresh
     * Assistant refresh
     * Notification
     */
  }
}

/**
 * Singleton.
 */
export const meetingCompletionService =
  new MeetingCompletionService();
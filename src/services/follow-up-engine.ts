import type {
  FollowUp,
  FollowUpType,
} from "@/types/follow-up";

type CreateFollowUpInput = {
  caseId: string;

  title: string;

  description?: string | null;

  type: FollowUpType;

  dueAt: Date;
};

export class FollowUpEngine {
  /**
   * Follow-up létrehozása.
   */
  create(
    input: CreateFollowUpInput
  ): Omit<
    FollowUp,
    "id" | "created_at"
  > {
    return {
      case_id: input.caseId,

      type: input.type,

      title: input.title,

      description:
        input.description ?? null,

      due_at:
        input.dueAt.toISOString(),

      completed: false,
    };
  }

  /**
   * 3 nap múlva visszahívás.
   */
  createCallReminder(
    caseId: string
  ) {
    const dueAt = new Date();

    dueAt.setDate(
      dueAt.getDate() + 3
    );

    return this.create({
      caseId,

      type: "call",

      title:
        "Visszahívás",

      description:
        "Egyeztetés az ügyféllel.",

      dueAt,
    });
  }

  /**
   * Holnapi ajánlatküldés.
   */
  createOfferReminder(
    caseId: string
  ) {
    const dueAt = new Date();

    dueAt.setDate(
      dueAt.getDate() + 1
    );

    return this.create({
      caseId,

      type: "offer",

      title:
        "Ajánlat küldése",

      description:
        "Ajánlat elkészítése és elküldése.",

      dueAt,
    });
  }
}

export const followUpEngine =
  new FollowUpEngine();
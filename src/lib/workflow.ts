import { createTimelineEvent } from "@/lib/timeline";

import type { Client } from "@/types/client";
import type { Case } from "@/types/case";
import type { Offer } from "@/types/offer";

export class WorkflowService {
  /**
   * Új ügyfél.
   */
  async clientCreated(
    client: Client
  ): Promise<void> {
    await createTimelineEvent({
      client_id: client.id,

      type: "client_created",

      title: "Új ügyfél létrehozva",

      description:
        `${client.first_name} ${client.last_name}`,
    });
  }

  /**
   * Új ügy.
   */
  async caseCreated(
    item: Case
  ): Promise<void> {
    await createTimelineEvent({
      case_id: item.id,

      client_id: item.client_id,

      type: "case_created",

      title: "Új ügy létrehozva",

      description: item.title,

      metadata: {
        case_number: item.case_number,
      },
    });
  }

  /**
   * Új ajánlat.
   */
  async offerCreated(
    offer: Offer
  ): Promise<void> {
    await createTimelineEvent({
      case_id: offer.case_id,

      offer_id: offer.id,

      type: "offer_created",

      title: "Új ajánlat létrehozva",

      description: offer.title,

      metadata: {
        version: offer.version,
      },
    });
  }

  /**
   * Ajánlat elküldve.
   */
  async offerSent(
    offer: Offer
  ): Promise<void> {
    await createTimelineEvent({
      case_id: offer.case_id,

      offer_id: offer.id,

      type: "offer_sent",

      title: "Ajánlat elküldve",

      description: offer.title,
    });
  }

  /**
   * Ajánlat elfogadva.
   */
  async offerAccepted(
    offer: Offer
  ): Promise<void> {
    await createTimelineEvent({
      case_id: offer.case_id,

      offer_id: offer.id,

      type: "offer_accepted",

      title: "Ajánlat elfogadva",

      description: offer.title,
    });
  }

  /**
   * Ajánlat elutasítva.
   */
  async offerRejected(
    offer: Offer
  ): Promise<void> {
    await createTimelineEvent({
      case_id: offer.case_id,

      offer_id: offer.id,

      type: "offer_rejected",

      title: "Ajánlat elutasítva",

      description: offer.title,
    });
  }
}

export const workflow =
  new WorkflowService();
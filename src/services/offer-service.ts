import {
  offerRepository,
} from "@/lib/repositories/offer-repository";

import {
  activityService,
} from "@/services/activity-service";

import type {
  CreateOfferInput,
  Offer,
  OfferWithCase,
  UpdateOfferInput,
} from "@/types/offer";

import type {
  OfferListItem,
} from "@/types/offer-list";

/**
 * Offer Service.
 *
 * Az ajánlatok üzleti logikájáért felel.
 */
export class OfferService {
  /**
   * Összes ajánlat.
   */
  async getOffers(): Promise<
    OfferListItem[]
  > {
    const offers =
      await offerRepository.getAllWithCase();

    return offers.map((offer) => ({
      id: offer.id,

      title: offer.title,

      clientName: offer.case?.clients
        ? `${offer.case.clients.first_name} ${offer.case.clients.last_name}`
        : "-",

      propertyName:
        offer.case?.properties?.title ??
        "-",

      amount:
        offer.case?.properties?.price ??
        0,

      version: offer.version,

      status: offer.status,

      expiresAt:
        offer.valid_until,
    }));
  }

  /**
   * Egy ajánlat.
   */
  async getOffer(
    id: string
  ): Promise<Offer> {
    return offerRepository.getById(
      id
    );
  }

  /**
   * Ajánlat ügy adatokkal.
   */
  async getOfferWithCase(
    id: string
  ): Promise<OfferWithCase> {
    return offerRepository.getWithCase(
      id
    );
  }

  /**
   * Ügy ajánlatai.
   */
  async getCaseOffers(
    caseId: string
  ): Promise<Offer[]> {
    return offerRepository.getByCase(
      caseId
    );
  }

  /**
   * Új ajánlat.
   */
  async createOffer(
    input: CreateOfferInput
  ): Promise<Offer> {
    const version =
      await offerRepository.getNextVersion(
        input.case_id
      );

    const offer =
      await offerRepository.create({
        ...input,
        version,
      });

    await activityService.log({
      caseId: offer.case_id,

      type: "offer_created",

      title: "Ajánlat létrehozva",

      description:
        `${offer.title} (v${offer.version})`,
    });

    return offer;
  }

  /**
   * Új ajánlatverzió létrehozása.
   */
  async createOfferVersion(
    id: string
  ): Promise<Offer> {
    const sourceOffer =
      await offerRepository.getById(
        id
      );

    const version =
      await offerRepository.getNextVersion(
        sourceOffer.case_id
      );

    const offer =
      await offerRepository.create({
        case_id:
          sourceOffer.case_id,

        title:
          sourceOffer.title,

        notes:
          sourceOffer.notes,

        valid_until:
          sourceOffer.valid_until,

        version,
      });

    await activityService.log({
      caseId: offer.case_id,

      type: "offer_created",

      title:
        "Új ajánlatverzió létrehozva",

      description:
        `${offer.title} (v${offer.version})`,
    });

    return offer;
  }

  /**
   * Ajánlat módosítása.
   */
  async updateOffer(
    id: string,
    input: UpdateOfferInput
  ): Promise<Offer> {
    return offerRepository.update(
      id,
      input
    );
  }

  /**
   * Ajánlat törlése.
   */
  async deleteOffer(
    id: string
  ): Promise<void> {
    return offerRepository.delete(
      id
    );
  }

  /**
   * Ajánlat elküldése.
   */
  async sendOffer(
    id: string
  ): Promise<Offer> {
    const offer =
      await offerRepository.markSent(
        id
      );

    await activityService.log({
      caseId: offer.case_id,

      type: "offer_sent",

      title: "Ajánlat elküldve",

      description:
        `${offer.title} (v${offer.version})`,
    });

    return offer;
  }

  /**
   * Ajánlat elfogadása.
   */
  async acceptOffer(
    id: string
  ): Promise<Offer> {
    const offer =
      await offerRepository.markAccepted(
        id
      );

    await activityService.log({
      caseId: offer.case_id,

      type: "offer_accepted",

      title: "Ajánlat elfogadva",

      description:
        `${offer.title} (v${offer.version})`,
    });

    return offer;
  }

  /**
   * Ajánlat elutasítása.
   */
  async rejectOffer(
    id: string
  ): Promise<Offer> {
    const offer =
      await offerRepository.markRejected(
        id
      );

    await activityService.log({
      caseId: offer.case_id,

      type: "offer_rejected",

      title: "Ajánlat elutasítva",

      description:
        `${offer.title} (v${offer.version})`,
    });

    return offer;
  }

  /**
   * Ajánlat lejárt.
   */
  async expireOffer(
    id: string
  ): Promise<Offer> {
    const offer =
      await offerRepository.markExpired(
        id
      );

    await activityService.log({
      caseId: offer.case_id,

      type: "offer_expired",

      title: "Ajánlat lejárt",

      description:
        `${offer.title} (v${offer.version})`,
    });

    return offer;
  }

  /**
   * Összes ajánlat száma.
   */
  async getOfferCount(): Promise<number> {
    return offerRepository.getCount();
  }

  /**
   * Nyitott ajánlatok száma.
   */
  async getPendingOfferCount(): Promise<number> {
    return offerRepository.getPendingCount();
  }
}

/**
 * Singleton.
 */
export const offerService =
  new OfferService();
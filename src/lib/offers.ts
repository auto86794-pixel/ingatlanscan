import {
  offerRepository,
} from "@/lib/repositories/offer-repository";

import {
  createTimelineEvent,
} from "@/lib/timeline";

import type {
  Offer,
  OfferWithCase,
  CreateOfferInput,
  UpdateOfferInput,
} from "@/types/offer";

import type {
  OfferListItem,
} from "@/types/offer-list";

/**
 * Új ajánlat.
 */
export async function createOffer(
  data: CreateOfferInput
): Promise<Offer> {
  const offer =
    await offerRepository.create(data);

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

  return offer;
}

/**
 * Ajánlat lista.
 *
 * UI számára előkészített adatok.
 */
export async function getOfferList(): Promise<
  OfferListItem[]
> {
  const offers =
    await offerRepository.getAllWithCase();

  return offers.map((offer) => ({
    id: offer.id,

    title: offer.title,

    clientName: offer.case?.clients
      ? `${offer.case.clients.first_name} ${offer.case.clients.last_name}`
      : "Nincs ügyfél",

    propertyName:
      offer.case?.properties?.title ??
      "Nincs ingatlan",

    // TODO:
    // Amint bekerül az ajánlat összege
    // az adatbázisba, ezt cseréljük le.
    amount: 0,

    version: offer.version,

    status: offer.status,

    expiresAt: offer.valid_until,
  }));
}

/**
 * Összes ajánlat.
 */
export async function getOffers(): Promise<
  Offer[]
> {
  return offerRepository.getAll();
}

/**
 * Egy ajánlat.
 */
export async function getOffer(
  id: string
): Promise<Offer> {
  return offerRepository.getById(id);
}

/**
 * Ügy ajánlatai.
 */
export async function getOffersByCase(
  caseId: string
): Promise<Offer[]> {
  return offerRepository.getByCase(
    caseId
  );
}

/**
 * Ajánlat ügy adatokkal.
 */
export async function getOfferWithCase(
  id: string
): Promise<OfferWithCase> {
  return offerRepository.getWithCase(
    id
  );
}

/**
 * Ajánlat módosítása.
 */
export async function updateOffer(
  id: string,
  data: UpdateOfferInput
): Promise<Offer> {
  return offerRepository.update(
    id,
    data
  );
}

/**
 * Ajánlat törlése.
 */
export async function deleteOffer(
  id: string
): Promise<void> {
  return offerRepository.delete(
    id
  );
}

/**
 * Ajánlat elküldése.
 */
export async function markOfferSent(
  id: string
): Promise<Offer> {
  const offer =
    await offerRepository.markSent(id);

  await createTimelineEvent({
    case_id: offer.case_id,

    offer_id: offer.id,

    type: "offer_sent",

    title: "Ajánlat elküldve",

    description: offer.title,
  });

  return offer;
}

/**
 * Ajánlat elfogadása.
 */
export async function markOfferAccepted(
  id: string
): Promise<Offer> {
  const offer =
    await offerRepository.markAccepted(
      id
    );

  await createTimelineEvent({
    case_id: offer.case_id,

    offer_id: offer.id,

    type: "offer_accepted",

    title: "Ajánlat elfogadva",

    description: offer.title,
  });

  return offer;
}

/**
 * Ajánlat elutasítása.
 */
export async function markOfferRejected(
  id: string
): Promise<Offer> {
  const offer =
    await offerRepository.markRejected(
      id
    );

  await createTimelineEvent({
    case_id: offer.case_id,

    offer_id: offer.id,

    type: "offer_rejected",

    title: "Ajánlat elutasítva",

    description: offer.title,
  });

  return offer;
}

/**
 * Ajánlat lejárttá tétele.
 */
export async function markOfferExpired(
  id: string
): Promise<Offer> {
  const offer =
    await offerRepository.markExpired(
      id
    );

  await createTimelineEvent({
    case_id: offer.case_id,

    offer_id: offer.id,

    type: "offer_expired",

    title: "Ajánlat lejárt",

    description: offer.title,
  });

  return offer;
}
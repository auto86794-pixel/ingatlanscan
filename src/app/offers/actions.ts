"use server";

import { revalidatePath } from "next/cache";

import {
  offerService,
} from "@/services/offer-service";

import type {
  Offer,
  CreateOfferInput,
  UpdateOfferInput,
} from "@/types/offer";

/**
 * Új ajánlat létrehozása.
 */
export async function createOfferAction(
  input: CreateOfferInput
): Promise<Offer> {
  const offer =
    await offerService.createOffer(
      input
    );

  revalidatePath("/offers");
  revalidatePath(`/offers/${offer.id}`);
  revalidatePath(`/cases/${offer.case_id}`);

  return offer;
}

/**
 * Új ajánlatverzió létrehozása.
 */
export async function createOfferVersionAction(
  offerId: string
): Promise<Offer> {
  const offer =
    await offerService.createOfferVersion(
      offerId
    );

  revalidatePath("/offers");
  revalidatePath(`/offers/${offer.id}`);
  revalidatePath(`/cases/${offer.case_id}`);

  return offer;
}

/**
 * Ajánlat módosítása.
 */
export async function updateOfferAction(
  offerId: string,
  input: UpdateOfferInput
): Promise<void> {
  const offer =
    await offerService.updateOffer(
      offerId,
      input
    );

  revalidatePath("/offers");
  revalidatePath(`/offers/${offerId}`);
  revalidatePath(`/cases/${offer.case_id}`);
}

/**
 * Ajánlat elküldése.
 */
export async function sendOfferAction(
  offerId: string
): Promise<void> {
  await offerService.sendOffer(
    offerId
  );

  revalidatePath("/offers");
  revalidatePath(`/offers/${offerId}`);
}

/**
 * Ajánlat elfogadása.
 */
export async function acceptOfferAction(
  offerId: string
): Promise<void> {
  await offerService.acceptOffer(
    offerId
  );

  revalidatePath("/offers");
  revalidatePath(`/offers/${offerId}`);
}

/**
 * Ajánlat elutasítása.
 */
export async function rejectOfferAction(
  offerId: string
): Promise<void> {
  await offerService.rejectOffer(
    offerId
  );

  revalidatePath("/offers");
  revalidatePath(`/offers/${offerId}`);
}

/**
 * Ajánlat lejárttá tétele.
 */
export async function expireOfferAction(
  offerId: string
): Promise<void> {
  await offerService.expireOffer(
    offerId
  );

  revalidatePath("/offers");
  revalidatePath(`/offers/${offerId}`);
}

/**
 * Ajánlat törlése.
 */
export async function deleteOfferAction(
  offerId: string
): Promise<void> {
  await offerService.deleteOffer(
    offerId
  );

  revalidatePath("/offers");
}
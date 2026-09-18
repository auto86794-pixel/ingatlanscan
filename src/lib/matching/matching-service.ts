import { getClients } from "@/lib/clients";
import { getProperties } from "@/lib/properties";

import { calculateMatch } from "./matching-engine";

import type { Client } from "@/types/client";
import type { MatchResult } from "@/types/matching";
import type { Property } from "@/types/property";

export interface MatchWithClient
  extends MatchResult {
  client: Client;
}

export interface MatchWithProperty
  extends MatchResult {
  property: Property;
}

export async function getMatchesForProperty(
  propertyId: string,
  minimumPercentage = 70
): Promise<MatchWithClient[]> {
  const [clients, properties] =
    await Promise.all([
      getClients(),
      getProperties(),
    ]);

  const property =
    properties.find(
      (item) => item.id === propertyId
    );

  if (!property) {
    return [];
  }

  return clients
    .map((client) => ({
      ...calculateMatch(
        client,
        property
      ),
      client,
    }))
    .filter(
      (match) =>
        match.score.percentage >=
        minimumPercentage
    )
    .sort(
      (a, b) =>
        b.score.percentage -
        a.score.percentage
    );
}

export async function getMatchesForClient(
  clientId: string,
  minimumPercentage = 70
): Promise<MatchWithProperty[]> {
  const [clients, properties] =
    await Promise.all([
      getClients(),
      getProperties(),
    ]);

  const client =
    clients.find(
      (item) => item.id === clientId
    );

  if (!client) {
    return [];
  }

  return properties
    .map((property) => ({
      ...calculateMatch(
        client,
        property
      ),
      property,
    }))
    .filter(
      (match) =>
        match.score.percentage >=
        minimumPercentage
    )
    .sort(
      (a, b) =>
        b.score.percentage -
        a.score.percentage
    );
}

export async function getBestMatchForProperty(
  propertyId: string
): Promise<MatchWithClient | null> {
  const matches =
    await getMatchesForProperty(
      propertyId
    );

  return matches.length > 0
    ? matches[0]
    : null;
}

export async function getBestMatchForClient(
  clientId: string
): Promise<MatchWithProperty | null> {
  const matches =
    await getMatchesForClient(
      clientId
    );

  return matches.length > 0
    ? matches[0]
    : null;
}
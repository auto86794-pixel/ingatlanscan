import type { Client } from "@/types/client";
import type { Property } from "@/types/property";

import {
  DEFAULT_MATCHING_WEIGHTS,
  type MatchReason,
  type MatchResult,
} from "@/types/matching";

function addReason(
  reasons: MatchReason[],
  matched: boolean,
  type: MatchReason["type"],
  label: string,
  score: number,
  successMessage: string,
  failedMessage: string
) {
  reasons.push({
    type,
    label,
    matched,
    score: matched ? score : 0,
    message: matched
      ? successMessage
      : failedMessage,
  });

  return matched ? score : 0;
}

export function calculateMatch(
  client: Client,
  property: Property
): MatchResult {
  const reasons: MatchReason[] = [];

  let total = 0;

  const weights =
    DEFAULT_MATCHING_WEIGHTS;

  total += addReason(
    reasons,
    !client.city ||
      client.city === property.city,
    "city",
    "Város",
    weights.city,
    "A város megegyezik.",
    "Eltérő város."
  );

  total += addReason(
    reasons,
    !client.district ||
      client.district ===
        property.district,
    "district",
    "Városrész",
    weights.district,
    "A városrész megfelel.",
    "Eltérő városrész."
  );

  total += addReason(
    reasons,
    !client.property_type ||
      client.property_type ===
        property.property_type,
    "propertyType",
    "Ingatlantípus",
    weights.propertyType,
    "Az ingatlantípus megfelel.",
    "Eltérő ingatlantípus."
  );

  const priceMatch =
    property.price !== null &&
    (client.budget_min === null ||
      property.price >=
        client.budget_min) &&
    (client.budget_max === null ||
      property.price <=
        client.budget_max);

  total += addReason(
    reasons,
    priceMatch,
    "price",
    "Ár",
    weights.price,
    "Az ár belefér a keretbe.",
    "Az ár kívül esik a kereten."
  );

  const areaMatch =
    property.area !== null &&
    (client.area_min === null ||
      property.area >=
        client.area_min) &&
    (client.area_max === null ||
      property.area <=
        client.area_max);

  total += addReason(
    reasons,
    areaMatch,
    "area",
    "Alapterület",
    weights.area,
    "Az alapterület megfelelő.",
    "Nem megfelelő alapterület."
  );

  const roomsMatch =
    property.rooms !== null &&
    (client.rooms_min === null ||
      property.rooms >=
        client.rooms_min) &&
    (client.rooms_max === null ||
      property.rooms <=
        client.rooms_max);

  total += addReason(
    reasons,
    roomsMatch,
    "rooms",
    "Szobák",
    weights.rooms,
    "Megfelelő szobaszám.",
    "Nem megfelelő szobaszám."
  );

  total += addReason(
    reasons,
    !client.property_condition ||
      client.property_condition ===
        property.condition,
    "condition",
    "Állapot",
    weights.condition,
    "Az állapot megfelel.",
    "Eltérő állapot."
  );

  const maxScore =
    Object.values(weights).reduce(
      (sum, value) => sum + value,
      0
    );

  return {
    clientId: client.id,
    propertyId: property.id,

    score: {
      total,

      maxScore,

      percentage: Math.round(
        (total / maxScore) * 100
      ),
    },

    reasons,
  };
}

export function sortMatches(
  matches: MatchResult[]
): MatchResult[] {
  return [...matches].sort(
    (a, b) =>
      b.score.percentage -
      a.score.percentage
  );
}

export function filterMatches(
  matches: MatchResult[],
  minimumPercentage = 70
): MatchResult[] {
  return matches.filter(
    (match) =>
      match.score.percentage >=
      minimumPercentage
  );
}
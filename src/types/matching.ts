export type MatchReasonType =
  | "city"
  | "district"
  | "propertyType"
  | "price"
  | "area"
  | "rooms"
  | "condition";

export interface MatchReason {
  type: MatchReasonType;

  label: string;

  matched: boolean;

  score: number;

  message: string;
}

export interface MatchScore {
  total: number;

  percentage: number;

  maxScore: number;
}

export interface MatchResult {
  clientId: string;

  propertyId: string;

  score: MatchScore;

  reasons: MatchReason[];
}

export interface MatchingWeights {
  city: number;

  district: number;

  propertyType: number;

  price: number;

  area: number;

  rooms: number;

  condition: number;
}

export const DEFAULT_MATCHING_WEIGHTS: MatchingWeights =
  {
    city: 20,

    district: 15,

    propertyType: 20,

    price: 20,

    area: 10,

    rooms: 10,

    condition: 5,
  };
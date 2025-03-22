import { Location } from "./models/location";
import { DistinctionId } from "./nominal";

export type Restaurant = {
  id: number;
  name: string;
  cuisines?: Cuisine[];
  awards?: Award[];
  website?: string;
  currency?: Currency;
  phone?: string;
  locations?: Location[];
  location?: {
    coordinates?: {
      lat: number;
      lng: number;
    };
    address?: {
      streetAddress: string;
      postcode: string;
    };
  };
  booking?: Booking[];
};

export interface Cuisine {
  id: string;
  name: string;
}

export type BookingProviderId = "resy" | "opentable" | "tock";

export interface Booking {
  id: BookingProviderId;
  name: string;
  url: string;
}

export interface MichelinAward {
  awardTypeId: "michelin-guide";
  date: string;
  award: string;
  distinctions: Distinction[];
  description: string;
  url: string;
}

export type Award = MichelinAward;

export type MichelinDistinction =
  | "michelin-bib-gourmand"
  | "michelin-green-star"
  | "michelin-1-star"
  | "michelin-2-star"
  | "michelin-3-star";

export interface Distinction {
  name: string;
  id: MichelinDistinction & DistinctionId;
}

export interface Currency {
  id: string;
  name: string;
  symbol: string;
  abbr: string;
}

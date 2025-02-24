export interface RawRestaurant {
  name: string;
  stars: number;
  greenStar: boolean;
  bibGourmand: boolean;
  longitude: number;
  latitude: number;
  cuisine: string[];
  bookingProvider: "Resy" | "OpenTable" | "Tock";
  bookingUrl: string;
  currency: string;
  phone: string;
  description: string;
  michelinUrl: string;
  postcode: string;
  streetAddress: string;
  schedule: Schedule[];
  website: string;
  date: Date;
}

export interface Schedule {
  day: string;
  closed: boolean;
  open: string | null;
  close: string | null;
}

export type MichelinLocation = "new york" | "chicago";

export interface LocationMeta {
  latLng: string;
  isState: boolean;
}
interface HitCuisine {
  code: string;
  label: string;
  slug: string;
}

type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
interface DaySchedule {
  closed: true;
  closes: null | string;
  opens: null | string;
}

export interface Hit {
  _geoloc: {
    lat: number;
    lng: number;
  };
  booking_provider: string;
  booking_url: string;
  currency: string;
  currency_symbol: "$";
  phone: string;
  green_star: boolean | null;
  guide_year: number;
  published_date: number;
  main_desc: string;
  michelin_award:
    | "selected"
    | "BIB_GOURMAND"
    | "ONE_STAR"
    | "TWO_STAR"
    | "THREE_STAR";
  michelin_star: "ONE" | "TWO" | "THREE" | null;
  name: string;
  postcode: string;
  price_category: {
    code: string;
    label: string;
    slug: string;
  };
  street: string;
  website: string;
  hours_of_operation: Record<DayOfWeek, DaySchedule[]>;
  cuisines: HitCuisine[];
  url: string;
}

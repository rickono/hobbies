import { LocationId } from "@rono/types";

export type LocationType = "neighborhood" | "city" | "state" | "country";

export const LOCATION_ORDER: Record<LocationType, number> = {
  neighborhood: 1,
  city: 2,
  state: 3,
  country: 4,
};

export interface Location {
  id: LocationId;
  name: string;
  type: LocationType;
  abbr: string | null;
  parentId?: LocationId;
  parent?: Location;
}

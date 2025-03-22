import { LocationId } from "@rono/types";

export type LocationType = "neighborhood" | "city" | "state" | "country";

export interface Location {
  id: LocationId;
  name: string;
  type: LocationType;
  abbr: string | null;
  parentId?: LocationId;
}

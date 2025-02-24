declare const locationIdBrand: unique symbol;
export type LocationId = string & { [locationIdBrand]: "LocationId" };

export function LocationId(id: string): LocationId {
  return id as LocationId;
}

LocationId.NULL = LocationId("");

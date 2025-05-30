import {
  LocationId,
  LocationType,
  RequiredKeys,
  SnakeToCamelCaseKeys,
} from "@rono/types";

export interface DbLocationEntity {
  id: LocationId;
  name: string;
  type: LocationType;
  parent_id: LocationId;
}

export type LocationEntity = SnakeToCamelCaseKeys<DbLocationEntity>;

export type InsertLocation = RequiredKeys<LocationEntity, "id" | "name">;

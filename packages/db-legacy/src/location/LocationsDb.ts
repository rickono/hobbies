import { Location } from "@rono/types";
import { db } from "../DatabaseConnection";
import { getLocationsQuery, insertLocationQuery } from "./queries";
import { InsertLocation } from "./types";

export class LocationsDb {
  public constructor() {}

  public async getLocations(): Promise<Location[]> {
    const result = await db.query<Location>(getLocationsQuery());
    return result.rows;
  }

  public async insertLocation(location: InsertLocation): Promise<void> {
    await db.query(insertLocationQuery(location));
  }
}

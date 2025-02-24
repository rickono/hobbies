import { LocationId, Restaurant, RestaurantId } from "@rono/types";
import { db } from "../../DatabaseConnection";
import { updateRestaurantLocationQuery } from "../queries";
import { insertBookingInfo, insertRestaurant } from "../service";
import { InsertRestaurant } from "../types";
import { AwardManager } from "./AwardManager";
import { CuisineManager } from "./CuisineManager";

const buildRestaurantQuery = (): string => {
  const query = `SELECT * FROM enriched_restaurant`;
  return query;
};

export class RestaurantsDb {
  public readonly cuisines: CuisineManager;
  public readonly awards: AwardManager;
  public constructor() {
    this.cuisines = new CuisineManager();
    this.awards = new AwardManager();
  }

  public async getRestaurants(): Promise<Restaurant[]> {
    const rows = await db.query<Restaurant>(buildRestaurantQuery());
    return rows.rows;
  }

  public async insertRestaurant(
    restaurant: InsertRestaurant,
  ): Promise<{ id: RestaurantId; isNew: boolean } | undefined> {
    return insertRestaurant(restaurant);
  }

  public async insertBookingInfo(
    restaurantId: RestaurantId,
    providerId: "resy" | "tock" | "opentable",
    url: string,
  ): Promise<void> {
    return insertBookingInfo(restaurantId, providerId, url);
  }

  public async updateRestaurantLocation(
    restaurantId: RestaurantId,
    locationId: LocationId,
  ): Promise<void> {
    db.query(updateRestaurantLocationQuery(restaurantId, locationId));
  }
}

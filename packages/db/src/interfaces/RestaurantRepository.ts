import { RestaurantId } from "@rono/types";
import { InsertRestaurant } from "../model";

export interface RestaurantRepository {
  // Create
  insertRestaurant: (restaurant: InsertRestaurant) => Promise<RestaurantId>;
}

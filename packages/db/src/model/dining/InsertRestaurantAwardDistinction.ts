import { DistinctionId, RestaurantAwardId } from "@rono/types";

export interface InsertRestaurantAwardDistinction {
  restaurantAwardId: RestaurantAwardId;
  distinctionId: DistinctionId;
}

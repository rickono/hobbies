import { AwardTypeId, RestaurantId } from "@rono/types";
import { InsertRestaurantAwardDistinction } from "./InsertRestaurantAwardDistinction";

export interface InsertRestaurantAward {
  restaurantId: RestaurantId;
  awardTypeId: AwardTypeId;
  awardDate: Date;
  rank?: number;
  metadata?: Record<string, any>;
  description?: string;
  url?: string;
  distinctions?: Omit<InsertRestaurantAwardDistinction, "restaurantAwardId">[];
}

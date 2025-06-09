import { CuisineId, LocationId } from "@rono/types";
import { InsertRestaurantAward } from "./InsertRestaurantAward";
import { InsertRestaurantBooking } from "./InsertRestaurantBooking";

export interface InsertRestaurant {
  name: string;
  longitude?: number;
  latitude?: number;
  location?: LocationId;
  website?: string;
  phone?: string;
  streetAddress?: string;
  postcode?: string;
  awards?: Omit<InsertRestaurantAward[], "restaurantId">;
  booking?: Omit<InsertRestaurantBooking, "restaurantId">;
  cuisines?: CuisineId[];
}

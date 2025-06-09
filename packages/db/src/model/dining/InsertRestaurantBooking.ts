import { BookingProviderId, RestaurantId } from "@rono/types";

export interface InsertRestaurantBooking {
  restaurantId: RestaurantId;
  providerId: BookingProviderId;
  url: string;
}

import {
  foreignKey,
  integer,
  pgTable,
  text,
  unique,
} from "drizzle-orm/pg-core";
import { bookingProvider } from "./bookingProvider";
import { restaurant } from "./restaurant";

export const restaurantBooking = pgTable(
  "restaurant_booking",
  {
    url: text().notNull(),
    restaurantId: integer("restaurant_id"),
    providerId: text("provider_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.restaurantId],
      foreignColumns: [restaurant.id],
      name: "restaurant_booking_restaurant_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.providerId],
      foreignColumns: [bookingProvider.id],
      name: "restaurant_booking_provider_id_fkey",
    }).onDelete("cascade"),
    unique("unique_booking").on(table.restaurantId, table.providerId),
  ],
);

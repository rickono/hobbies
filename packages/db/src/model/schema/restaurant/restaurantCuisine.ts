import {
  foreignKey,
  integer,
  pgTable,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";
import { cuisine } from "../restaurant";
import { restaurant } from "./restaurant";

export const restaurantCuisine = pgTable(
  "restaurant_cuisine",
  {
    restaurantId: integer("restaurant_id").notNull(),
    cuisineId: text("cuisine_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.restaurantId],
      foreignColumns: [restaurant.id],
      name: "restaurant_cuisine_restaurant_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.cuisineId],
      foreignColumns: [cuisine.id],
      name: "restaurant_cuisine_cuisine_id_fkey",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.restaurantId, table.cuisineId],
      name: "restaurant_cuisine_pkey",
    }),
  ],
);

import {
  date,
  foreignKey,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { awardType } from "./awardType";
import { restaurant } from "./restaurant";

export const restaurantAward = pgTable(
  "restaurant_award",
  {
    id: serial().primaryKey().notNull(),
    restaurantId: integer("restaurant_id").notNull(),
    awardTypeId: text("award_type_id").notNull(),
    awardDate: date("award_date").notNull(),
    rank: integer(),
    metadata: jsonb(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    description: text(),
    url: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.restaurantId],
      foreignColumns: [restaurant.id],
      name: "restaurant_award_restaurant_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.awardTypeId],
      foreignColumns: [awardType.id],
      name: "restaurant_award_award_type_id_fkey",
    }).onDelete("cascade"),
    unique("unique_awards").on(
      table.restaurantId,
      table.awardTypeId,
      table.awardDate,
    ),
  ],
);

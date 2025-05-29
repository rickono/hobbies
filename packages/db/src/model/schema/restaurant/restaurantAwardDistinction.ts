import {
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { awardDistinction } from "./awardDistinction";
import { restaurantAward } from "./restaurantAward";

export const restaurantAwardDistinction = pgTable(
  "restaurant_award_distinction",
  {
    id: serial().primaryKey().notNull(),
    restaurantAwardId: integer("restaurant_award_id").notNull(),
    distinctionId: text("distinction_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.restaurantAwardId],
      foreignColumns: [restaurantAward.id],
      name: "restaurant_award_distinction_restaurant_award_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.distinctionId],
      foreignColumns: [awardDistinction.id],
      name: "restaurant_award_distinction_distinction_id_fkey",
    }).onDelete("cascade"),
  ],
);

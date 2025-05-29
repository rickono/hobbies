import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const restaurantSchedule = pgTable("restaurant_schedule", {
  id: serial().primaryKey().notNull(),
  day: integer().notNull(),
  closed: boolean().default(false).notNull(),
  open: text(),
  close: text(),
});

import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const coffeeVarietals = pgTable("coffee_varietals", {
  id: serial().primaryKey().notNull(),
  name: text().notNull(),
});

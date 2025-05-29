import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const coffeeProducers = pgTable("coffee_producers", {
  id: serial().primaryKey().notNull(),
  name: text().notNull(),
});

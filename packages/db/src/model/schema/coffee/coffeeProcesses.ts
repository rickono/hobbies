import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const coffeeProcesses = pgTable("coffee_processes", {
  id: serial().primaryKey().notNull(),
  name: text().notNull(),
});

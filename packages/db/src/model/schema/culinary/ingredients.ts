import { pgTable, serial, text, unique } from "drizzle-orm/pg-core";

export const ingredients = pgTable(
  "ingredients",
  {
    id: serial().primaryKey().notNull(),
    name: text(),
  },
  (table) => [unique("ingredients_name_key").on(table.name)],
);

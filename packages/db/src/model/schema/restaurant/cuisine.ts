import { pgTable, text, unique } from "drizzle-orm/pg-core";

export const cuisine = pgTable(
  "cuisine",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
  },
  (table) => [unique("cuisine_name_key").on(table.name)],
);

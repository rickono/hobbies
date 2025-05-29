import { pgTable, text, unique } from "drizzle-orm/pg-core";

export const awardType = pgTable(
  "award_type",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    description: text(),
  },
  (table) => [unique("award_type_name_key").on(table.name)],
);

import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const currency = pgTable("currency", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  abbr: varchar({ length: 225 }).notNull(),
  symbol: varchar({ length: 255 }).notNull(),
});

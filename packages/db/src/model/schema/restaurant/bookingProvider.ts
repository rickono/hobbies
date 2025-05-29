import { pgTable, text } from "drizzle-orm/pg-core";

export const bookingProvider = pgTable("booking_provider", {
  id: text().primaryKey().notNull(),
  name: text(),
});

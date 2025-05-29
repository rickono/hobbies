import { pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

export const migrationsLog = pgTable(
  "migrations_log",
  {
    id: serial().primaryKey().notNull(),
    filename: text().notNull(),
    appliedAt: timestamp("applied_at", { mode: "string" }).defaultNow(),
  },
  (table) => [unique("migrations_log_filename_key").on(table.filename)],
);

export * from "./coffee";
export * from "./common";
export * from "./culinary";
export * from "./flavor-bible";
export * from "./restaurant";

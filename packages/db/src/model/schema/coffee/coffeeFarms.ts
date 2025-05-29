import { foreignKey, pgTable, serial, text } from "drizzle-orm/pg-core";
import { locations } from "../common";

export const coffeeFarms = pgTable(
  "coffee_farms",
  {
    id: serial().primaryKey().notNull(),
    name: text().notNull(),
    locationId: text("location_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.locationId],
      foreignColumns: [locations.id],
      name: "coffee_farms_location_id_fkey",
    }),
  ],
);

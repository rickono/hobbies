import { foreignKey, pgTable, serial, text } from "drizzle-orm/pg-core";
import { locations } from "../common";

export const coffeeRoasters = pgTable(
  "coffee_roasters",
  {
    id: serial().primaryKey().notNull(),
    name: text().notNull(),
    locationId: text("location_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.locationId],
      foreignColumns: [locations.id],
      name: "coffee_roasters_location_id_fkey",
    }).onDelete("set null"),
  ],
);

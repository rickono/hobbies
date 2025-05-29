import {
  doublePrecision,
  foreignKey,
  pgTable,
  serial,
  text,
  unique,
} from "drizzle-orm/pg-core";
import { currency, locations } from "../common";

export const restaurant = pgTable(
  "restaurant",
  {
    id: serial().primaryKey().notNull(),
    name: text().notNull(),
    longitude: doublePrecision(),
    latitude: doublePrecision(),
    locationId: text("location_id"),
    website: text(),
    currencyId: text("currency_id"),
    phone: text(),
    streetAddress: text("street_address"),
    postcode: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.currencyId],
      foreignColumns: [currency.id],
      name: "restaurant_currency_id_fkey",
    }),
    foreignKey({
      columns: [table.locationId],
      foreignColumns: [locations.id],
      name: "restaurant_location_id_fkey",
    }).onDelete("set null"),
    unique("unique_name_loc").on(table.name, table.longitude, table.latitude),
  ],
);

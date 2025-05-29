import {
  date,
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { locations } from "../common";
import { coffeeFarms } from "./coffeeFarms";
import { coffeeProducers } from "./coffeeProducers";
import { coffeeRoasters } from "./coffeeRoasters";
import { coffeeVarietals } from "./coffeeVarietals";

export const coffeeBeans = pgTable(
  "coffee_beans",
  {
    id: serial().primaryKey().notNull(),
    altitude: integer(),
    roastDate: date("roast_date"),
    tastingNotes: text("tasting_notes"),
    roasterId: integer("roaster_id"),
    locationId: text("location_id"),
    producerId: integer("producer_id"),
    farmId: integer("farm_id"),
    varietalId: integer("varietal_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.roasterId],
      foreignColumns: [coffeeRoasters.id],
      name: "coffee_beans_roaster_id_fkey",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.locationId],
      foreignColumns: [locations.id],
      name: "coffee_beans_location_id_fkey",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.producerId],
      foreignColumns: [coffeeProducers.id],
      name: "coffee_beans_producer_id_fkey",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.farmId],
      foreignColumns: [coffeeFarms.id],
      name: "coffee_beans_farm_id_fkey",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.varietalId],
      foreignColumns: [coffeeVarietals.id],
      name: "coffee_beans_varietal_id_fkey",
    }).onDelete("set null"),
  ],
);

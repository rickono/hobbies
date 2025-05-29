import { foreignKey, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { locationType } from "./locationType";

export const locations = pgTable(
  "locations",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    type: locationType().notNull(),
    parentId: text("parent_id"),
    abbr: varchar({ length: 255 }),
  },
  (table) => [
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "locations_parent_id_fkey",
    }).onDelete("cascade"),
  ],
);

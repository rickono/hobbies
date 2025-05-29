import { foreignKey, pgTable, text, unique } from "drizzle-orm/pg-core";
import { awardType } from "./awardType";

export const awardDistinction = pgTable(
  "award_distinction",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    awardTypeId: text("award_type_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.awardTypeId],
      foreignColumns: [awardType.id],
      name: "award_distinction_award_type_id_fkey",
    }).onDelete("cascade"),
    unique("award_distinction_name_key").on(table.name),
  ],
);

import { foreignKey, integer, pgTable } from "drizzle-orm/pg-core";
import { ingredients } from "./ingredients";

export const ingredientCategory = pgTable(
  "ingredient_category",
  {
    ingredientId: integer("ingredient_id").notNull(),
    categoryId: integer("category_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.ingredientId],
      foreignColumns: [ingredients.id],
      name: "ingredient_category_ingredient_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [ingredients.id],
      name: "ingredient_category_category_id_fkey",
    }).onDelete("cascade"),
  ],
);

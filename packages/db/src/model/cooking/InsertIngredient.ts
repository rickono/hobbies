import { IngredientId } from "@rono/types";

export interface InsertIngredient {
  name: string;
  categoryId: IngredientId;
}

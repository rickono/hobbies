import { IngredientId, RecipePartId, UnitId } from "@rono/types";

export interface InsertRecipeIngredient {
  ingredientId?: IngredientId;
  recipePartId: RecipePartId;
  quantity: number;
  unitId?: UnitId;
  rawText: string;
  preparation?: string;
  quantifier?: string;
}

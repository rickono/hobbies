import { RecipeId } from "@rono/types";
import { InsertRecipeIngredient } from "./InsertRecipeIngredient";

export interface InsertRecipePart {
  recipeId: RecipeId;
  description: string;
  ingredients: Omit<InsertRecipeIngredient, "recipePartId">[];
}

import { RecipeIngredientId } from "../../nominal";
import { IngredientId } from "../../nominal/IngredientId";
import { Unit } from "../general";

export interface RecipeIngredient {
  id: RecipeIngredientId;
  ingredientId: IngredientId;
  quantity: number;
  unit?: Unit;
}

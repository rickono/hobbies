import { RecipePartId } from "../../nominal";
import { RecipeIngredient } from "./RecipeIngredient";

export interface RecipePart {
  id: RecipePartId;
  description: string;
  ingredients: RecipeIngredient[];
}

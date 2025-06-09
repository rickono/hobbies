import { IngredientId } from "../../nominal/IngredientId";

export interface BaseIngredient {
  id: IngredientId;
  name: string;
}

export interface Ingredient {
  id: IngredientId;
  name: string;
  categories: BaseIngredient[];
  children: BaseIngredient[];
}

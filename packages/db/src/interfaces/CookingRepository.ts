import {
  BaseIngredient,
  Ingredient,
  IngredientId,
  RecipeId,
  Source,
  Unit,
} from "@rono/types";
import { InsertIngredient, InsertRecipe } from "../model";

export interface CookingRepository {
  // Create
  insertRecipe: (recipe: InsertRecipe) => Promise<RecipeId>;
  insertIngredient: (ingredient: InsertIngredient) => Promise<IngredientId>;
  // Read
  getAllIngredients: () => Promise<BaseIngredient[]>;
  getIngredient: (id: IngredientId) => Promise<Ingredient | undefined>;
  getAllUnits: () => Promise<Unit[]>;
  getAllSources: () => Promise<Source[]>;
  getRootIngredients: () => Promise<Ingredient[]>;
  // Update
  // Delete
}

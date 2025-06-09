import {
  IngredientId,
  RecipeId,
  RecipePartId,
  SourceId,
  UnitId,
} from "@rono/types";

export interface RecipeFormData {
  source: {
    sourceId: SourceId;
  };
  recipe: {
    name: string;
    nativeName?: string;
    description?: string;
  };
  parts: {
    description: string;
    ingredients: string;
  }[];
}

export interface ParsedIngredient {
  quantity?: number;
  unit?: string;
  quantifier?: string;
  ingredient?: string;
  preparation?: string;
  rawText: string;
}

export interface FormIngredient {
  quantity: number;
  unitId: UnitId;
  quantifier?: string;
  preparation?: string;
  rawText: string;
  ingredientId?: IngredientId; // links to an ingredient
  ingredientName?: string;
  recipeId?: RecipeId; // links to a recipe to make this ingredient
  partId?: RecipePartId; // links to a part of this recipe
}

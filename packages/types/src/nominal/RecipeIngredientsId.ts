declare const recipeIngredientIdBrand: unique symbol;
export type RecipeIngredientId = number & {
  [recipeIngredientIdBrand]: "RecipeIngredientId";
};

export function RecipeIngredientId(id: number): RecipeIngredientId {
  return id as RecipeIngredientId;
}

// Define a static-like property for NULL ID
RecipeIngredientId.NULL = RecipeIngredientId(0);

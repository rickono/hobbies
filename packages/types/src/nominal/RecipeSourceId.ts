declare const recipeSourceIdBrand: unique symbol;
export type RecipeSourceId = number & {
  [recipeSourceIdBrand]: "RecipeSourceId";
};

export function RecipeSourceId(id: number): RecipeSourceId {
  return id as RecipeSourceId;
}

RecipeSourceId.NULL = RecipeSourceId(0);

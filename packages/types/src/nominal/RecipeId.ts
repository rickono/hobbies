declare const recipeIdBrand: unique symbol;
export type RecipeId = number & {
  [recipeIdBrand]: "RecipeId";
};

export const isRecipeId = (id: unknown): id is RecipeId => {
  return typeof id === "number" && id > 0;
};

export function RecipeId(id: number): RecipeId {
  return id as RecipeId;
}

RecipeId.NULL = RecipeId(0);

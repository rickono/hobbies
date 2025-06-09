declare const recipePartIdBrand: unique symbol;
export type RecipePartId = number & {
  [recipePartIdBrand]: "RecipePartId";
};

export const isRecipePartId = (id: unknown): id is RecipePartId => {
  return typeof id === "number" && id > 0;
};

export function RecipePartId(id: number): RecipePartId {
  return id as RecipePartId;
}

RecipePartId.NULL = RecipePartId(0);

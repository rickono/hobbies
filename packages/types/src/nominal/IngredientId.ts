declare const ingredientIdBrand: unique symbol;
export type IngredientId = number & {
  [ingredientIdBrand]: "IngredientId";
};

export const isIngredientId = (id: unknown): id is IngredientId => {
  return typeof id === "number" && id > 0;
};

export function IngredientId(id: number): IngredientId {
  return id as IngredientId;
}

IngredientId.NULL = IngredientId(0);

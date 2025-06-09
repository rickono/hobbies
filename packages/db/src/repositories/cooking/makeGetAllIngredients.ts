import { IngredientId } from "@rono/types";
import { CookingRepository } from "../../interfaces";
import { MakeRepositoryMethod } from "../../types";

export const makeGetAllIngredients: MakeRepositoryMethod<
  CookingRepository["getAllIngredients"]
> = (db) => {
  return async () => {
    const ingredients = await db
      .selectFrom("ingredients")
      .select(["id", "name"])
      .execute();

    return ingredients.map(({ id, name }) => ({
      id: IngredientId(id),
      name,
    }));
  };
};

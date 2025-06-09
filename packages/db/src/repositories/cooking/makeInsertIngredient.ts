import { IngredientId } from "@rono/types";
import { CookingRepository } from "../../interfaces";
import { MakeRepositoryMethod } from "../../types";

export const makeInsertIngredient: MakeRepositoryMethod<
  CookingRepository["insertIngredient"]
> = (db) => {
  return async ({ name, categoryId }) => {
    const id = await db.transaction().execute(async (txn) => {
      // Insert the ingredient
      const { id } = await txn
        .insertInto("ingredients")
        .values({
          name,
        })
        .returning("id")
        .executeTakeFirstOrThrow();

      // Insert the category
      await txn
        .insertInto("ingredient_category")
        .values({
          ingredient_id: id,
          category_id: categoryId,
        })
        .execute();

      return id;
    });

    return IngredientId(id);
  };
};

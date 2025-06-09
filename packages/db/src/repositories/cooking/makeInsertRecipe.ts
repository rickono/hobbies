import { RecipeId } from "@rono/types";
import { CookingRepository } from "../../interfaces";
import { MakeRepositoryMethod } from "../../types";

export const makeInsertRecipe: MakeRepositoryMethod<
  CookingRepository["insertRecipe"]
> = (db) => {
  return async ({ name, description, sourceId, parts, nativeName }) => {
    const id = await db.transaction().execute(async (txn) => {
      // Insert the recipe
      const { id } = await txn
        .insertInto("recipes")
        .values({
          name,
          description,
          source_id: sourceId,
          name_native: nativeName,
        })
        .returning("id")
        .executeTakeFirstOrThrow();

      // Insert each part
      if (parts === undefined) {
        return id;
      }

      await Promise.all(
        parts.map(async ({ description, ingredients }, idx) => {
          const { id: recipePartId } = await txn
            .insertInto("recipe_part")
            .values({
              recipe_id: id,
              description,
              position: idx,
            })
            .returning("id")
            .executeTakeFirstOrThrow();

          await txn
            .insertInto("recipe_ingredients")
            .values(
              ingredients.map(
                ({
                  ingredientId,
                  rawText,
                  quantity,
                  unitId,
                  preparation,
                  quantifier,
                }) => ({
                  ingredient_id: ingredientId,
                  recipe_part_id: recipePartId,
                  raw_text: rawText,
                  quantity,
                  unit_id: unitId,
                  preparation,
                  quantifier,
                }),
              ),
            )
            .execute();
        }),
      );

      return id;
    });

    return RecipeId(id);
  };
};

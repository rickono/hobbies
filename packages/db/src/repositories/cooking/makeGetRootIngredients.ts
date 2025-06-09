import { IngredientId } from "@rono/types";
import { sql } from "kysely";
import { CookingRepository } from "../../interfaces";
import { MakeRepositoryMethod } from "../../types";

export const makeGetRootIngredients: MakeRepositoryMethod<
  CookingRepository["getRootIngredients"]
> = (db) => {
  return async () => {
    const ingredients = await db
      .selectFrom("ingredients as i")
      .leftJoin("ingredient_category as ic", "ic.category_id", "i.id")
      .leftJoin("ingredients as child", "child.id", "ic.ingredient_id")
      .leftJoin("ingredient_category as icc", "icc.ingredient_id", "i.id")
      .leftJoin("ingredients as parent", "parent.id", "icc.category_id")
      .select([
        "i.id",
        "i.name",
        sql<{ id: IngredientId; name: string }[]>`
          coalesce(
            json_agg(
              DISTINCT jsonb_build_object('id', child.id, 'name', child.name)
            ) FILTER (
              WHERE
                child.id IS NOT NULL
            ),
            '[]'
          )
        `.as("children"),
        sql<{ id: IngredientId; name: string }[]>`
          coalesce(
            json_agg(
              DISTINCT jsonb_build_object('id', parent.id, 'name', parent.name)
            ) FILTER (
              WHERE
                parent.id IS NOT NULL
            ),
            '[]'
          )
        `.as("categories"),
      ])
      .where("parent.id", "is", null)
      .groupBy(["i.id", "i.name"])
      .execute();

    return ingredients.map((ingredient) => ({
      id: IngredientId(ingredient.id),
      name: ingredient.name!,
      categories: ingredient.categories.map(({ id, name }) => ({
        id,
        name,
      })),
      children: ingredient.children.map(({ id, name }) => ({
        id,
        name,
      })),
    }));
  };
};

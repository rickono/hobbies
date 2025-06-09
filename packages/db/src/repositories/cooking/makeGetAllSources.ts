import { SourceId } from "@rono/types";
import { CookingRepository } from "../../interfaces";
import { MakeRepositoryMethod } from "../../types";

export const makeGetAllSources: MakeRepositoryMethod<
  CookingRepository["getAllSources"]
> = (db) => {
  return async () => {
    const units = await db
      .selectFrom("recipe_source")
      .select(["id", "name", "type", "description", "url", "author"])
      .execute();

    return units.map(({ id, name, type, description, url, author }) => ({
      id: SourceId(id),
      name,
      type,
      description: description ?? undefined,
      url: url ?? undefined,
      author: author ?? undefined,
    }));
  };
};

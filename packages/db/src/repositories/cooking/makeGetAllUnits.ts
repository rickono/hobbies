import { UnitId } from "@rono/types";
import { CookingRepository } from "../../interfaces";
import { MakeRepositoryMethod } from "../../types";

export const makeGetAllUnits: MakeRepositoryMethod<
  CookingRepository["getAllUnits"]
> = (db) => {
  return async () => {
    const units = await db
      .selectFrom("units")
      .select(["id", "name", "abbreviation", "type"])
      .execute();

    return units.map(({ id, name, abbreviation, type }) => ({
      id: UnitId(id),
      name,
      abbreviation: abbreviation ?? undefined,
      type: type ?? undefined,
    }));
  };
};

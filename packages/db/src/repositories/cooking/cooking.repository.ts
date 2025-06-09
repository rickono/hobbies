import { Kysely } from "kysely";
import { DB } from "../../db";
import { CookingRepository } from "../../interfaces/CookingRepository";
import { makeGetAllIngredients } from "./makeGetAllIngredients";
import { makeGetAllSources } from "./makeGetAllSources";
import { makeGetAllUnits } from "./makeGetAllUnits";
import { makeGetIngredient } from "./makeGetIngredient";
import { makeGetRootIngredients } from "./makeGetRootIngredients";
import { makeInsertIngredient } from "./makeInsertIngredient";
import { makeInsertRecipe } from "./makeInsertRecipe";

export const createCookingRepository = (db: Kysely<DB>): CookingRepository => ({
  insertRecipe: makeInsertRecipe(db),
  insertIngredient: makeInsertIngredient(db),
  getAllIngredients: makeGetAllIngredients(db),
  getIngredient: makeGetIngredient(db),
  getAllUnits: makeGetAllUnits(db),
  getAllSources: makeGetAllSources(db),
  getRootIngredients: makeGetRootIngredients(db),
});

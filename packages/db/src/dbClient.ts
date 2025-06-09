import { Kysely } from "kysely";
import { db } from "./database";
import { DB } from "./db";
import { Db } from "./interfaces";
import { createCookingRepository } from "./repositories";
import { createRestaurantRepository } from "./repositories/restaurant";

const createDbClient = (db: Kysely<DB>): Db => ({
  cooking: createCookingRepository(db),
  restaurant: createRestaurantRepository(db),
});

export const dbClient = createDbClient(db);

import { Cuisine, CuisineId, RestaurantId } from "@rono/types";
import { db } from "../../DatabaseConnection";
import {
  getCuisinesQuery,
  insertCuisineQuery,
  insertRestaurantCuisineQuery,
} from "../queries";
import { DbCuisineEntity, InsertCuisine } from "../types";

export class CuisineManager {
  public constructor() {}

  public async getCuisines(): Promise<Cuisine[]> {
    const result = await db.query<DbCuisineEntity>(getCuisinesQuery());
    return result.rows;
  }

  public async insertCuisine(
    cuisine: InsertCuisine,
  ): Promise<CuisineId | undefined> {
    const rows = await db.query<{ id: CuisineId }>(
      insertCuisineQuery(cuisine.id, cuisine.name),
    );
    return rows.rows[0]?.id;
  }

  public async insertRestaurantCuisine(
    cuisineId: CuisineId,
    restaurantId: RestaurantId,
  ): Promise<void> {
    await db.query(insertRestaurantCuisineQuery(restaurantId, cuisineId));
  }
}

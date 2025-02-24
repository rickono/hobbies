import { CuisineId, RestaurantId } from "@rono/types";
import sql, { SQLStatement } from "sql-template-strings";

export const insertRestaurantCuisineQuery = (
  restaurantId: RestaurantId,
  cuisineId: CuisineId,
): SQLStatement => {
  return sql`
    INSERT INTO
      restaurant_cuisine (restaurant_id, cuisine_id)
    VALUES
      (
        ${restaurantId},
        ${cuisineId}
      )
    ON CONFLICT DO NOTHING
  `;
};

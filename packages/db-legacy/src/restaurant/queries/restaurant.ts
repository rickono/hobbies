import { LocationId, RestaurantId } from "@rono/types";
import sql, { SQLStatement } from "sql-template-strings";
import { DbRestaurantEntity } from "../types";

export const insertRestaurantQuery = (
  restaurant: Partial<DbRestaurantEntity>,
): SQLStatement => sql`
  INSERT INTO
    restaurant (
      name,
      longitude,
      latitude,
      location_id,
      website,
      currency_id,
      phone,
      street_address,
      postcode
    )
  VALUES
    (
      ${restaurant.name},
      ${restaurant.longitude},
      ${restaurant.latitude},
      ${restaurant.location_id},
      ${restaurant.website},
      ${restaurant.currency_id},
      ${restaurant.phone},
      ${restaurant.street_address},
      ${restaurant.postcode}
    )
  ON CONFLICT ON CONSTRAINT unique_name_loc DO UPDATE
  SET
    name = EXCLUDED.name
  RETURNING
    id,
    (xmax = 0) AS is_new;
`;

export const insertBookingInfoQuery = (
  restaurantId: RestaurantId,
  providerId: "resy" | "tock" | "opentable",
  url: string,
): SQLStatement => {
  return sql`
    INSERT INTO
      restaurant_booking (url, restaurant_id, provider_id)
    VALUES
      (
        ${url},
        ${restaurantId},
        ${providerId}
      )
    ON CONFLICT ON CONSTRAINT unique_booking DO UPDATE
    SET
      url = EXCLUDED.url
  `;
};

export const updateRestaurantLocationQuery = (
  restaurantId: RestaurantId,
  locationId: LocationId,
): SQLStatement => {
  return sql`
    UPDATE restaurant
    SET
      location_id = ${locationId}
    WHERE
      id = ${restaurantId}
  `;
};

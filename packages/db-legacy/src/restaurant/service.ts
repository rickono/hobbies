import { AwardId, CuisineId, DistinctionId, RestaurantId } from "@rono/types";
import { slugify } from "@rono/utils";
import { db } from "../DatabaseConnection";
import {
  insertBookingInfoQuery,
  insertCuisineQuery,
  insertRestaurantCuisineQuery,
  insertRestaurantQuery,
} from "./queries";
import { insertAwardQuery, insertDistinctionQuery } from "./queries/award";
import {
  DbAwardEntity,
  DbRestaurantEntity,
  InsertAward,
  InsertRestaurant,
} from "./types";

/**
 * Inserts a fully formed restaurant
 * @param restaurant
 */
export const insertRestaurant = async (
  restaurant: InsertRestaurant,
): Promise<{ id: RestaurantId; isNew: boolean } | undefined> => {
  const {
    name,
    locationId,
    phone,
    streetAddress,
    latitude,
    longitude,
    postcode,
    currencyId,
    website,
  } = restaurant;

  // Insert the actual restaurant
  const restaurantEntity: Partial<DbRestaurantEntity> = {
    name,
    longitude,
    latitude,
    website,
    currency_id: currencyId,
    phone,
    street_address: streetAddress,
    postcode,
    location_id: locationId,
  };

  const insertedRestaurantRow = await db.query<{
    id: RestaurantId;
    is_new: boolean;
  }>(insertRestaurantQuery(restaurantEntity));
  const insertedRestaurant = insertedRestaurantRow.rows[0];

  return (
    insertedRestaurant && {
      id: insertedRestaurant.id,
      isNew: insertedRestaurant.is_new,
    }
  );
};

export const insertCuisine = async (
  name: string,
): Promise<CuisineId | undefined> => {
  const cuisineId = slugify(name);
  const { rows } = await db.query<{ id: CuisineId }>(
    insertCuisineQuery(cuisineId, name),
  );
  return rows[0]?.id;
};

export const insertRestaurantCuisine = async (
  restaurantId: RestaurantId,
  cuisineId: CuisineId,
): Promise<void> => {
  await db.query(insertRestaurantCuisineQuery(restaurantId, cuisineId));
};

export const insertAward = async (
  award: InsertAward,
): Promise<AwardId | undefined> => {
  const result = await db.query<DbAwardEntity>(insertAwardQuery(award));
  return result.rows[0]?.id;
};

export const insertDistinction = async (
  awardId: AwardId,
  distinctionId: DistinctionId,
): Promise<void> => {
  db.query(insertDistinctionQuery(awardId, distinctionId));
};

export const insertBookingInfo = async (
  restaurantId: RestaurantId,
  providerId: "resy" | "tock" | "opentable",
  url: string,
): Promise<void> => {
  db.query(insertBookingInfoQuery(restaurantId, providerId, url));
};

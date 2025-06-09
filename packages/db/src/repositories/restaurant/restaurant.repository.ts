import { RestaurantId } from "@rono/types";
import { Kysely } from "kysely";
import { DB } from "../../db";
import { RestaurantRepository } from "../../interfaces";

export const createRestaurantRepository = (
  db: Kysely<DB>,
): RestaurantRepository => {
  return {
    insertRestaurant: async (toInsert) => {
      const {
        name,
        location: location_id,
        latitude,
        longitude,
        phone,
        website,
        streetAddress: street_address,
        postcode,
        cuisines,
        awards,
        booking,
      } = toInsert;
      const id = await db.transaction().execute(async (trx) => {
        // Insert the actual restaurant
        const { id } = await trx
          .insertInto("restaurant")
          .values({
            name,
            location_id,
            latitude,
            longitude,
            phone,
            website,
            postcode,
            street_address,
          })
          .returning("id")
          .executeTakeFirstOrThrow();
        // Insert cuisines for restaurant
        if (cuisines !== undefined) {
          trx
            .insertInto("restaurant_cuisine")
            .values(
              cuisines?.map((cuisine_id) => ({
                cuisine_id,
                restaurant_id: id,
              })),
            )
            .execute();
        }

        // Insert awards for restaurant
        if (awards !== undefined) {
          await Promise.all(
            awards.map(
              async ({
                awardTypeId,
                awardDate,
                rank,
                metadata,
                description,
                url,
                distinctions,
              }) => {
                const { id: awardId } = await trx
                  .insertInto("restaurant_award")
                  .values({
                    restaurant_id: id,
                    award_type_id: awardTypeId,
                    award_date: awardDate,
                    rank,
                    metadata: JSON.stringify(metadata),
                    description,
                    url,
                  })
                  .returning("id")
                  .executeTakeFirstOrThrow();
                // Insert distinctions for award
                if (distinctions !== undefined) {
                  trx.insertInto("restaurant_award_distinction").values(
                    distinctions.map(({ distinctionId }) => ({
                      restaurant_award_id: awardId,
                      distinction_id: distinctionId,
                    })),
                  );
                }
              },
            ),
          );
        }
        // Insert booking information
        if (booking !== undefined) {
          await trx
            .insertInto("restaurant_booking")
            .values({
              restaurant_id: id,
              provider_id: booking.providerId,
              url: booking.url,
            })
            .execute();
        }
        return id;
      });

      return RestaurantId(id);
    },
  };
};

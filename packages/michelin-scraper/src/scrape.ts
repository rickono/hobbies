import { RestaurantsDb } from "@rono/db";
import { MichelinScraper } from "./MichelinScraper";
import { InsertRestaurant } from "../../db/src/restaurant/types";

export const scrape = async () => {
  const restaurantsDb = new RestaurantsDb();
  const michelinScraper = new MichelinScraper("chicago");

  const allRestaurants = await michelinScraper.fetchAllRestaurants();

  for (const restaurant of allRestaurants) {
    const toInsert: InsertRestaurant = {
      name: restaurant.name,
      website: restaurant.website,
      phone: restaurant.phone,
      location: {
        address: {
          streetAddress: restaurant.streetAddress,
          postcode: restaurant.postcode,
        },
      },
    };
  }
};

import {
  AWARD_TYPE_MICHELIN,
  LocationsDb,
  RestaurantsDb,
} from "@rono/db-legacy";
import { Geoloc } from "@rono/geoloc";
import { MichelinScraper } from "@rono/michelin-scraper";
import {
  CuisineId,
  DistinctionId,
  Location,
  LocationId,
  LocationType,
} from "@rono/types";
import {
  getMostSpecificLocation,
  locationSpecificities,
  slugify,
} from "@rono/utils";
import dayjs from "dayjs";
import { isDefined } from "../type-guards";

export class MichelinService {
  public constructor(
    private readonly michelinScraper: MichelinScraper,
    private readonly restaurantDb: RestaurantsDb,
    private readonly locationsDb: LocationsDb,
    private readonly geoloc: Geoloc,
  ) {}

  public async scrape(): Promise<void> {
    const allCuisines = await this.restaurantDb.cuisines.getCuisines();
    const cuisineIds = new Set(allCuisines.map(({ id }) => id));
    const allLocations = await this.locationsDb.getLocations();
    const locationIds = new Set(allLocations.map(({ id }) => id));

    // Fetch restaurants from API
    const restaurants = await this.michelinScraper.fetchAllRestaurants();
    console.log(restaurants);

    // Insert restaurant entities
    const restaurantIds = await Promise.all(
      restaurants.map(async (rawRestaurant) => {
        const result = await this.restaurantDb.insertRestaurant(rawRestaurant);
        if (!isDefined(result)) {
          return;
        }

        // Insert cuisines
        const restaurantCuisineNames = rawRestaurant.cuisine;
        const restaurantCuisines = restaurantCuisineNames.map(
          (cuisineName) => ({
            id: CuisineId(slugify(cuisineName)),
            name: cuisineName,
          }),
        );
        for (const cuisine of restaurantCuisines) {
          if (!cuisineIds.has(cuisine.id)) {
            await this.restaurantDb.cuisines.insertCuisine(cuisine);
          }
          this.restaurantDb.cuisines.insertRestaurantCuisine(
            cuisine.id,
            result.id,
          );
        }

        // Insert the michelin award
        const awardId = await this.restaurantDb.awards.insertAward({
          restaurantId: result.id,
          awardTypeId: AWARD_TYPE_MICHELIN,
          awardDate: dayjs(rawRestaurant.date).format("YYYY-MM-DD"),
          description: rawRestaurant.description,
          url: rawRestaurant.michelinUrl,
        });

        // Insert distinctions
        if (awardId && rawRestaurant.bibGourmand) {
          this.restaurantDb.awards.insertDistinction(
            awardId,
            DistinctionId("michelin-bib-gourmand"),
          );
        }
        if (awardId && rawRestaurant.stars === 1) {
          this.restaurantDb.awards.insertDistinction(
            awardId,
            DistinctionId("michelin-1-star"),
          );
        }
        if (awardId && rawRestaurant.stars === 2) {
          this.restaurantDb.awards.insertDistinction(
            awardId,
            DistinctionId("michelin-2-star"),
          );
        }
        if (awardId && rawRestaurant.stars === 3) {
          this.restaurantDb.awards.insertDistinction(
            awardId,
            DistinctionId("michelin-3-star"),
          );
        }
        if (awardId && rawRestaurant.greenStar) {
          this.restaurantDb.awards.insertDistinction(
            awardId,
            DistinctionId("michelin-green-star"),
          );
        }

        // Insert booking info
        if (isDefined(rawRestaurant.bookingProvider)) {
          let providerId: "tock" | "resy" | "opentable" | undefined;
          switch (rawRestaurant.bookingProvider) {
            case "OpenTable":
              providerId = "opentable";
              break;
            case "Resy":
              providerId = "resy";
              break;
            case "Tock":
              providerId = "tock";
              break;
          }
          if (isDefined(providerId)) {
            this.restaurantDb.insertBookingInfo(
              result.id,
              providerId,
              rawRestaurant.bookingUrl,
            );
          }
        }

        // Geolocate
        const geocodeResponse = await this.geoloc.reverseGeocode(
          rawRestaurant.longitude,
          rawRestaurant.latitude,
        );
        const locations: Omit<Location, "parentId">[] = geocodeResponse.features
          .map((feature) => {
            let type: LocationType | undefined;
            let abbr: string | null = null;
            switch (feature.properties.feature_type) {
              case "country":
                type = "country";
                abbr = feature.properties.context.country?.country_code ?? null;
                break;
              case "region":
                type = "state";
                abbr = feature.properties.context.region?.region_code ?? null;
                break;
              case "place":
                type = "city";
                break;
              case "neighborhood":
                type = "neighborhood";
                break;
            }
            if (type === undefined) {
              return undefined;
            }
            return {
              type,
              name: feature.properties.name,
              abbr,
              id: LocationId(feature.id),
            };
          })
          .filter(isDefined)
          .sort(
            (locA, locB) =>
              locationSpecificities[locB.type] -
              locationSpecificities[locA.type],
          );
        for (const [idx, location] of locations.entries()) {
          console.log(locationIds);
          if (locationIds.has(location.id)) {
            continue;
          }
          await this.locationsDb.insertLocation({
            ...location,
            id: location.id,
            parentId:
              idx > 0 && locations[idx - 1]
                ? locations[idx - 1]?.id
                : undefined,
          });
        }
        const restaurantLocation = getMostSpecificLocation(locations);
        console.log(restaurantLocation);
        if (restaurantLocation) {
          this.restaurantDb.updateRestaurantLocation(
            result.id,
            restaurantLocation.id,
          );
        }
      }),
    );
  }
}

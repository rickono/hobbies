import { isDefined } from "@rono/utils";
import { LOCATIONS } from "./constants";
import { Hit, MichelinLocation, RawRestaurant, Schedule } from "./types";

const ALGOLIA_APP_ID = "8NVHRD7ONV";
const ALGOLIA_API_KEY = "3222e669cf890dc73fa5f38241117ba5";
const ALGOLIA_AGENT = "Algolia for JavaScript (4.19.1); Browser (lite)";
const INDEX_NAME = "prod-restaurants-en_sort_geo";

const URL = `https://8nvhrd7onv-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=${ALGOLIA_AGENT}&x-algolia-api-key=${ALGOLIA_API_KEY}&x-algolia-application-id=${ALGOLIA_APP_ID}`;

const headers = {
  "x-algolia-api-key": ALGOLIA_API_KEY,
  "x-algolia-application-id": ALGOLIA_APP_ID,
  "Content-Type": "application/json",
  Referer: "guide.michelin.com",
};
const michelinStarToInt = (star: string): number => {
  if (star === "ONE") {
    return 1;
  }
  if (star === "TWO") {
    return 2;
  }
  if (star === "THREE") {
    return 3;
  }
  return 0;
};

export const hitToRestaurant = (hit: Hit): RawRestaurant => {
  const lat = hit["_geoloc"]["lat"];
  const lng = hit["_geoloc"]["lng"];
  const stars = michelinStarToInt(hit["michelin_star"] ?? "NONE");
  const cuisines = (hit["cuisines"] ?? []).map((cuisine) => cuisine.label);
  const schedule: Schedule[] = Object.entries(
    hit["hours_of_operation"] ?? {},
  ).flatMap(([day, hoursOfOperation]) =>
    hoursOfOperation.map((schedule) => ({
      day,
      closed: schedule.closed,
      close: schedule.closes,
      open: schedule.opens,
    })),
  );

  return {
    name: hit.name,
    latitude: lat,
    longitude: lng,
    description: hit["main_desc"],
    stars: stars,
    greenStar: isDefined(hit["green_star"]),
    bibGourmand: hit["michelin_award"] === "BIB_GOURMAND",
    cuisine: cuisines,
    bookingProvider: hit["booking_provider"] as "Resy" | "OpenTable" | "Tock",
    bookingUrl: hit["booking_url"],
    currency: hit["currency"],
    phone: hit["phone"],
    michelinUrl: hit["url"],
    postcode: hit["postcode"],
    streetAddress: hit["street"],
    schedule: schedule,
    website: hit["website"],
    date: new Date(hit["published_date"]),
  };
};

export class MichelinScraper {
  private latLng?: string;
  private isState?: boolean;
  private locationFilters: [string][] = [];

  public constructor(location?: MichelinLocation) {
    if (location) {
      const { latLng, isState, filters } = LOCATIONS[location];
      this.latLng = latLng;
      this.isState = isState;
      this.locationFilters = filters;
    }
  }

  public async fetchRestaurants(page: number): Promise<RawRestaurant[]> {
    const facetFilters = encodeURIComponent(
      JSON.stringify([
        ...this.locationFilters,
        // ["distinction.slug:3-stars-michelin"],
      ]),
    );

    const payload = {
      requests: [
        {
          indexName: INDEX_NAME,
          params: `
            ${this.latLng ? `aroundLatLng=${this.latLng}` : ""}&
            aroundLatLngViaIP=false&
            aroundRadius=all&
            attributesToRetrieve=_geoloc,booking_url,booking_provider,
            currency,currency_symbol,phone,
            green_star,guide_year,published_date,main_desc,michelin_award,
            michelin_star,name,price_category,website,cuisines,url,street,postcode,
            hours_of_operation&
            facetFilters=${facetFilters}&
            filters=status:Published&
            hitsPerPage=100&
            page=${page}&
            query=`.replace(/\s+/g, ""),
        },
      ],
    };
    const response = await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    const hits: Hit[] | undefined = json.results[0].hits;
    return hits?.map((hit) => hitToRestaurant(hit)) ?? [];
  }

  public async fetchAllRestaurants(): Promise<RawRestaurant[]> {
    const allRestaurants: RawRestaurant[] = [];
    let page = 0;
    while (true) {
      const restaurantsOnPage = await this.fetchRestaurants(page);
      if (restaurantsOnPage.length <= 0) {
        break;
      }
      allRestaurants.push(...restaurantsOnPage);
      page += 1;
    }
    return allRestaurants;
  }
}

import { sql } from "drizzle-orm";
import { integer, json, pgView, text } from "drizzle-orm/pg-core";

export const enrichedRestaurant = pgView("enriched_restaurant", {
  id: integer(),
  name: text(),
  website: text(),
  phone: text(),
  streetAddress: text("street_address"),
  postcode: text(),
  locations: json(),
  cuisines: json(),
  awards: json(),
  booking: json(),
}).as(sql`
  SELECT
    r.id,
    r.name,
    r.website,
    r.phone,
    r.street_address,
    r.postcode,
    rl.locations,
    rc.cuisines,
    ra.awards,
    rb.booking
  FROM
    restaurant r
    LEFT JOIN restaurant_awards ra ON ra.id = r.id
    LEFT JOIN restaurant_cuisines rc ON rc.id = r.id
    LEFT JOIN restaurant_locations rl ON rl.id = r.id
    LEFT JOIN restaurant_booking_view rb ON rb.id = r.id
`);

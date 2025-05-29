import { sql } from "drizzle-orm";
import { integer, json, pgView } from "drizzle-orm/pg-core";

export const restaurantBookingView = pgView("restaurant_booking_view", {
  id: integer(),
  booking: json(),
}).as(sql`
  SELECT
    r.id,
    COALESCE(
      json_agg(
        jsonb_build_object('name', bp.name, 'id', bp.id, 'url', rb.url)
      ) FILTER (
        WHERE
          bp.id IS NOT NULL
      ),
      '[]'::json
    ) AS booking
  FROM
    restaurant r
    LEFT JOIN restaurant_booking rb ON rb.restaurant_id = r.id
    LEFT JOIN booking_provider bp ON bp.id = rb.provider_id
  GROUP BY
    r.id
`);

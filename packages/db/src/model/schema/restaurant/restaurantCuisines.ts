import { sql } from "drizzle-orm";
import { integer, json, pgView } from "drizzle-orm/pg-core";

export const restaurantCuisines = pgView("restaurant_cuisines", {
  id: integer(),
  cuisines: json(),
}).as(sql`
  SELECT
    r.id,
    COALESCE(
      json_agg(jsonb_build_object('name', c.name, 'id', c.id)) FILTER (
        WHERE
          c.id IS NOT NULL
      ),
      '[]'::json
    ) AS cuisines
  FROM
    restaurant r
    LEFT JOIN restaurant_cuisine rc ON rc.restaurant_id = r.id
    LEFT JOIN cuisine c ON rc.cuisine_id = c.id
  GROUP BY
    r.id,
    r.name
`);

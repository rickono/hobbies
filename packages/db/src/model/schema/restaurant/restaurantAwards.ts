import { sql } from "drizzle-orm";
import { integer, json, pgView, text } from "drizzle-orm/pg-core";

export const restaurantAwards = pgView("restaurant_awards", {
  id: integer(),
  name: text(),
  awards: json(),
}).as(sql`
  SELECT
    r.id,
    r.name,
    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object(
          'id',
          at.id,
          'award',
          at.name,
          'date',
          ra.award_date,
          'distinctions',
          COALESCE(
            (
              SELECT
                json_agg(jsonb_build_object('id', ad.id, 'name', ad.name)) AS json_agg
              FROM
                restaurant_award_distinction rad
                LEFT JOIN award_distinction ad ON rad.distinction_id = ad.id
              WHERE
                ra.award_type_id = at.id
                AND ra.restaurant_id = r.id
                AND rad.restaurant_award_id = ra.id
            ),
            '[]'::json
          )
        )
      ) FILTER (
        WHERE
          at.id IS NOT NULL
      ),
      '[]'::json
    ) AS awards
  FROM
    restaurant r
    LEFT JOIN restaurant_award ra ON ra.restaurant_id = r.id
    LEFT JOIN award_type at ON ra.award_type_id = at.id
  GROUP BY
    r.id,
    r.name
`);

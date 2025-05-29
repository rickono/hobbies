import { sql } from "drizzle-orm";
import { integer, json, pgView } from "drizzle-orm/pg-core";

export const restaurantLocations = pgView("restaurant_locations", {
  id: integer(),
  locations: json(),
}).as(sql`
  WITH RECURSIVE
    location_hierarchy AS (
      SELECT
        r.id AS restaurant_id,
        r.name AS restaurant_name,
        l.id AS location_id,
        l.name AS location_name,
        l.type AS location_type,
        l.abbr AS location_abbr,
        l.parent_id,
        0 AS depth
      FROM
        restaurant r
        JOIN locations l ON r.location_id = l.id
      UNION ALL
      SELECT
        lh_1.restaurant_id,
        lh_1.restaurant_name,
        l.id AS location_id,
        l.name AS location_name,
        l.type AS location_type,
        l.abbr AS location_abbr,
        l.parent_id,
        lh_1.depth + 1
      FROM
        locations l
        JOIN location_hierarchy lh_1 ON l.id = lh_1.parent_id
    )
  SELECT
    restaurant_id AS id,
    json_agg(
      json_build_object(
        'id',
        location_id,
        'name',
        location_name,
        'type',
        location_type,
        'abbr',
        location_abbr
      )
      ORDER BY
        depth DESC
    ) AS locations
  FROM
    location_hierarchy lh
  GROUP BY
    restaurant_id,
    restaurant_name
`);

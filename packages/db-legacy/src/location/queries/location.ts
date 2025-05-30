import sql, { SQLStatement } from "sql-template-strings";
import { InsertLocation } from "../types";

export const getLocationsQuery = (): SQLStatement => {
  return sql`
    SELECT
      id,
      name,
      type,
      abbr
    FROM
      locations
  `;
};

export const insertLocationQuery = (location: InsertLocation): SQLStatement => {
  return sql`
    INSERT INTO
      locations (id, name, type, parent_id)
    VALUES
      (
        ${location.id},
        ${location.name},
        ${location.type},
        ${location.parentId}
      )
    ON CONFLICT DO NOTHING
  `;
};

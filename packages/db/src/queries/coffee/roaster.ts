import { LocationId, RoasterId } from "@rono/types";
import sql from "sql-template-strings";
import { Roaster } from "../../../../types/src/models";
import { DatabaseConnection } from "../../DatabaseConnection";

export const roaster = {
  get: (
    db: DatabaseConnection,
    id: RoasterId,
  ): Promise<Roaster | undefined> => {
    const query = sql`
      SELECT
        id,
        name,
        location_id AS "locationId"
      FROM
        coffee_roasters
      WHERE
        id = ${id}
    `;
    return db.query<Roaster>(query).then((result) => result.rows[0]);
  },

  getAll: (db: DatabaseConnection): Promise<Roaster[]> => {
    const query = sql`
      SELECT
        r.id,
        r.name,
        r.location_id AS "locationId",
        COALESCE(
          json_build_object('id', l.id, 'name', l.name),
          '{}'
        ) AS location
      FROM
        coffee_roasters r
        LEFT JOIN locations l ON l.id = r.location_id
    `;
    return db.query<Roaster>(query).then((result) => result.rows);
  },

  insert: (
    db: DatabaseConnection,
    name: string,
    locationId: LocationId,
  ): Promise<RoasterId | undefined> => {
    const query = sql`
      INSERT INTO
        coffee_roasters (name, location_id)
      VALUES
        (
          ${name},
          ${locationId}
        )
      RETURNING
        id
    `;
    return db
      .query<{ id: RoasterId }>(query)
      .then((result) => result.rows[0]?.id);
  },
};

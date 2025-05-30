import { Location, LocationId, LocationType } from "@rono/types";
import sql from "sql-template-strings";
import { DatabaseConnection } from "../../DatabaseConnection";

export class LocationDb {
  public constructor(private readonly db: DatabaseConnection) {}

  public get(id: LocationId): Promise<Location | undefined> {
    const query = sql`
      SELECT
        id,
        name,
        type,
        parent_id,
        abbr,
        json_build_object(
          'id',
          p.id,
          'name',
          p.name,
          'type',
          p.type,
          'abbr',
          p.abbr
        ) AS parent
      FROM
        locations l
        LEFT JOIN locations p ON l.parent_id = p.id
      WHERE
        id = ${id}
    `;
    return this.db.query<Location>(query).then((result) => result.rows[0]);
  }

  public getAllByType = (type: LocationType): Promise<Location[]> => {
    const query = sql`
      SELECT
        id,
        name,
        type,
        parent_id,
        abbr
      FROM
        locations
      WHERE
        type = ${type}
    `;
    return this.db.query<Location>(query).then((result) => result.rows);
  };

  public getAllByParent = (parentId: LocationId): Promise<Location[]> => {
    const query = sql`
      SELECT
        id,
        name,
        type,
        parent_id,
        abbr
      FROM
        locations
      WHERE
        parent_id = ${parentId}
    `;
    return this.db.query<Location>(query).then((result) => result.rows);
  };
}

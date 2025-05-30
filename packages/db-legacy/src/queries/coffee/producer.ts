import { Producer, ProducerId } from "@rono/types";
import sql from "sql-template-strings";
import { DatabaseConnection } from "../../DatabaseConnection";

export class ProducerDb {
  public constructor(private readonly db: DatabaseConnection) {}

  public get(id: ProducerId): Promise<Producer | undefined> {
    const query = sql`
      SELECT
        id,
        name
      FROM
        coffee_producers
      WHERE
        id = ${id}
    `;
    return this.db.query<Producer>(query).then((result) => result.rows[0]);
  }

  public getAll(): Promise<Producer[]> {
    const query = sql`
      SELECT
        id,
        name
      FROM
        coffee_producers
    `;
    return this.db.query<Producer>(query).then((result) => result.rows);
  }

  public insert(name: string): Promise<ProducerId | undefined> {
    const query = sql`
      INSERT INTO
        coffee_producers (name)
      VALUES
        (${name})
      RETURNING
        id
    `;
    return this.db
      .query<{ id: ProducerId }>(query)
      .then((result) => result.rows[0]?.id);
  }
}

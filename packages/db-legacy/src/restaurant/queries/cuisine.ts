import sql, { SQLStatement } from "sql-template-strings";

export const insertCuisineQuery = (id: string, name: string): SQLStatement => {
  return sql`
    INSERT INTO
      cuisine (id, name)
    VALUES
      (
        ${id},
        ${name}
      )
    ON CONFLICT (id) DO UPDATE
    SET
      id = EXCLUDED.id
    RETURNING
      id
  `;
};

export const getCuisinesQuery = (): SQLStatement => {
  return sql`
    SELECT
      id,
      name
    FROM
      cuisine;
  `;
};

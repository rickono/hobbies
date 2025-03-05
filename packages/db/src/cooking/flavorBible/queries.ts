import sql, { SQLStatement } from "sql-template-strings";
import { InsertFlavorBibleAssociation, InsertFlavorBibleEntry } from "./types";

export const insertFlavorBibleEntry = (
  entry: InsertFlavorBibleEntry,
): SQLStatement => sql`
  INSERT INTO
    fb_entry (name, example)
  VALUES
    (
      ${entry.name},
      ${entry.example}
    )
  RETURNING
    id
`;

export const insertFlavorBibleAssociation = (
  association: InsertFlavorBibleAssociation,
): SQLStatement => sql`
  INSERT INTO
    fb_association (
      main_entry,
      associated_entry,
      association_text,
      strength,
      example,
      narrower
    )
  VALUES
    (
      ${association.mainEntry},
      ${association.associatedEntry},
      ${association.associationText},
      ${association.strength},
      ${association.example},
      ${association.narrower}
    )
`;

export const getClosestEntry = (searchString: string): SQLStatement => sql`
  SELECT
    levenshtein (${searchString.toUpperCase()}, name) AS distance,
    name,
    id
  FROM
    fb_entry
  ORDER BY
    distance
  LIMIT
    1
`;

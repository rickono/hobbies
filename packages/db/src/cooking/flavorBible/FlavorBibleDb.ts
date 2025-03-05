import { FlavorBibleEntryId, ParsedFlavorBibleEntry } from "@rono/types";
import { db } from "../../DatabaseConnection";
import {
  insertFlavorBibleAssociation,
  insertFlavorBibleEntry,
} from "./queries";

export class FlavorBibleDb {
  public async insertEntry(entry: ParsedFlavorBibleEntry): Promise<void> {
    const { id, name, example, seeAlso } = entry;

    // Insert the base entry
    const insertedEntry = await db.query<{ id: FlavorBibleEntryId }>(
      insertFlavorBibleEntry({
        name,
        example,
      }),
    );
    const insertedEntryId = insertedEntry.rows[0]?.id;
    if (insertedEntryId === undefined) {
      return;
    }

    // Insert associations
    for (const association of entry.associations) {
      // const closest = await db.query<{
      //   id: FlavorBibleEntryId;
      //   name: string;
      //   distance: number;
      // }>(getClosestEntry(association.name));

      // const associated =
      //   closest.rows[0]?.distance === 0 ? closest.rows[0].id : undefined;
      db.query(
        insertFlavorBibleAssociation({
          associationText: association.name,
          mainEntry: insertedEntryId,
          strength: association.level,
          example: association.example?.map((assoc) => assoc.name),
          narrower: association.narrowers?.map((assoc) => assoc.name),
        }),
      );
    }
    console.log(`inserted ${name}`);
  }
}

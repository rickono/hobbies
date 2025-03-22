import {
  FlavorBibleEntry,
  FlavorBibleEntryId,
  ParsedFlavorBibleEntry,
} from "@rono/types";
import { isDefined } from "@rono/utils";
import { db } from "../../DatabaseConnection";
import {
  getAllEntries,
  getEntry,
  insertFlavorBibleAssociation,
  insertFlavorBibleEntry,
} from "./queries";
import {
  DbFlavorBibleAssociationEntity,
  DbFlavorBibleEntryEntity,
} from "./types";

export class FlavorBibleDb {
  public async getAllEntries(): Promise<FlavorBibleEntry[]> {
    const result = await db.query<FlavorBibleEntry>(getAllEntries);
    return result.rows;
  }

  public async getEntry(
    entryId: FlavorBibleEntryId,
  ): Promise<FlavorBibleEntry | undefined> {
    const result = await db.query<
      DbFlavorBibleEntryEntity & DbFlavorBibleAssociationEntity
    >(getEntry(entryId));
    if (!isDefined(result.rows[0])) {
      return undefined;
    }

    const { name, id, example, see_also, aka, narrower } = result.rows[0];
    const entry: FlavorBibleEntry = {
      name,
      id,
      associations: [],
    };
    for (const row of result.rows) {
      entry.associations?.push({
        name: row.association_text,
        strength: row.strength,
        narrowers: row.narrower,
        examples: row.example,
      });
    }

    return entry;
  }

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
  }
}

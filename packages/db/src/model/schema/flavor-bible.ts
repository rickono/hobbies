import {
  foreignKey,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const fbEntry = pgTable("fb_entry", {
  id: serial().primaryKey().notNull(),
  name: text().notNull(),
  example: text(),
  seeAlso: text("see_also"),
  aka: text(),
});

export const fbAssociation = pgTable(
  "fb_association",
  {
    id: serial().primaryKey().notNull(),
    mainEntry: integer("main_entry"),
    associatedEntry: integer("associated_entry"),
    associationText: text("association_text").notNull(),
    strength: integer().notNull(),
    example: text().array(),
    narrower: text().array(),
  },
  (table) => [
    foreignKey({
      columns: [table.mainEntry],
      foreignColumns: [fbEntry.id],
      name: "fb_association_main_entry_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.associatedEntry],
      foreignColumns: [fbEntry.id],
      name: "fb_association_associated_entry_fkey",
    }).onDelete("cascade"),
  ],
);

export const fbAffinityEntry = pgTable(
  "fb_affinity_entry",
  {
    affinityId: integer("affinity_id").notNull(),
    entryId: integer("entry_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.affinityId],
      foreignColumns: [fbAffinity.id],
      name: "fb_affinity_entry_affinity_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.entryId],
      foreignColumns: [fbEntry.id],
      name: "fb_affinity_entry_entry_id_fkey",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.affinityId, table.entryId],
      name: "fb_affinity_entry_pkey",
    }),
  ],
);

export const fbAffinity = pgTable(
  "fb_affinity",
  {
    id: serial().primaryKey().notNull(),
    entryId: integer("entry_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.entryId],
      foreignColumns: [fbEntry.id],
      name: "fb_affinity_entry_id_fkey",
    }).onDelete("cascade"),
  ],
);

export const fbDish = pgTable(
  "fb_dish",
  {
    id: serial().primaryKey().notNull(),
    entryId: integer("entry_id"),
    description: text().notNull(),
    attribution: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.entryId],
      foreignColumns: [fbEntry.id],
      name: "fb_dish_entry_id_fkey",
    }).onDelete("cascade"),
  ],
);

export const fbNote = pgTable(
  "fb_note",
  {
    id: serial().primaryKey().notNull(),
    entryId: integer("entry_id"),
    note: text().notNull(),
    attribution: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.entryId],
      foreignColumns: [fbEntry.id],
      name: "fb_note_entry_id_fkey",
    }).onDelete("cascade"),
  ],
);

export const fbMeta = pgTable(
  "fb_meta",
  {
    id: serial().primaryKey().notNull(),
    entryId: integer("entry_id"),
    key: text().notNull(),
    value: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.entryId],
      foreignColumns: [fbEntry.id],
      name: "fb_meta_entry_id_fkey",
    }).onDelete("cascade"),
  ],
);

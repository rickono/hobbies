import {
  AssociationStrength,
  FlavorBibleEntryId,
  RequiredKeys,
  SnakeToCamelCaseKeys,
} from "@rono/types";

export interface DbFlavorBibleEntryEntity {
  id: FlavorBibleEntryId;
  name: string;
  see_also?: string;
  example?: string;
  aka?: string;
}

export type FlavorBibleEntryEntity =
  SnakeToCamelCaseKeys<DbFlavorBibleEntryEntity>;

export interface DbFlavorBibleAssociationEntity {
  main_entry: FlavorBibleEntryId;
  association_text: string;
  associated_entry: number;
  strength: AssociationStrength;
  narrower: string[];
  example: string[];
}

export type FlavorBibleAssociationEntity =
  SnakeToCamelCaseKeys<DbFlavorBibleAssociationEntity>;

export interface FlavorBibleAffinityEntity {
  id: number;
  entryId: FlavorBibleEntryId;
}

export interface FlavorBibleAffinityEntryEntity {
  affinityId: number;
  entryId: FlavorBibleEntryId;
}

export interface FlavorBibleDishEntity {
  id: number;
  entryId: FlavorBibleEntryId;
  description: string;
  attribution?: string;
}

export interface FlavorBibleNoteEntity {
  id: number;
  entryId: FlavorBibleEntryId;
  note: string;
  attribution?: string;
}

export interface FlavorBibleMetadataEntity {
  id: number;
  entryId: FlavorBibleEntryId;
  key: string;
  value: string;
}

// Insert types
export type InsertFlavorBibleEntry = RequiredKeys<
  FlavorBibleEntryEntity,
  "name"
>;
export type InsertFlavorBibleAssociation = RequiredKeys<
  FlavorBibleAssociationEntity,
  "mainEntry" | "associationText" | "strength"
>;
export type InsertFlavorBibleAffinity = RequiredKeys<
  FlavorBibleAffinityEntity,
  "entryId"
>;
export type InsertFlavorBIbleAffinityEntry = RequiredKeys<
  FlavorBibleAffinityEntryEntity,
  "entryId" | "affinityId"
>;
export type InsertFlavorBibleDish = RequiredKeys<
  FlavorBibleDishEntity,
  "entryId" | "description"
>;
export type InsertFlavorBibleNote = RequiredKeys<
  FlavorBibleNoteEntity,
  "entryId" | "note"
>;
export type InsertFlavorBibleMetadata = RequiredKeys<
  FlavorBibleMetadataEntity,
  "entryId" | "key" | "value"
>;

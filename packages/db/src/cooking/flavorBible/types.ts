import {
  AssociationStrength,
  FlavorBibleEntryId,
  RequiredKeys,
} from "@rono/types";

export interface FlavorBibleEntryEntity {
  id: FlavorBibleEntryId;
  name: string;
  seeAlso?: string;
  example?: string;
  aka?: string;
}

export interface FlavorBibleAssociationEntity {
  mainEntry: FlavorBibleEntryId;
  associationText: string;
  associatedEntry: number;
  strength: AssociationStrength;
  narrower: string[];
  example: string[];
}

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

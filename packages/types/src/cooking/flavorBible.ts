import { FlavorBibleEntryId } from "../nominal";

export interface Dish {
  name: string;
  attribution?: string;
}

export type AssociationStrength = -1 | 1 | 2 | 3 | 4;

export interface BaseAssociation {
  name: string;
  level: AssociationStrength;
}

export interface ParsedAssociation extends BaseAssociation {
  parenthesis?: string;
  especially?: ParsedAssociation[];
  example?: ParsedAssociation[];
  narrowers?: BaseAssociation[];
  peak?: string;
}

export interface Note {
  note: string;
  attribution?: string;
}

export interface ParsedFlavorBibleEntry {
  id: string;
  name: string;
  associations: ParsedAssociation[];
  flavorAffinities: string[][];
  dishes: Dish[];
  meta: Record<string, string>;
  seeAlso?: string;
  aka?: string;
  example?: string;
  subtitle?: string;
  notes: Note[];
}

export interface ParsedFlavorBible {
  [ingredientId: string]: ParsedFlavorBibleEntry;
}

export interface FlavorBibleAssociation {
  name: string;
  strength: AssociationStrength;
  examples?: string[];
  narrowers?: string[];
}

export interface FlavorBibleEntry {
  id: FlavorBibleEntryId;
  name: string;
  associations?: FlavorBibleAssociation[];
}

export interface Dish {
  name: string;
  attribution?: string;
}

export type AssociationStrength = -1 | 1 | 2 | 3 | 4;

export interface BaseAssociation {
  name: string;
  level: AssociationStrength;
}

export interface Association extends BaseAssociation {
  parenthesis?: string;
  especially?: Association[];
  example?: Association[];
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
  associations: Association[];
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

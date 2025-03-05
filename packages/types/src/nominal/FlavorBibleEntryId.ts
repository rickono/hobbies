declare const flavorBibleEntryIdBrand: unique symbol;
export type FlavorBibleEntryId = number & {
  [flavorBibleEntryIdBrand]: "FlavorBibleEntryId";
};

export function FlavorBibleEntryId(id: number): FlavorBibleEntryId {
  return id as FlavorBibleEntryId;
}

FlavorBibleEntryId.NULL = FlavorBibleEntryId(0);

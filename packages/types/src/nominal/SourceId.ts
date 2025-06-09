declare const sourceIdBrand: unique symbol;
export type SourceId = number & {
  [sourceIdBrand]: "SourceId";
};

export const isSourceId = (id: unknown): id is SourceId => {
  return typeof id === "number" && id > 0;
};
export function SourceId(id: number): SourceId {
  return id as SourceId;
}

SourceId.NULL = SourceId(0);

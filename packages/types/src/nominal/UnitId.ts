declare const unitIdBrand: unique symbol;
export type UnitId = number & {
  [unitIdBrand]: "UnitId";
};

export const isUnitId = (id: unknown): id is UnitId => {
  return typeof id === "number" && id > 0;
};

export function UnitId(id: number): UnitId {
  return id as UnitId;
}

UnitId.NULL = UnitId(0);

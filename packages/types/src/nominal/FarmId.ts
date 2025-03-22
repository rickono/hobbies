declare const farmIdBrand: unique symbol;
export type FarmId = number & {
  [farmIdBrand]: "FarmId";
};

export function FarmId(id: number): FarmId {
  return id as FarmId;
}

FarmId.NULL = FarmId(0);

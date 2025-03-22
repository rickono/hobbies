declare const varietalIdBrand: unique symbol;
export type VarietalId = number & {
  [varietalIdBrand]: "VarietalId";
};

export function VarietalId(id: number): VarietalId {
  return id as VarietalId;
}

VarietalId.NULL = VarietalId(0);

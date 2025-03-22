declare const roasterIdBrand: unique symbol;
export type RoasterId = number & {
  [roasterIdBrand]: "RoasterId";
};

export function RoasterId(id: number): RoasterId {
  return id as RoasterId;
}

RoasterId.NULL = RoasterId(0);

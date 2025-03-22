declare const coffeeBeanIdBrand: unique symbol;
export type CoffeeBeanId = number & {
  [coffeeBeanIdBrand]: "RoasterId";
};

export function CoffeeBeanId(id: number): CoffeeBeanId {
  return id as CoffeeBeanId;
}

CoffeeBeanId.NULL = CoffeeBeanId(0);

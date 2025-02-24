declare const cuisineIdBrand: unique symbol;
export type CuisineId = string & { [cuisineIdBrand]: "CuisineId" };

export function CuisineId(id: string): CuisineId {
  return id as CuisineId;
}

CuisineId.NULL = CuisineId("");

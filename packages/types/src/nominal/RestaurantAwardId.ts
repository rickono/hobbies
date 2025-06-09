declare const restaurantAwardIdBrand: unique symbol;
export type RestaurantAwardId = number & {
  [restaurantAwardIdBrand]: "RestaurantAwardId";
};

export function RestaurantAwardId(id: number): RestaurantAwardId {
  return id as RestaurantAwardId;
}

RestaurantAwardId.NULL = RestaurantAwardId(0);

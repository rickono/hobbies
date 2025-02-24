declare const restaurantIdBrand: unique symbol;
export type RestaurantId = number & { [restaurantIdBrand]: "RestaurantId" };

export function RestaurantId(id: number): RestaurantId {
  return id as RestaurantId;
}

// Define a static-like property for NULL ID
RestaurantId.NULL = RestaurantId(0);

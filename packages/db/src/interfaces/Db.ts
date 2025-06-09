import { CookingRepository } from "./CookingRepository";
import { RestaurantRepository } from "./RestaurantRepository";

export interface Db {
  cooking: CookingRepository;
  restaurant: RestaurantRepository;
}

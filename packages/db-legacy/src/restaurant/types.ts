import {
  AwardId,
  CuisineId,
  MichelinDistinction,
  RestaurantId,
  SnakeToCamelCaseKeys,
} from "@rono/types";

type RequiredKeys<
  T extends object,
  RequiredKeys extends keyof T = never,
> = Required<Pick<T, RequiredKeys>> & Partial<Omit<T, RequiredKeys>>;

export interface DbRestaurantEntity {
  id: number;
  name: string;
  longitude?: number;
  latitude?: number;
  location_id?: string;
  website?: string;
  currency_id?: string;
  phone?: string;
  street_address?: string;
  postcode?: string;
}

export interface DbAwardEntity {
  id: AwardId;
  restaurant_id: RestaurantId;
  award_type_id: string;
  award_date: string;
  rank: number;
  description: string;
  url: string;
}

export interface DbAwardDistinctionEntity {
  id: number;
  restaurant_award_id: AwardId;
  distinction_id: MichelinDistinction;
}

export interface DbCuisineEntity {
  id: CuisineId;
  name: string;
}

export type AwardEntity = SnakeToCamelCaseKeys<DbAwardEntity>;
export type AwardDistinctionEntity =
  SnakeToCamelCaseKeys<DbAwardDistinctionEntity>;
export type RestaurantEntity = SnakeToCamelCaseKeys<DbRestaurantEntity>;
export type CuisineEntity = SnakeToCamelCaseKeys<DbCuisineEntity>;

export type InsertRestaurant = RequiredKeys<RestaurantEntity, "name">;
export type InsertCuisine = RequiredKeys<CuisineEntity, "name" | "id">;
export type InsertAward = RequiredKeys<
  AwardEntity,
  "restaurantId" | "awardTypeId" | "awardDate"
>;
export type InsertAwardDistinction = RequiredKeys<
  AwardDistinctionEntity,
  "distinctionId" | "restaurantAwardId"
>;

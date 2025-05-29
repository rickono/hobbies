import { relations } from "drizzle-orm/relations";
import { fbEntry, fbAssociation, fbAffinity, fbDish, fbNote, restaurant, restaurantBooking, bookingProvider, fbMeta, restaurantSchedules, restaurantSchedule, restaurantAward, restaurantAwardDistinction, awardDistinction, ingredients, ingredientCategory, locations, awardType, currency, coffeeRoasters, coffeeFarms, coffeeBeans, coffeeProducers, coffeeVarietals, fbAffinityEntry, restaurantCuisine, cuisine } from "./schema";

export const fbAssociationRelations = relations(fbAssociation, ({one}) => ({
	fbEntry_mainEntry: one(fbEntry, {
		fields: [fbAssociation.mainEntry],
		references: [fbEntry.id],
		relationName: "fbAssociation_mainEntry_fbEntry_id"
	}),
	fbEntry_associatedEntry: one(fbEntry, {
		fields: [fbAssociation.associatedEntry],
		references: [fbEntry.id],
		relationName: "fbAssociation_associatedEntry_fbEntry_id"
	}),
}));

export const fbEntryRelations = relations(fbEntry, ({many}) => ({
	fbAssociations_mainEntry: many(fbAssociation, {
		relationName: "fbAssociation_mainEntry_fbEntry_id"
	}),
	fbAssociations_associatedEntry: many(fbAssociation, {
		relationName: "fbAssociation_associatedEntry_fbEntry_id"
	}),
	fbAffinities: many(fbAffinity),
	fbDishes: many(fbDish),
	fbNotes: many(fbNote),
	fbMetas: many(fbMeta),
	fbAffinityEntries: many(fbAffinityEntry),
}));

export const fbAffinityRelations = relations(fbAffinity, ({one, many}) => ({
	fbEntry: one(fbEntry, {
		fields: [fbAffinity.entryId],
		references: [fbEntry.id]
	}),
	fbAffinityEntries: many(fbAffinityEntry),
}));

export const fbDishRelations = relations(fbDish, ({one}) => ({
	fbEntry: one(fbEntry, {
		fields: [fbDish.entryId],
		references: [fbEntry.id]
	}),
}));

export const fbNoteRelations = relations(fbNote, ({one}) => ({
	fbEntry: one(fbEntry, {
		fields: [fbNote.entryId],
		references: [fbEntry.id]
	}),
}));

export const restaurantBookingRelations = relations(restaurantBooking, ({one}) => ({
	restaurant: one(restaurant, {
		fields: [restaurantBooking.restaurantId],
		references: [restaurant.id]
	}),
	bookingProvider: one(bookingProvider, {
		fields: [restaurantBooking.providerId],
		references: [bookingProvider.id]
	}),
}));

export const restaurantRelations = relations(restaurant, ({one, many}) => ({
	restaurantBookings: many(restaurantBooking),
	restaurantSchedules: many(restaurantSchedules),
	currency: one(currency, {
		fields: [restaurant.currencyId],
		references: [currency.id]
	}),
	location: one(locations, {
		fields: [restaurant.locationId],
		references: [locations.id]
	}),
	restaurantAwards: many(restaurantAward),
	restaurantCuisines: many(restaurantCuisine),
}));

export const bookingProviderRelations = relations(bookingProvider, ({many}) => ({
	restaurantBookings: many(restaurantBooking),
}));

export const fbMetaRelations = relations(fbMeta, ({one}) => ({
	fbEntry: one(fbEntry, {
		fields: [fbMeta.entryId],
		references: [fbEntry.id]
	}),
}));

export const restaurantSchedulesRelations = relations(restaurantSchedules, ({one}) => ({
	restaurant: one(restaurant, {
		fields: [restaurantSchedules.restaurantId],
		references: [restaurant.id]
	}),
	restaurantSchedule: one(restaurantSchedule, {
		fields: [restaurantSchedules.scheduleId],
		references: [restaurantSchedule.id]
	}),
}));

export const restaurantScheduleRelations = relations(restaurantSchedule, ({many}) => ({
	restaurantSchedules: many(restaurantSchedules),
}));

export const restaurantAwardDistinctionRelations = relations(restaurantAwardDistinction, ({one}) => ({
	restaurantAward: one(restaurantAward, {
		fields: [restaurantAwardDistinction.restaurantAwardId],
		references: [restaurantAward.id]
	}),
	awardDistinction: one(awardDistinction, {
		fields: [restaurantAwardDistinction.distinctionId],
		references: [awardDistinction.id]
	}),
}));

export const restaurantAwardRelations = relations(restaurantAward, ({one, many}) => ({
	restaurantAwardDistinctions: many(restaurantAwardDistinction),
	restaurant: one(restaurant, {
		fields: [restaurantAward.restaurantId],
		references: [restaurant.id]
	}),
	awardType: one(awardType, {
		fields: [restaurantAward.awardTypeId],
		references: [awardType.id]
	}),
}));

export const awardDistinctionRelations = relations(awardDistinction, ({one, many}) => ({
	restaurantAwardDistinctions: many(restaurantAwardDistinction),
	awardType: one(awardType, {
		fields: [awardDistinction.awardTypeId],
		references: [awardType.id]
	}),
}));

export const ingredientCategoryRelations = relations(ingredientCategory, ({one}) => ({
	ingredient_ingredientId: one(ingredients, {
		fields: [ingredientCategory.ingredientId],
		references: [ingredients.id],
		relationName: "ingredientCategory_ingredientId_ingredients_id"
	}),
	ingredient_categoryId: one(ingredients, {
		fields: [ingredientCategory.categoryId],
		references: [ingredients.id],
		relationName: "ingredientCategory_categoryId_ingredients_id"
	}),
}));

export const ingredientsRelations = relations(ingredients, ({many}) => ({
	ingredientCategories_ingredientId: many(ingredientCategory, {
		relationName: "ingredientCategory_ingredientId_ingredients_id"
	}),
	ingredientCategories_categoryId: many(ingredientCategory, {
		relationName: "ingredientCategory_categoryId_ingredients_id"
	}),
}));

export const locationsRelations = relations(locations, ({one, many}) => ({
	location: one(locations, {
		fields: [locations.parentId],
		references: [locations.id],
		relationName: "locations_parentId_locations_id"
	}),
	locations: many(locations, {
		relationName: "locations_parentId_locations_id"
	}),
	restaurants: many(restaurant),
	coffeeRoasters: many(coffeeRoasters),
	coffeeFarms: many(coffeeFarms),
	coffeeBeans: many(coffeeBeans),
}));

export const awardTypeRelations = relations(awardType, ({many}) => ({
	awardDistinctions: many(awardDistinction),
	restaurantAwards: many(restaurantAward),
}));

export const currencyRelations = relations(currency, ({many}) => ({
	restaurants: many(restaurant),
}));

export const coffeeRoastersRelations = relations(coffeeRoasters, ({one, many}) => ({
	location: one(locations, {
		fields: [coffeeRoasters.locationId],
		references: [locations.id]
	}),
	coffeeBeans: many(coffeeBeans),
}));

export const coffeeFarmsRelations = relations(coffeeFarms, ({one, many}) => ({
	location: one(locations, {
		fields: [coffeeFarms.locationId],
		references: [locations.id]
	}),
	coffeeBeans: many(coffeeBeans),
}));

export const coffeeBeansRelations = relations(coffeeBeans, ({one}) => ({
	coffeeRoaster: one(coffeeRoasters, {
		fields: [coffeeBeans.roasterId],
		references: [coffeeRoasters.id]
	}),
	location: one(locations, {
		fields: [coffeeBeans.locationId],
		references: [locations.id]
	}),
	coffeeProducer: one(coffeeProducers, {
		fields: [coffeeBeans.producerId],
		references: [coffeeProducers.id]
	}),
	coffeeFarm: one(coffeeFarms, {
		fields: [coffeeBeans.farmId],
		references: [coffeeFarms.id]
	}),
	coffeeVarietal: one(coffeeVarietals, {
		fields: [coffeeBeans.varietalId],
		references: [coffeeVarietals.id]
	}),
}));

export const coffeeProducersRelations = relations(coffeeProducers, ({many}) => ({
	coffeeBeans: many(coffeeBeans),
}));

export const coffeeVarietalsRelations = relations(coffeeVarietals, ({many}) => ({
	coffeeBeans: many(coffeeBeans),
}));

export const fbAffinityEntryRelations = relations(fbAffinityEntry, ({one}) => ({
	fbAffinity: one(fbAffinity, {
		fields: [fbAffinityEntry.affinityId],
		references: [fbAffinity.id]
	}),
	fbEntry: one(fbEntry, {
		fields: [fbAffinityEntry.entryId],
		references: [fbEntry.id]
	}),
}));

export const restaurantCuisineRelations = relations(restaurantCuisine, ({one}) => ({
	restaurant: one(restaurant, {
		fields: [restaurantCuisine.restaurantId],
		references: [restaurant.id]
	}),
	cuisine: one(cuisine, {
		fields: [restaurantCuisine.cuisineId],
		references: [cuisine.id]
	}),
}));

export const cuisineRelations = relations(cuisine, ({many}) => ({
	restaurantCuisines: many(restaurantCuisine),
}));
import { pgTable, unique, serial, text, timestamp, foreignKey, integer, boolean, varchar, doublePrecision, date, jsonb, primaryKey, pgView, json, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const locationType = pgEnum("location_type", ['country', 'state', 'city', 'neighborhood'])


export const migrationsLog = pgTable("migrations_log", {
	id: serial().primaryKey().notNull(),
	filename: text().notNull(),
	appliedAt: timestamp("applied_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("migrations_log_filename_key").on(table.filename),
]);

export const fbEntry = pgTable("fb_entry", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	example: text(),
	seeAlso: text("see_also"),
	aka: text(),
});

export const fbAssociation = pgTable("fb_association", {
	id: serial().primaryKey().notNull(),
	mainEntry: integer("main_entry"),
	associatedEntry: integer("associated_entry"),
	associationText: text("association_text").notNull(),
	strength: integer().notNull(),
	example: text().array(),
	narrower: text().array(),
}, (table) => [
	foreignKey({
			columns: [table.mainEntry],
			foreignColumns: [fbEntry.id],
			name: "fb_association_main_entry_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.associatedEntry],
			foreignColumns: [fbEntry.id],
			name: "fb_association_associated_entry_fkey"
		}).onDelete("cascade"),
]);

export const fbAffinity = pgTable("fb_affinity", {
	id: serial().primaryKey().notNull(),
	entryId: integer("entry_id"),
}, (table) => [
	foreignKey({
			columns: [table.entryId],
			foreignColumns: [fbEntry.id],
			name: "fb_affinity_entry_id_fkey"
		}).onDelete("cascade"),
]);

export const fbDish = pgTable("fb_dish", {
	id: serial().primaryKey().notNull(),
	entryId: integer("entry_id"),
	description: text().notNull(),
	attribution: text(),
}, (table) => [
	foreignKey({
			columns: [table.entryId],
			foreignColumns: [fbEntry.id],
			name: "fb_dish_entry_id_fkey"
		}).onDelete("cascade"),
]);

export const fbNote = pgTable("fb_note", {
	id: serial().primaryKey().notNull(),
	entryId: integer("entry_id"),
	note: text().notNull(),
	attribution: text(),
}, (table) => [
	foreignKey({
			columns: [table.entryId],
			foreignColumns: [fbEntry.id],
			name: "fb_note_entry_id_fkey"
		}).onDelete("cascade"),
]);

export const restaurantBooking = pgTable("restaurant_booking", {
	url: text().notNull(),
	restaurantId: integer("restaurant_id"),
	providerId: text("provider_id"),
}, (table) => [
	foreignKey({
			columns: [table.restaurantId],
			foreignColumns: [restaurant.id],
			name: "restaurant_booking_restaurant_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.providerId],
			foreignColumns: [bookingProvider.id],
			name: "restaurant_booking_provider_id_fkey"
		}).onDelete("cascade"),
	unique("unique_booking").on(table.restaurantId, table.providerId),
]);

export const bookingProvider = pgTable("booking_provider", {
	id: text().primaryKey().notNull(),
	name: text(),
});

export const fbMeta = pgTable("fb_meta", {
	id: serial().primaryKey().notNull(),
	entryId: integer("entry_id"),
	key: text().notNull(),
	value: text(),
}, (table) => [
	foreignKey({
			columns: [table.entryId],
			foreignColumns: [fbEntry.id],
			name: "fb_meta_entry_id_fkey"
		}).onDelete("cascade"),
]);

export const restaurantSchedules = pgTable("restaurant_schedules", {
	restaurantId: integer("restaurant_id"),
	scheduleId: integer("schedule_id"),
}, (table) => [
	foreignKey({
			columns: [table.restaurantId],
			foreignColumns: [restaurant.id],
			name: "restaurant_schedules_restaurant_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.scheduleId],
			foreignColumns: [restaurantSchedule.id],
			name: "restaurant_schedules_schedule_id_fkey"
		}).onDelete("cascade"),
]);

export const restaurantSchedule = pgTable("restaurant_schedule", {
	id: serial().primaryKey().notNull(),
	day: integer().notNull(),
	closed: boolean().default(false).notNull(),
	open: text(),
	close: text(),
});

export const currency = pgTable("currency", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	abbr: varchar({ length: 225 }).notNull(),
	symbol: varchar({ length: 255 }).notNull(),
});

export const users = pgTable("users", {
	email: text().primaryKey().notNull(),
	name: text().notNull(),
});

export const restaurantAwardDistinction = pgTable("restaurant_award_distinction", {
	id: serial().primaryKey().notNull(),
	restaurantAwardId: integer("restaurant_award_id").notNull(),
	distinctionId: text("distinction_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.restaurantAwardId],
			foreignColumns: [restaurantAward.id],
			name: "restaurant_award_distinction_restaurant_award_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.distinctionId],
			foreignColumns: [awardDistinction.id],
			name: "restaurant_award_distinction_distinction_id_fkey"
		}).onDelete("cascade"),
]);

export const ingredients = pgTable("ingredients", {
	id: serial().primaryKey().notNull(),
	name: text(),
}, (table) => [
	unique("ingredients_name_key").on(table.name),
]);

export const ingredientCategory = pgTable("ingredient_category", {
	ingredientId: integer("ingredient_id").notNull(),
	categoryId: integer("category_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.ingredientId],
			foreignColumns: [ingredients.id],
			name: "ingredient_category_ingredient_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [ingredients.id],
			name: "ingredient_category_category_id_fkey"
		}).onDelete("cascade"),
]);

export const cuisine = pgTable("cuisine", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("cuisine_name_key").on(table.name),
]);

export const locations = pgTable("locations", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	type: locationType().notNull(),
	parentId: text("parent_id"),
	abbr: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "locations_parent_id_fkey"
		}).onDelete("cascade"),
]);

export const awardType = pgTable("award_type", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
}, (table) => [
	unique("award_type_name_key").on(table.name),
]);

export const awardDistinction = pgTable("award_distinction", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	awardTypeId: text("award_type_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.awardTypeId],
			foreignColumns: [awardType.id],
			name: "award_distinction_award_type_id_fkey"
		}).onDelete("cascade"),
	unique("award_distinction_name_key").on(table.name),
]);

export const restaurant = pgTable("restaurant", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	longitude: doublePrecision(),
	latitude: doublePrecision(),
	locationId: text("location_id"),
	website: text(),
	currencyId: text("currency_id"),
	phone: text(),
	streetAddress: text("street_address"),
	postcode: text(),
}, (table) => [
	foreignKey({
			columns: [table.currencyId],
			foreignColumns: [currency.id],
			name: "restaurant_currency_id_fkey"
		}),
	foreignKey({
			columns: [table.locationId],
			foreignColumns: [locations.id],
			name: "restaurant_location_id_fkey"
		}).onDelete("set null"),
	unique("unique_name_loc").on(table.name, table.longitude, table.latitude),
]);

export const restaurantAward = pgTable("restaurant_award", {
	id: serial().primaryKey().notNull(),
	restaurantId: integer("restaurant_id").notNull(),
	awardTypeId: text("award_type_id").notNull(),
	awardDate: date("award_date").notNull(),
	rank: integer(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	description: text(),
	url: text(),
}, (table) => [
	foreignKey({
			columns: [table.restaurantId],
			foreignColumns: [restaurant.id],
			name: "restaurant_award_restaurant_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.awardTypeId],
			foreignColumns: [awardType.id],
			name: "restaurant_award_award_type_id_fkey"
		}).onDelete("cascade"),
	unique("unique_awards").on(table.restaurantId, table.awardTypeId, table.awardDate),
]);

export const coffeeRoasters = pgTable("coffee_roasters", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	locationId: text("location_id"),
}, (table) => [
	foreignKey({
			columns: [table.locationId],
			foreignColumns: [locations.id],
			name: "coffee_roasters_location_id_fkey"
		}).onDelete("set null"),
]);

export const coffeeFarms = pgTable("coffee_farms", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	locationId: text("location_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.locationId],
			foreignColumns: [locations.id],
			name: "coffee_farms_location_id_fkey"
		}),
]);

export const coffeeProcesses = pgTable("coffee_processes", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});

export const coffeeBeans = pgTable("coffee_beans", {
	id: serial().primaryKey().notNull(),
	altitude: integer(),
	roastDate: date("roast_date"),
	tastingNotes: text("tasting_notes"),
	roasterId: integer("roaster_id"),
	locationId: text("location_id"),
	producerId: integer("producer_id"),
	farmId: integer("farm_id"),
	varietalId: integer("varietal_id"),
}, (table) => [
	foreignKey({
			columns: [table.roasterId],
			foreignColumns: [coffeeRoasters.id],
			name: "coffee_beans_roaster_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.locationId],
			foreignColumns: [locations.id],
			name: "coffee_beans_location_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.producerId],
			foreignColumns: [coffeeProducers.id],
			name: "coffee_beans_producer_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.farmId],
			foreignColumns: [coffeeFarms.id],
			name: "coffee_beans_farm_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.varietalId],
			foreignColumns: [coffeeVarietals.id],
			name: "coffee_beans_varietal_id_fkey"
		}).onDelete("set null"),
]);

export const coffeeProducers = pgTable("coffee_producers", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});

export const coffeeVarietals = pgTable("coffee_varietals", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});

export const fbAffinityEntry = pgTable("fb_affinity_entry", {
	affinityId: integer("affinity_id").notNull(),
	entryId: integer("entry_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.affinityId],
			foreignColumns: [fbAffinity.id],
			name: "fb_affinity_entry_affinity_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.entryId],
			foreignColumns: [fbEntry.id],
			name: "fb_affinity_entry_entry_id_fkey"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.affinityId, table.entryId], name: "fb_affinity_entry_pkey"}),
]);

export const restaurantCuisine = pgTable("restaurant_cuisine", {
	restaurantId: integer("restaurant_id").notNull(),
	cuisineId: text("cuisine_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.restaurantId],
			foreignColumns: [restaurant.id],
			name: "restaurant_cuisine_restaurant_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.cuisineId],
			foreignColumns: [cuisine.id],
			name: "restaurant_cuisine_cuisine_id_fkey"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.restaurantId, table.cuisineId], name: "restaurant_cuisine_pkey"}),
]);
export const restaurantBookingView = pgView("restaurant_booking_view", {	id: integer(),
	booking: json(),
}).as(sql`SELECT r.id, COALESCE(json_agg(jsonb_build_object('name', bp.name, 'id', bp.id, 'url', rb.url)) FILTER (WHERE bp.id IS NOT NULL), '[]'::json) AS booking FROM restaurant r LEFT JOIN restaurant_booking rb ON rb.restaurant_id = r.id LEFT JOIN booking_provider bp ON bp.id = rb.provider_id GROUP BY r.id`);

export const enrichedRestaurant = pgView("enriched_restaurant", {	id: integer(),
	name: text(),
	website: text(),
	phone: text(),
	streetAddress: text("street_address"),
	postcode: text(),
	locations: json(),
	cuisines: json(),
	awards: json(),
	booking: json(),
}).as(sql`SELECT r.id, r.name, r.website, r.phone, r.street_address, r.postcode, rl.locations, rc.cuisines, ra.awards, rb.booking FROM restaurant r LEFT JOIN restaurant_awards ra ON ra.id = r.id LEFT JOIN restaurant_cuisines rc ON rc.id = r.id LEFT JOIN restaurant_locations rl ON rl.id = r.id LEFT JOIN restaurant_booking_view rb ON rb.id = r.id`);

export const restaurantLocations = pgView("restaurant_locations", {	id: integer(),
	locations: json(),
}).as(sql`WITH RECURSIVE location_hierarchy AS ( SELECT r.id AS restaurant_id, r.name AS restaurant_name, l.id AS location_id, l.name AS location_name, l.type AS location_type, l.abbr AS location_abbr, l.parent_id, 0 AS depth FROM restaurant r JOIN locations l ON r.location_id = l.id UNION ALL SELECT lh_1.restaurant_id, lh_1.restaurant_name, l.id AS location_id, l.name AS location_name, l.type AS location_type, l.abbr AS location_abbr, l.parent_id, lh_1.depth + 1 FROM locations l JOIN location_hierarchy lh_1 ON l.id = lh_1.parent_id ) SELECT restaurant_id AS id, json_agg(json_build_object('id', location_id, 'name', location_name, 'type', location_type, 'abbr', location_abbr) ORDER BY depth DESC) AS locations FROM location_hierarchy lh GROUP BY restaurant_id, restaurant_name`);

export const restaurantAwards = pgView("restaurant_awards", {	id: integer(),
	name: text(),
	awards: json(),
}).as(sql`SELECT r.id, r.name, COALESCE(json_agg(DISTINCT jsonb_build_object('id', at.id, 'award', at.name, 'date', ra.award_date, 'distinctions', COALESCE(( SELECT json_agg(jsonb_build_object('id', ad.id, 'name', ad.name)) AS json_agg FROM restaurant_award_distinction rad LEFT JOIN award_distinction ad ON rad.distinction_id = ad.id WHERE ra.award_type_id = at.id AND ra.restaurant_id = r.id AND rad.restaurant_award_id = ra.id), '[]'::json))) FILTER (WHERE at.id IS NOT NULL), '[]'::json) AS awards FROM restaurant r LEFT JOIN restaurant_award ra ON ra.restaurant_id = r.id LEFT JOIN award_type at ON ra.award_type_id = at.id GROUP BY r.id, r.name`);

export const restaurantCuisines = pgView("restaurant_cuisines", {	id: integer(),
	cuisines: json(),
}).as(sql`SELECT r.id, COALESCE(json_agg(jsonb_build_object('name', c.name, 'id', c.id)) FILTER (WHERE c.id IS NOT NULL), '[]'::json) AS cuisines FROM restaurant r LEFT JOIN restaurant_cuisine rc ON rc.restaurant_id = r.id LEFT JOIN cuisine c ON rc.cuisine_id = c.id GROUP BY r.id, r.name`);